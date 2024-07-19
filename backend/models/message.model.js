import mongoose from 'mongoose';
const messageSchema=new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
    //createdat, updatedat=>message.createdat:15:30
},{timestamps:true});

const Message=mongoose.model("Message",messageSchema);
export default Message;