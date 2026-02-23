const BASE = "/data";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

export const fetchSkulltulas = () => fetchJson("goldskulltulas.json");
export const fetchHeartPieces = () => fetchJson("heartpieces.json");
export const fetchLocations = () => fetchJson("locations.json");
export const fetchItems = () => fetchJson("items.json");
