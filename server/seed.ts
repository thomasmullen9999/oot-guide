import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "../oot.db"));

console.log("🌱 Seeding database...");

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// ── Create tables ──────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS goldskulltulas (
    id INTEGER PRIMARY KEY,
    number INTEGER NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS heartpieces (
    id INTEGER PRIMARY KEY,
    location TEXT NOT NULL,
    description TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL
  );
`);

// ── Helper ─────────────────────────────────────────────────────

const loadJson = (filename: string) => {
  const raw = readFileSync(join(__dirname, "../data", filename), "utf-8");
  return JSON.parse(raw);
};

// ── Seed Gold Skulltulas ───────────────────────────────────────

const { goldskulltulas } = loadJson("goldskulltulas.json");
const insertSkulltula = db.prepare(`
  INSERT OR REPLACE INTO goldskulltulas (id, number, location, description)
  VALUES (@id, @number, @location, @description)
`);
const seedSkulltulas = db.transaction(() => {
  for (const s of goldskulltulas) insertSkulltula.run(s);
});
seedSkulltulas();
console.log(`  ✓ Seeded ${goldskulltulas.length} gold skulltulas`);

// ── Seed Heart Pieces ──────────────────────────────────────────

const { heartpieces } = loadJson("heartpieces.json");
const insertHeartPiece = db.prepare(`
  INSERT OR REPLACE INTO heartpieces (id, location, description)
  VALUES (@id, @location, @description)
`);
const seedHeartPieces = db.transaction(() => {
  for (const h of heartpieces) insertHeartPiece.run(h);
});
seedHeartPieces();
console.log(`  ✓ Seeded ${heartpieces.length} heart pieces`);

// ── Seed Locations ─────────────────────────────────────────────

const { locations } = loadJson("locations.json");
const insertLocation = db.prepare(`
  INSERT OR REPLACE INTO locations (id, name, description)
  VALUES (@id, @name, @description)
`);
const seedLocations = db.transaction(() => {
  for (const l of locations) insertLocation.run(l);
});
seedLocations();
console.log(`  ✓ Seeded ${locations.length} locations`);

// ── Seed Items ─────────────────────────────────────────────────

const { items } = loadJson("items.json");
const insertItem = db.prepare(`
  INSERT OR REPLACE INTO items (id, name, category, description)
  VALUES (@id, @name, @category, @description)
`);
const seedItems = db.transaction(() => {
  for (const i of items) insertItem.run(i);
});
seedItems();
console.log(`  ✓ Seeded ${items.length} items`);

// ── Done ───────────────────────────────────────────────────────

db.close();
console.log("✅ Database seeded successfully → oot.db");
