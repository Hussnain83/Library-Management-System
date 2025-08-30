import User  from "../models/User.js";

export const checkAdminRole = async (userID) => {
    try{
        const user = await User.findById(userID);
        if(user.role == "admin"){
            return true;
        }
    }catch(err){
        return false;

    }
}