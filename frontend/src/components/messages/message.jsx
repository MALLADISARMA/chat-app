import { useAuthContext } from "../../context/authcontext";
import useConversation from "../../store/userconversation";
import {extractTime} from "../../utils/extracttime";
const Message=({message})=>{
  const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderid === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilepic = fromMe ? authUser.profilepic : selectedConversation?.profilepic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime=extractTime(message.createdAt);


  const shakeClass=message.shouldShake?"shake":""
    return(
      <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilepic} />
				</div>
			</div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
      </div>
    );
};

export default Message;