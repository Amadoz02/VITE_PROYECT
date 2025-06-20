import express from "express";
import { verifyToken } from "../middlewares/auth/index.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Bienvenido a la zona protegida", user: req.user });
});

export default router;
