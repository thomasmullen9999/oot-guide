import type { GoldSkulltula, HeartPiece, Location, Item } from "@/types";

const BASE = "/data";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json() as Promise<T>;
}

export const fetchSkulltulas = () =>
  fetchJson<GoldSkulltula[]>("goldskulltulas.json");
export const fetchHeartPieces = () =>
  fetchJson<HeartPiece[]>("heartpieces.json");
export const fetchLocations = () => fetchJson<Location[]>("locations.json");
export const fetchItems = () => fetchJson<Item[]>("items.json");
