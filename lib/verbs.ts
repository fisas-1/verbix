import { getDb } from "./db";

export interface Verb {
  id: number;
  infinitive: string;
  slug: string;
  lang: string;
  type: "regular" | "irregular" | "reflexive";
  conjugation_group: "ar" | "er" | "ir";
  has_stem_change: boolean;
  stem_change: string | null;
  translation_en: string | null;
  translation_ca: string | null;
  frequency_rank: number | null;
}

export interface VerbExample {
  id: number;
  verb_id: number;
  tense: string | null;
  person: string | null;
  sentence: string;
  translation_en: string | null;
}

export function getVerb(slug: string, lang = "es"): Verb | null {
  const db = getDb();
  return (
    db
      .prepare("SELECT * FROM verbs WHERE slug = ? AND lang = ?")
      .get(slug, lang) as Verb | undefined
  ) ?? null;
}

export function getAllVerbSlugs(lang = "es"): { slug: string }[] {
  const db = getDb();
  return db
    .prepare("SELECT slug FROM verbs WHERE lang = ? ORDER BY frequency_rank ASC")
    .all(lang) as { slug: string }[];
}

export function getVerbsByLetter(letter: string, lang = "es"): Verb[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM verbs WHERE lang = ? AND infinitive LIKE ? ORDER BY infinitive ASC")
    .all(lang, `${letter}%`) as Verb[];
}

export function getVerbsByGroup(group: string, lang = "es"): Verb[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM verbs WHERE lang = ? AND conjugation_group = ? ORDER BY frequency_rank ASC")
    .all(lang, group) as Verb[];
}

export function getVerbsByType(type: string, lang = "es"): Verb[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM verbs WHERE lang = ? AND type = ? ORDER BY frequency_rank ASC")
    .all(lang, type) as Verb[];
}

export function getRelatedVerbs(verb: Verb, limit = 8): Verb[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM verbs
       WHERE lang = ? AND id != ? AND conjugation_group = ?
       ORDER BY frequency_rank ASC LIMIT ?`
    )
    .all(verb.lang, verb.id, verb.conjugation_group, limit) as Verb[];
}

export function getVerbExamples(verbId: number): VerbExample[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM examples WHERE verb_id = ? LIMIT 6")
    .all(verbId) as VerbExample[];
}

export function searchVerbs(query: string, lang = "es", limit = 10): Verb[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM verbs WHERE lang = ? AND infinitive LIKE ? ORDER BY frequency_rank ASC LIMIT ?"
    )
    .all(lang, `${query}%`, limit) as Verb[];
}

export function getAllVerbsForSearch(lang = "es"): Pick<Verb, "infinitive" | "slug" | "translation_en">[] {
  const db = getDb();
  return db
    .prepare("SELECT infinitive, slug, translation_en FROM verbs WHERE lang = ? ORDER BY frequency_rank ASC")
    .all(lang) as Pick<Verb, "infinitive" | "slug" | "translation_en">[];
}

export function getTotalVerbCount(lang = "es"): number {
  const db = getDb();
  const row = db.prepare("SELECT COUNT(*) as count FROM verbs WHERE lang = ?").get(lang) as { count: number };
  return row.count;
}
