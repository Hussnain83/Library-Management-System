import { jwtAuthMiddleware, generateToken } from "../middlewares/jwt.js";
import User  from "../models/User.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";

// registration of user
export const registerUser = async(req, res) => {
    try{
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("User data saved");

    const payload = {
        id: await response.id
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is", token);
    res.status(200).json({response: response, token: token});

   }
   catch(error){
    console.log(error);    
    res.status(500).json({error: "Internal server error"});
   }
}

// login the user
export const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"});
        }
        const payload = {
            id: user.id
        }
        const token = generateToken(payload);
        console.log(`Token sent to the ${email}`);
        res.status(200).json({response: token});
        
    } catch (error) {
        console.log(error);    
        res.status(500).json({error: "Internal server error"});
    }
}

// get own profile 
export const profile = async(req, res)=> {
    try {
        const userData = req.user;   
        const userId = userData.id;
        const user = await User.findById(userId);
        console.log("userId", userId);
        
        res.status(200).json(user);

        
    } catch (error) {
         console.log(error);    
         res.status(500).json({error: "Internal server error"});
    }
}

// Get all Profiles
export const getAllUsers = async(req, res)=> {
    try{
        const user = req.user;
        const userId = user.id;
        if(! await checkAdminRole(userId))
        return res.status(403).json({message: "This is only for admin"});
        const users = await User.find();
        res.status(200).json({users: users});
    }
    catch(error){
         console.log(error);    
         res.status(500).json({error: "Internal server error"});
    }
}

