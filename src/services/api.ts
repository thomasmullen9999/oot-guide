import axios from "axios";
import type { GoldSkulltula, HeartPiece, Location, Item } from "@/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
});

export const getSkulltulas = (params?: {
  q?: string;
  location?: string;
}): Promise<GoldSkulltula[]> =>
  api.get("/goldskulltulas", { params }).then((r) => r.data);

export const getSkulltula = (id: number): Promise<GoldSkulltula> =>
  api.get(`/goldskulltulas/${id}`).then((r) => r.data);

export const getHeartPieces = (params?: {
  q?: string;
}): Promise<HeartPiece[]> =>
  api.get("/heartpieces", { params }).then((r) => r.data);

export const getHeartPiece = (id: number): Promise<HeartPiece> =>
  api.get(`/heartpieces/${id}`).then((r) => r.data);

export const getLocations = (): Promise<Location[]> =>
  api.get("/locations").then((r) => r.data);

export const getLocation = (id: number): Promise<Location> =>
  api.get(`/locations/${id}`).then((r) => r.data);

export const getItems = (params?: {
  q?: string;
  category?: string;
}): Promise<Item[]> => api.get("/items", { params }).then((r) => r.data);

export const getItem = (id: number): Promise<Item> =>
  api.get(`/items/${id}`).then((r) => r.data);
