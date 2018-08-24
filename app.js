const express = require("express");
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;
console.log(db);
mongoose
    .connect(db)
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.log(err));
app.get("/", (req,res) => res.send("Hello Sky"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));