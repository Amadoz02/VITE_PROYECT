import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import {
  camposLogin,
  camposRegistro,
  verifyToken,
} from "../middlewares/auth/index.js";

const router = express.Router();

// Registro de usuario
router.post("/register", camposRegistro, register);

// Inicio de sesión
router.post("/login",camposLogin, login);

// Ruta para refrescar el token del usuario autenticado, falta el middleware de verificación del token de refresco
router.post("/refresh", refreshToken);

// Logout
router.post("/logout", verifyToken, logout);

// Faltan las rutas para recuperar la contraseña y verificar el email

export default router;
