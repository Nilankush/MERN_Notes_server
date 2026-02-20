import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// generate token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_secret_key, {expiresIn: "30d"});
};

// register new user.

export const registerHandler = async(req, res) => {

    const {userName, email, password} = req.body;

    try {
        if(!userName || !email || !password){
            return res.status(400).json({msg: "please fill all the fields."});
        }

        const userExist = await user.findOne({email});
        if(userExist){
            return res.status(400).json({msg: "user already exists."});
        };
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({userName, email, password: hashedPassword });
        const token = generateToken(newUser._id);
        res.status(201).json({
            userId: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "server error."});
    }
};

// Login existing user.

export const loginHandler = async(req, res) => {
    const{email, password} = req.body;

    try {
        
        const currentUser = await user.findOne({email});
        if(!currentUser){
            return res.status(401).json({msg: "Invalid credentials."});
        };
        const matchPassword = await bcrypt.compare(password, currentUser.password);

        if(!matchPassword){
            return res.status(401).json({msg: "Invalid credentials."});
        };

        const token = generateToken(currentUser._id);
        res.json({
            userId: currentUser._id,
            UserName: currentUser.userName,
            email: currentUser.email,
            token
        });

    } catch(error){
        console.error(error);        
        res.status(500).json({msg: "Server error."})
    };
};

// fetch my info.

export const myInfoHandler = async(req, res) => {
    res.status(200).json(req.user);
};