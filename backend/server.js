import express from "express";
import colors from "colors"
import connectDB from "./config/db.js";

// MongoDB Connection
connectDB();

const app = express()

app.get("/", (req,res) => {
    res.send("<h1>Server is listening / Path</h1>")
})

const PORT = 8000

app.listen(PORT, ()=>{ console.log(`Server is running at PORT ${PORT}`.bgMagenta)})