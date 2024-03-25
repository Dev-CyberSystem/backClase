import jwt from "jsonwebtoken";
const comprobacionJwt = (req, res, next) => {
    // const token = req.header("auth-token"); // obtenemos el token de los headers
    console.log(req.headers.authorization , "req.headers.authorization")
    const token = req.headers.authorization
    console.log(token, "token")
    if (!token) {
      return res.status(401).send("Acceso denegado no se proporciono un token");
    }
    try {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY); // verificamos el token
      req.usuario = verifyToken; // guardamos el usuario en el req

      if (verifyToken.admin) {
        console.log("es admin");
        next(); // llamamos al siguiente middleware
      } else {
        console.log("no es admin");
        res.status(401).send("Acceso denegado no eres admin");
      }

    } catch (error) {
      res.status(400).send("Token no válido");
    }
  next(); // llamamos al siguiente middleware
};

export default comprobacionJwt; // exportamos el middleware para usarlo en otros archivos
