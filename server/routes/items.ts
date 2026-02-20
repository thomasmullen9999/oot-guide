import { Router, Request, Response } from "express";
import db from "../db/database.js";

const router = Router();

// GET /api/items
router.get("/", (req: Request, res: Response) => {
  const { q, category } = req.query;

  let query = "SELECT * FROM items WHERE 1=1";
  const params: string[] = [];

  if (q && typeof q === "string") {
    query += " AND (name LIKE ? OR description LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  if (category && typeof category === "string") {
    query += " AND category = ?";
    params.push(category);
  }

  query += " ORDER BY category ASC, name ASC";

  const results = db.prepare(query).all(...params);
  res.json(results);
});

// GET /api/items/:id
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  const item = db.prepare("SELECT * FROM items WHERE id = ?").get(id);

  if (!item) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  res.json(item);
});

export default router;
