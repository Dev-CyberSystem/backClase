import mongoose from "mongoose"; // importamos mongoose para poder usarlo en este archivo y conectarnos a la base de datos de MongoDB

import { Schema } from "mongoose"; // importamos Schema desde mongoose para definir el esquema de la colección de usuarios en la base de datos de MongoDB

const usuariosModel = new Schema(
  {
    // definimos el esquema de la colección de usuarios en la base de datos de MongoDB
    nombre: String, // definimos un campo nombre de tipo String
    apellido: String, // definimos un campo apellido de tipo String
    email: {
      // definimos un campo email de tipo String
      type: String,
      unique: true, // el campo email debe ser único
    },
    password: String, // definimos un campo password de tipo String
    admin: {
      // definimos un campo admin de tipo Boolean
      type: Boolean,
      default: false, // el campo admin por defecto es false
    },
  },
  { versionKey: false }
);

const UsuariosModel = mongoose.model("usuarios", usuariosModel); // Crea la coleccion usuarios en la base de datos de MongoDB con el esquema usuariosModel

export default UsuariosModel; // exportamos el modelo para poder usarlo en otros archivos
