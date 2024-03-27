import UsuariosModel from "../models/usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Buscar todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuariosModel.find(); // buscamos todos los usuarios en la base de datos
    res.json(usuarios); // respondemos con los usuarios encontrados
    console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
};

// Crear un usuario

// const createUsuario = async (req, res) => {
//   console.log(req.body, "req");
//   try {
//     const { nombre, apellido, email, password } = req.body; // obtenemos el nombre y apellido del cuerpo de la petición
//     const usuario = new UsuariosModel({ nombre, apellido, email, password }); // creamos un nuevo usuario con el nombre y apellido obtenidos
//     await usuario.save(); // guardamos el usuario en la base de datos
//     res.status(201).json(usuario); // respondemos con el usuario creado
//   } catch (error) {
//     console.log(error);
//   }
// };

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params; // obtenemos el id del usuario a eliminar
    const usuario = await UsuariosModel.findByIdAndDelete(id); // buscamos y eliminamos el usuario en la base de datos
    res.json(usuario); // respondemos con el usuario eliminado
  } catch (error) {
    console.log(error);
  }
};

// Actualizar un usuario

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params; // obtenemos el id del usuario a actualizar
    const { nombre, apellido, email, password, admin } = req.body; // obtenemos el nombre y apellido del cuerpo de la petición
    const usuario = await UsuariosModel.findByIdAndUpdate( // buscamos y actualizamos el usuario en la base de datos con el id y los datos obtenidos del cuerpo de la petición  
      id,
      { nombre, apellido, email, password, admin },
      { new: true } // con la opción new: true le decimos a mongoose que nos devuelva el usuario actualizado y no el usuario antes de actualizar.

    ); // buscamos y actualizamos el usuario en la base de datos
    res.json(usuario); // respondemos con el usuario actualizado
  } catch (error) {
    console.log(error);
  }
};

// Registro de usuario

// Que es bcrypt? es una librería que nos permite encriptar contraseñas de manera segura y rápida.
// No es aconsejable guardar claves de acceso en texto plano en la base de datos, ya que si alguien accede a la base de datos, podrá ver todas las claves de acceso de los usuarios.
// Por eso es importante encriptar las claves de acceso antes de guardarlas en la base de datos. o hashearlas
// Qué es hashear? es un proceso que convierte una cadena de texto en una cadena de texto de longitud fija. Encripta la contraseña de manera irreversible a partir de una información de entrada. La informacion de entrada es la contraseña que el usuario ingresa en el formulario de registro.
// Que es salt? es un valor aleatorio que se añade a la contraseña antes de encriptarla.
// Por qué es importante usar salt? es importante usar salt para evitar que dos contraseñas iguales tengan el mismo hash. Si dos contraseñas iguales tienen el mismo hash, un atacante podría saber que dos usuarios tienen la misma contraseña.
// La longitud de los hash es de 60 caracteres, por lo que es importante tener en cuenta que la longitud de los campos de la base de datos sea suficiente para almacenar el hash de la contraseña.
//

const registroUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, admin } = req.body; // obtenemos el nombre, apellido, email y contraseña del cuerpo de la petición
    const salt = await bcrypt.genSalt(10); // generamos un salt para encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, salt); // encriptamos la contraseña con el salt generado
    const usuario = new UsuariosModel({
      nombre,
      apellido,
      email,
      password: passwordHash,
      admin
    }); // creamos un nuevo usuario con el nombre, apellido, email y contraseña encriptada
    await usuario.save(); // guardamos el usuario en la base de datos
    res.status(201).json(usuario); // respondemos con el usuario creado
  } catch (error) {
    console.log(error);
  }
};

// Iniciar sesión
// Que es jwt? es una librería que nos permite generar tokens de autenticación para proteger rutas en nuestra aplicación web o API.

const loginUsuario = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validación de entrada
      if (!email || !password) {
        return res.status(400).json({ error: "El email y la contraseña son requeridos" });
      }
  
      const user = await UsuariosModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }
  
      // Crear token JWT
      const token = jwt.sign(
        {  // Payload:  creamos un token con el id, nombre y apellido del usuario  y lo firmamos con la clave secreta y le damos un tiempo de expiración de 1 día (1D) Claim: es un objeto que contiene la información del usuario que se va a firmar en el token. 
          id: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          admin: user.admin
        },
        process.env.SECRET_KEY, // Secret key: es una clave secreta que se utiliza para firmar el token. Es importante que sea una clave segura y que no se comparta con nadie.
        { expiresIn: "1D" }
      );
  
      // Enviar el token en la respuesta
      res.header("Authorization", `Bearer ${token}`).json({ error: null, data: { token } });
       // respondemos con el token creado en la respuesta de la petición POST a la ruta /login de la API o aplicación web  
      // res.send({ token }).json({ data: { token } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocurrió un error al intentar iniciar sesión" });
    }
  };
export default {
  getUsuarios,
  //   createUsuario,
  deleteUsuario,
  updateUsuario,
  registroUsuario,
  loginUsuario,
}; // exportamos las funciones para poder usarlas en otros archivos
