export class ResponseProvider {
  /**
   * 
   * @param {*} res 
   * @param {*} data 
   * @param {*} message 
   * @param {*} status 
   * @returns 
   */
  static success(res, data, message = "Operación exitosa", status = 200) {
    return res.status(status).json({
      success: true,
      code: status,
      message,
      data,
    });
  }

  /**
   * 
   * @param {*} res 
   * @param {*} message 
   * @param {*} status 
   * @returns 
   */
  static error(res, message = "Error interno del servidor", status = 500, erros = []) {
    return res.status(status).json({
      success: false,
      code: status,
      message,
      erros: erros
    });
  }
}