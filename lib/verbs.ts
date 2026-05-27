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
  translation_es: string | null;
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

export async function getVerb(slug: string, lang = "es"): Promise<Verb | null> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE slug = ? AND lang = ?",
    args: [slug, lang],
  });
  return (result.rows[0] as unknown as Verb) ?? null;
}

export async function getAllVerbSlugs(lang = "es"): Promise<{ slug: string }[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT slug FROM verbs WHERE lang = ? ORDER BY frequency_rank ASC",
    args: [lang],
  });
  return result.rows as unknown as { slug: string }[];
}

export async function getAllVerbSlugsWithRank(lang = "es"): Promise<{ slug: string; frequency_rank: number | null }[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT slug, frequency_rank FROM verbs WHERE lang = ? ORDER BY frequency_rank ASC",
    args: [lang],
  });
  return result.rows as unknown as { slug: string; frequency_rank: number | null }[];
}

export async function getVerbsByLetter(letter: string, lang = "es"): Promise<Verb[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE lang = ? AND infinitive LIKE ? ORDER BY infinitive ASC",
    args: [lang, `${letter}%`],
  });
  return result.rows as unknown as Verb[];
}

export async function getVerbsByGroup(group: string, lang = "es"): Promise<Verb[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE lang = ? AND conjugation_group = ? ORDER BY frequency_rank ASC",
    args: [lang, group],
  });
  return result.rows as unknown as Verb[];
}

export async function getVerbsByType(type: string, lang = "es"): Promise<Verb[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE lang = ? AND type = ? ORDER BY frequency_rank ASC",
    args: [lang, type],
  });
  return result.rows as unknown as Verb[];
}

export async function getRelatedVerbs(verb: Verb, limit = 8): Promise<Verb[]> {
  const db = getDb();
  const result = await db.execute({
    sql: `SELECT * FROM verbs
          WHERE lang = ? AND id != ? AND conjugation_group = ?
          ORDER BY frequency_rank ASC LIMIT ?`,
    args: [verb.lang, verb.id, verb.conjugation_group, limit],
  });
  return result.rows as unknown as Verb[];
}

export async function getVerbExamples(verbId: number): Promise<VerbExample[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM examples WHERE verb_id = ? LIMIT 6",
    args: [verbId],
  });
  return result.rows as unknown as VerbExample[];
}

export async function searchVerbs(query: string, lang = "es", limit = 10): Promise<Verb[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE lang = ? AND infinitive LIKE ? ORDER BY frequency_rank ASC LIMIT ?",
    args: [lang, `${query}%`, limit],
  });
  return result.rows as unknown as Verb[];
}

export async function getAllVerbsForSearch(
  lang = "es"
): Promise<Pick<Verb, "infinitive" | "slug" | "translation_en">[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT infinitive, slug, translation_en FROM verbs WHERE lang = ? ORDER BY frequency_rank ASC",
    args: [lang],
  });
  return result.rows as unknown as Pick<Verb, "infinitive" | "slug" | "translation_en">[];
}

export async function getTotalVerbCount(lang = "es"): Promise<number> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT COUNT(*) as count FROM verbs WHERE lang = ?",
    args: [lang],
  });
  return (result.rows[0] as unknown as { count: number }).count;
}

export async function getTopVerbsByLang(lang: string, limit = 20): Promise<Verb[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE lang = ? ORDER BY frequency_rank ASC LIMIT ?",
    args: [lang, limit],
  });
  return result.rows as unknown as Verb[];
}
