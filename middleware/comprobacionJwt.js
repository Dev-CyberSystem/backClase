import jwt from "jsonwebtoken";
const comprobacionJwt = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Acceso denegado, no se proporcionó un token");
  }

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = verifyToken;

    if (verifyToken.admin) {
      console.log("es admin");
      next();
    } else {
      console.log("no es admin");
      return res.status(401).send("Acceso denegado, no eres admin");
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).send("Acceso denegado, token no válido");
  }
};


export default comprobacionJwt; // exportamos el middleware para usarlo en otros archivos
