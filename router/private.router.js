import express from "express";
const router = express.Router();

router.get("/admin", (req, res) => { // definimos una ruta que responde a peticiones GET en la raíz del servidor con el mensaje "ruta privada" y el usuario que hizo la petición en el req. Por que un GET? porque estamos obteniendo información del servidor y no estamos modificando nada en el servidor. 
  res.json({
    error: null,
    data: {
      title: "ruta privada", // respondemos con un mensaje de texto
      user: req.usuario, // obtenemos el usuario del req que guardamos en el middleware comprobacionJwt para mostrarlo en la respuesta de la petición GET a la ruta /private de la API o aplicación web 
    },
  });
});

export default router;
