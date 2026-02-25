import type { GoldSkulltula, HeartPiece, Location, Item } from "@/types";
import skulltulasJson from "@/data/goldskulltulas.json";
import heartPiecesJson from "@/data/heartpieces.json";
import locationsJson from "@/data/locations.json";
import itemsJson from "@/data/items.json";

export const fetchSkulltulas = (): Promise<GoldSkulltula[]> =>
  Promise.resolve(skulltulasJson.goldskulltulas as GoldSkulltula[]);

export const fetchHeartPieces = (): Promise<HeartPiece[]> =>
  Promise.resolve(heartPiecesJson.heartpieces as HeartPiece[]);

export const fetchLocations = (): Promise<Location[]> =>
  Promise.resolve(locationsJson.locations as Location[]);

export const fetchItems = (): Promise<Item[]> =>
  Promise.resolve(itemsJson.items as Item[]);
