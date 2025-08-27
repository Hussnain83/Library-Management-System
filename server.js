import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./db.js";

dotenv.config();
const PORT = process.env.PORT
const app = express();
app.use(bodyParser.json());

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js"
import borrowRoutes from "./routes/borrowRoutes.js"
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/borrow", borrowRoutes);

app.listen(PORT, ()=>{
    console.log("listening on port",PORT);
});
