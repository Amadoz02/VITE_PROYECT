export const validarCategoria = (req,res,next) =>
    {
      const { nombre, descripcion } = req.body;
      
      if (!nombre || nombre.trim() == "")
      {
        return res.status(400).json({ mensaje: "EL NOMBRE EN LA CATEGORIA ES OBLIGATORIO"});
      }
      if (!descripcion || descripcion.trim() == "" ) {
        return res.status(400).json({ mensaje: "LA DESCRIPCION EN LA CATEGORIA ES OBLIGATORIO" });
      }
      next();
    }

validarProductos=()=>{
    const { nombre, descripcion, precio, categoria } = req.body;
     if (!nombre || nombre.trim() == "")
      {
        return res.status(400).json({ mensaje: "EL NOMBRE EN LA CATEGORIA ES OBLIGATORIO"});
      }
      if (!descripcion || descripcion.trim() == "" ) {
        return res.status(400).json({ mensaje: "LA DESCRIPCION EN LA CATEGORIA ES OBLIGATORIO" });
      }if (!precio || precio.trim() == "" ) {
        return res.status(400).json({ mensaje: "LA DESCRIPCION EN LA CATEGORIA ES OBLIGATORIO" });
      }if (!categoria || categoria.trim() == "" ) {
        return res.status(400).json({ mensaje: "LA DESCRIPCION EN LA CATEGORIA ES OBLIGATORIO" });
      }
      next();
        
}