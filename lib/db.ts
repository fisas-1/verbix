import { createClient, type Client } from "@libsql/client";
import path from "path";

let client: Client | null = null;

export function getDb(): Client {
  if (!client) {
    const url =
      process.env.DATABASE_URL ??
      `file:${path.join(process.cwd(), "data", "verbs.db").replace(/\\/g, "/")}`;
    client = createClient({
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
  }
  return client;
}
