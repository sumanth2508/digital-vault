const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const PORT = 3000;
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then((success) => console.log("Connected to MongoDB"))
    .catch((err) => console.timeLog("Error connecting to MongoDB"));




app.get("/", (req, res) => {
    res.send("Hello, World!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});