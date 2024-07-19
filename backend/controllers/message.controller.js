import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import  { getReceiverSocketid, io } from "../socket/socket.js";
export const sendMessage=async(req,res)=>{
    try{
        const {message}=req.body;
        const {id:receiverid} =req.params;
        const senderid=req.user._id;

        let conversation=await Conversation.findOne({
            participants:{$all:[senderid,receiverid]},
        });
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderid,receiverid],

            });
        }
        const newMessage=new Message({
            senderid,
            receiverid,
            message,
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
      //this will run iin parallel





        await Promise.all([conversation.save(),newMessage.save()]);
        const receiverSocketid=getReceiverSocketid(receiverid);
        if(receiverSocketid){
            io.to(receiverSocketid).emit("newMessage",newMessage)
        }



        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};
export const getMessages=async(req,res)=>{
    try{
        const {id:usertochatid}=req.params;
        const senderid=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all:[senderid,usertochatid]},
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);
        const messages=conversation.messages;
        res.status(200).json(conversation.messages);

    }catch(error){
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};