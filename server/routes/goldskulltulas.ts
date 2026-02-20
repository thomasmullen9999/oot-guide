import { Router, Request, Response } from "express";
import db from "../db/database.js";

const router = Router();

// GET /api/goldskulltulas
router.get("/", (req: Request, res: Response) => {
  const { q, location } = req.query;

  let query = "SELECT * FROM goldskulltulas WHERE 1=1";
  const params: string[] = [];

  if (q && typeof q === "string") {
    query +=
      " AND (description LIKE ? OR location LIKE ? OR CAST(number AS TEXT) LIKE ?)";
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }

  if (location && typeof location === "string") {
    query += " AND location = ?";
    params.push(location);
  }

  query += " ORDER BY number ASC";

  const results = db.prepare(query).all(...params);
  res.json(results);
});

// GET /api/goldskulltulas/:id
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  const skulltula = db
    .prepare("SELECT * FROM goldskulltulas WHERE id = ?")
    .get(id);

  if (!skulltula) {
    res.status(404).json({ message: "Gold Skulltula not found" });
    return;
  }

  res.json(skulltula);
});

export default router;
