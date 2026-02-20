import { Router, Request, Response } from "express";
import db from "../db/database.js";

const router = Router();

// GET /api/heartpieces
router.get("/", (req: Request, res: Response) => {
  const { q } = req.query;

  let query = "SELECT * FROM heartpieces WHERE 1=1";
  const params: string[] = [];

  if (q && typeof q === "string") {
    query += " AND (description LIKE ? OR location LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  query += " ORDER BY id ASC";

  const results = db.prepare(query).all(...params);
  res.json(results);
});

// GET /api/heartpieces/:id
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  const heartPiece = db
    .prepare("SELECT * FROM heartpieces WHERE id = ?")
    .get(id);

  if (!heartPiece) {
    res.status(404).json({ message: "Heart Piece not found" });
    return;
  }

  res.json(heartPiece);
});

export default router;
