import { createClient, type Client } from "@libsql/client";
import path from "path";

let client: Client | null = null;

export function getDb(): Client {
  if (!client) {
    const filePath = path.join(process.cwd(), "data", "verbs.db").replace(/\\/g, "/");
    const url = process.env.DATABASE_URL ?? `file:${filePath}`;
    const isRemote = !url.startsWith("file:");

    // Diagnostic — visible in Vercel build logs and function logs
    console.log(`[db] mode: ${isRemote ? "remote (Turso)" : "local file"}`);
    console.log(`[db] url: ${isRemote ? url.replace(/\/\/([^@]+)@/, "//***@") : url}`);
    console.log(`[db] auth token present: ${!!process.env.DATABASE_AUTH_TOKEN}`);

    client = createClient({
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
  }
  return client;
}
