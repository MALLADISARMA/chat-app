import User from '../models/user.model.js';


export const getusersforsidebar=async(req,res)=>{
    try{
        const loggedinuserid=req.user._id;

        const filteredusers=await User.find({_id:{$ne:loggedinuserid}}).select("-password");
        
        res.status(200).json(filteredusers);
    }catch(error){
        console.log("Error in getusersforsidebar: ",error.message);
        res.status(500).json({error:"Internel server error"});

    }
};