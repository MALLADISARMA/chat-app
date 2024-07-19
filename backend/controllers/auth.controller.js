import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generatetoken.js";
export const signup=async (req,res)=>{
 try{
    const {fullname,username,password,confirmpassword,gender}=req.body;
    if(password!==confirmpassword){
        return res.status(400).json({error:"passwords doesnot match"});
    }
    const user=await User.findOne({username});
    if(user){
        return res.status(400).json({error:"User already exists"});
    }
    //HASH PASSWORD HERE
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    //https://avatar-placeholder.iran.liara.run/

    const boyprofilepic='https://avatar.iran.liara.run/public/boy?username=${username}';
    const girlprofilepic='https://avatar.iran.liara.run/public/girl?username=${username}';

    const newUser= new User({
        fullname,
        username,
        password:hashedpassword,
        gender,
        profilepic:gender=="male"?boyprofilepic:girlprofilepic
    });
    if(newUser){
        //generate JWT token here
        generatetokenandsetcookie(newUser._id,res);
        await newUser.save();
     res.status(201).json({
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        profilepic:newUser.profilepic
     });
    }else{
     res.status(400).json({error:"Invalid user data"});
    }
   
    
 }
   catch (error){
    console.log("Error in signup controller",error.message);
    res.status(500).json({error:"Internal server error"});

   }
};
export const login= async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const ispasswordcorrect=await bcrypt.compare(password,user?.password||"");
        if(!user||!ispasswordcorrect){
            return res.status(400).json({error:"invalid user"});
        }
        generatetokenandsetcookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic
         });

    } catch (error){
        console.log("Error in login controller",error.message);
    res.status(500).json({error:"Internal server error"});

    }
};
export const logout=(req,res)=>{
    try{
       res.cookie("jwt","",{maxAge:0});
       res.status(200).json({message:"Logged out successfully"});
    }catch (error){
        console.log("Error in logout controller",error.message);
    res.status(500).json({error:"Internal server error"});
    }
    
};
