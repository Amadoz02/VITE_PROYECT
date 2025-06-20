import { ResponseProvider } from "../providers/ResponseProvider.js";
import AuthService from "../services/AuthService.js";

export const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const response = await AuthService.register(nombre, email, password);
    if (response.error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.success(res, {}, response.message, response.code);
    } else {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, response.message, response.code);
    }    
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await AuthService.login(email, password);
    if (response.error) {
      console.log(response);
      
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(
        res,
        response.message,
        response.code
      );
    } else {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    }
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};

export const logout = async (req, res) => {
  try {
    // Llamamos el servio y pasamos el id del usuario
    const response = await AuthService.logout(req.user.id);
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.success(res, {}, response.message, response.code);
    return res.status(response.code).json(response);
  } catch (error) {
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
}

export const refreshToken = async (req, res) => {  
  // Asiganmos el token a una variable
  const authHeader = req.headers.authorization;  
  try {
    const refreshToken = authHeader.split(" ")[1];
    // Verificamos el token de accesso
    const response = await AuthService.verifyAccessToken(refreshToken);    
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.success(
      res,
      response.data,
      response.message,
      response.code
    );
  } catch (error) {      
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};