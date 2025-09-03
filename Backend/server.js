import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./db.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: "*"
}));


import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js"
import borrowRoutes from "./routes/borrowRoutes.js"
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/", borrowRoutes);




app.listen(PORT, "0.0.0.0", ()=>{
    console.log("listening on port",PORT);
});
