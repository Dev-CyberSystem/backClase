import express from "express"; // Que es express? es un framework de node.js que nos permite crear aplicaciones web y APIs de manera sencilla y rápida.
import "dotenv/config"; // dotenv es un módulo que carga variables de entorno desde un archivo .env a process.env.
import userRouter from "./router/userRouter.js"; // importamos el router que creamos en el archivo userRouter.js para manejar las peticiones a la raíz del servidor
import connectDB from "./db/db.js"; // importamos la función que creamos en el archivo db.js para conectarnos a la base de datos
import cors from "cors"; // importamos cors para poder usarlo en este archivo y permitir peticiones desde otros dominios
import privateRouter from "./router/private.router.js"; // importamos el router que creamos en el archivo userRouter.js para manejar las peticiones a la raíz del servidor
import comprobacionJwt from "./middleware/comprobacionJwt.js";
const app = express(); // usamos express para crear una nueva aplicación

app.use(cors()); // le decimos a la aplicación que use cors para permitir peticiones desde otros dominios
const PORT = process.env.PORT || 3000; // definimos el puerto en el que se ejecutará la aplicación web o API. Si no se define, se ejecutará en el puerto 3000.

// app.get("/", (req, res) => {
//   // console.log(res,  "res")
//   // console.log(req, "req")
//   // definimos una ruta que responde a peticiones GET en la raíz del servidor
//   res.send("Hello World!"); // respondemos con un mensaje de texto
// });

// RUTAS
app.use(express.json()); // le decimos a la aplicación que use JSON para manejar las peticiones HTTP entrantes // Middleware para manejar las peticiones HTTP entrantes en formato JSON

app.use("/api", userRouter); // usamos el router que creamos en el archivo userRouter.js para manejar las peticiones a la raíz del servidor
app.use("/api", comprobacionJwt, privateRouter ); // usamos el router que creamos en el archivo userRouter.js para manejar las peticiones a la raíz del servidor
// Servidor

app.get("/", (req, res) => {
  // definimos una ruta que responde a peticiones GET en la raíz del servidor
  res.send("Hello World!"); // respondemos con un mensaje de texto
});

app.listen(PORT, () => {
  connectDB(); // nos conectamos a la base de datos
  // le decimos a la aplicación que escuche en el puerto 3000
  console.log("Server is running on port 3000"); // si el servidor se inicia correctamente, mostramos un mensaje en la consola
});


// const initApp = () => {
//   // creamos una función para inicializar la aplicación
//   try {
//     connectDB(); // nos conectamos a la base de datos
//     app.listen(PORT, () => {
//       // le decimos a la aplicación que escuche en el puerto 3000
//       console.log("Server is running on port 3000"); // si el servidor se inicia correctamente, mostramos un mensaje en la consola
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// initApp(); // start the app
