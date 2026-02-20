import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        reequired: true,
        unique: true
    },
    email: {
        type: String,
        reequired: true,
        unique: true
    },
    password: {
        type: String,
        reequired: true
    },
},{timestamps: true});

const user = mongoose.model("users", userSchema);

export default user;