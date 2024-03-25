import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;
const db = process.env.MONGO_DB;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://diegoolmi:1jmnNRWHZp42Xpj3@clases.kor2wzq.mongodb.net/`)  // nos conectamos a la base de datos;
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
    };

export default connectDB; // exportamos la función para poder usarla en otros archivos