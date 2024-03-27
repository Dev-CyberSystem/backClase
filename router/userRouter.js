// userRouter.js
import express from "express";
const router = express.Router(); // creamos un router con express  para manejar las peticiones a la raíz del servidor
import userControllers from "../controllers/userControllers.js"; // importamos las funciones que creamos en el archivo userControllers.js para manejar las peticiones a la raíz del servidor

// Get

router.get("/usuarios", userControllers.getUsuarios);

// Post

router.post("/registro", userControllers.registroUsuario);

// Delete

router.delete("/delete/:id", userControllers.deleteUsuario);

// Put

router.put("/usuario/:id", userControllers.updateUsuario);

// Login

router.post("/login", userControllers.loginUsuario);

export default router;
