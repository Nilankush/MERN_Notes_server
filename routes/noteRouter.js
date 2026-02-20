import express from "express";
import protect  from "../middleware/auth.js";
import { createNote, deleteNote, fetchNotes, findNote, updateNote } from "../controllers/noteController.js";


const noteRouter = express.Router();

noteRouter.get("/", protect, fetchNotes);
noteRouter.post("/", protect, createNote);
noteRouter.get("/:id", protect, findNote);
noteRouter.put("/:id", protect, updateNote);
noteRouter.delete("/:id", protect, deleteNote);

export default noteRouter;