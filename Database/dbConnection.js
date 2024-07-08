import mongoose from "mongoose";


export default function dbConnection() {
    mongoose
    .connect(process.env.DB_CONNECTION_CLOUD)
    .then((conn) => console.log(`Database connected on ${process.env.DB_CONNECTION_CLOUD}`))
    .catch((err) => console.log(` Database Error ${err}`));
}