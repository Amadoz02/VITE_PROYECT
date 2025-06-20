// models/Usuario.js
import db from "../utils/db.js";

export class Usuario {
  
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async create(nombre, email, hashedPassword) {
    console.log(nombre, email, hashedPassword);
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );
    return result.insertId;
  }

  static async updateRefreshToken(id, refreshToken) {
    await db.query("UPDATE usuarios SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      id,
    ]);
  }
}
