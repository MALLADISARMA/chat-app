import mongoose from 'mongoose';
const connecttomongodb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to mongo db");

    }catch(error){
        console.log("error connecting to mongodb",error.message);
    }
};

export default connecttomongodb;