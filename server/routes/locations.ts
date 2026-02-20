import { Router, Request, Response } from "express";
import db from "../db/database.js";

const router = Router();

// GET /api/locations
router.get("/", (_req: Request, res: Response) => {
  const locations = db
    .prepare("SELECT * FROM locations ORDER BY name ASC")
    .all();
  res.json(locations);
});

// GET /api/locations/:id
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  const location = db.prepare("SELECT * FROM locations WHERE id = ?").get(id);

  if (!location) {
    res.status(404).json({ message: "Location not found" });
    return;
  }

  res.json(location);
});

export default router;
