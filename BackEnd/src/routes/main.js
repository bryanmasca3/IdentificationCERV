import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  getSomeUser,
  updateUser,
} from "../controllers/main.js";

const router = express.Router();
router.get("/user/:id", getUserById);
router.get("/user", getUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.post("/someuser", getSomeUser);

export default router;
