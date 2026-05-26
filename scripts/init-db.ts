import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "verbs.db");

interface VerbSeed {
  infinitive: string;
  slug: string;
  type: string;
  conjugation_group: string;
  has_stem_change?: boolean;
  stem_change?: string;
  translation_en?: string;
  translation_ca?: string;
  frequency_rank?: number;
}

const EXAMPLE_SENTENCES: Record<string, Array<{ tense: string; person: string; sentence: string; translation_en: string }>> = {
  hablar: [
    { tense: "presente", person: "yo", sentence: "Yo hablo español con mis amigos.", translation_en: "I speak Spanish with my friends." },
    { tense: "preterito_indefinido", person: "él", sentence: "Ella habló con el director ayer.", translation_en: "She spoke with the director yesterday." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Hablaremos sobre el tema mañana.", translation_en: "We will talk about the topic tomorrow." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "De niño, hablaba mucho en clase.", translation_en: "As a child, I used to talk a lot in class." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Espero que hable más despacio.", translation_en: "I hope he speaks more slowly." },
  ],
  ser: [
    { tense: "presente", person: "yo", sentence: "Soy estudiante de medicina.", translation_en: "I am a medical student." },
    { tense: "preterito_indefinido", person: "él", sentence: "Fue una tarde increíble.", translation_en: "It was an incredible afternoon." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Seremos los primeros en llegar.", translation_en: "We will be the first to arrive." },
  ],
  estar: [
    { tense: "presente", person: "yo", sentence: "Estoy muy cansado hoy.", translation_en: "I am very tired today." },
    { tense: "preterito_indefinido", person: "él", sentence: "Estuvo en Madrid toda la semana.", translation_en: "He was in Madrid all week." },
    { tense: "preterito_imperfecto", person: "nosotros", sentence: "Estábamos esperando el autobús.", translation_en: "We were waiting for the bus." },
  ],
  tener: [
    { tense: "presente", person: "yo", sentence: "Tengo dos hermanos mayores.", translation_en: "I have two older brothers." },
    { tense: "preterito_indefinido", person: "él", sentence: "Tuvo mucha suerte en el examen.", translation_en: "He had a lot of luck in the exam." },
    { tense: "futuro_simple", person: "yo", sentence: "Tendré que estudiar más.", translation_en: "I will have to study more." },
  ],
  hacer: [
    { tense: "presente", person: "yo", sentence: "Hago ejercicio todas las mañanas.", translation_en: "I exercise every morning." },
    { tense: "preterito_indefinido", person: "él", sentence: "Hizo la tarea a tiempo.", translation_en: "He did the homework on time." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Haremos una fiesta el viernes.", translation_en: "We will have a party on Friday." },
  ],
};

export function initDb() {
  if (!fs.existsSync(path.join(process.cwd(), "data"))) {
    fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS verbs (
      id                INTEGER PRIMARY KEY,
      infinitive        TEXT NOT NULL,
      slug              TEXT NOT NULL,
      lang              TEXT NOT NULL DEFAULT 'es',
      type              TEXT,
      conjugation_group TEXT,
      has_stem_change   BOOLEAN DEFAULT 0,
      stem_change       TEXT,
      translation_en    TEXT,
      translation_ca    TEXT,
      frequency_rank    INTEGER,
      created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(slug, lang)
    );

    CREATE TABLE IF NOT EXISTS conjugations (
      id           INTEGER PRIMARY KEY,
      verb_id      INTEGER REFERENCES verbs(id) ON DELETE CASCADE,
      mood         TEXT NOT NULL,
      tense        TEXT NOT NULL,
      person       TEXT NOT NULL,
      form         TEXT NOT NULL,
      is_irregular BOOLEAN DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS examples (
      id             INTEGER PRIMARY KEY,
      verb_id        INTEGER REFERENCES verbs(id) ON DELETE CASCADE,
      tense          TEXT,
      person         TEXT,
      sentence       TEXT NOT NULL,
      translation_en TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_verbs_slug ON verbs(slug);
    CREATE INDEX IF NOT EXISTS idx_conjugations_verb_tense ON conjugations(verb_id, tense);
    CREATE INDEX IF NOT EXISTS idx_verbs_frequency ON verbs(frequency_rank);
    CREATE INDEX IF NOT EXISTS idx_verbs_lang ON verbs(lang);
  `);

  const seedPath = path.join(process.cwd(), "data", "seed", "verbs-es.json");
  const verbs: VerbSeed[] = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

  const insertVerb = db.prepare(`
    INSERT OR IGNORE INTO verbs (infinitive, slug, lang, type, conjugation_group, has_stem_change, stem_change, translation_en, translation_ca, frequency_rank)
    VALUES (@infinitive, @slug, 'es', @type, @conjugation_group, @has_stem_change, @stem_change, @translation_en, @translation_ca, @frequency_rank)
  `);

  const insertExample = db.prepare(`
    INSERT INTO examples (verb_id, tense, person, sentence, translation_en)
    VALUES (?, ?, ?, ?, ?)
  `);

  const seen = new Set<string>();
  const insertMany = db.transaction(() => {
    for (const verb of verbs) {
      if (seen.has(verb.slug)) continue;
      seen.add(verb.slug);
      insertVerb.run({
        infinitive: verb.infinitive,
        slug: verb.slug,
        type: verb.type ?? "regular",
        conjugation_group: verb.conjugation_group,
        has_stem_change: verb.has_stem_change ? 1 : 0,
        stem_change: verb.stem_change ?? null,
        translation_en: verb.translation_en ?? null,
        translation_ca: verb.translation_ca ?? null,
        frequency_rank: verb.frequency_rank ?? null,
      });
    }
  });

  insertMany();

  // Add example sentences for key verbs
  for (const [slug, examples] of Object.entries(EXAMPLE_SENTENCES)) {
    const verbRow = db.prepare("SELECT id FROM verbs WHERE slug = ? AND lang = 'es'").get(slug) as { id: number } | undefined;
    if (!verbRow) continue;
    const existing = db.prepare("SELECT COUNT(*) as c FROM examples WHERE verb_id = ?").get(verbRow.id) as { c: number };
    if (existing.c > 0) continue;
    for (const ex of examples) {
      insertExample.run(verbRow.id, ex.tense, ex.person, ex.sentence, ex.translation_en);
    }
  }

  console.log(`Database initialized at ${DB_PATH}`);
  console.log(`Verbs inserted: ${(db.prepare("SELECT COUNT(*) as c FROM verbs").get() as { c: number }).c}`);
  db.close();
}

initDb();
