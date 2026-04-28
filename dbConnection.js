require('dotenv').config();
const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    job: { type: String }

}, { timestamps: true });

const User = mongoose.model("user", userSchema);


module.exports = mongoose.connection
