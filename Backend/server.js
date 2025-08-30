import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./db.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: "http://127.0.0.1:5500"
}));


import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js"
import borrowRoutes from "./routes/borrowRoutes.js"
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/", borrowRoutes);

app.listen(PORT, ()=>{
    console.log("listening on port",PORT);
});
