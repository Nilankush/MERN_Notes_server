import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

const protect = async(req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_secret_key);
            req.user = await user.findById(decoded.id).select("-password");
            return next();

        } catch (error) {
            console.error("Token verification failed: ", error.message);
            return res.status(401).json({msg: "Authorization failed."});
        }
    };
    console.log("1");
    
    return res.status(401).json({msg: "Authorization failed."});
};

export default protect;