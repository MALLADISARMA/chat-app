
import MessageInput from './messageinput';
import Messages from './messages';
import { TiMessages } from "react-icons/ti";
import { useEffect } from "react";
import { useAuthContext } from "../../context/authcontext";
import useConversation from '../../store/userconversation';
const MessageContainer=()=>{
    const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);
    return(
        <div className='md:min-w-[450px] flex flex-col'>
          {!selectedConversation?(<NoChatSelected/>):(
            <>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
					</div>
                    <Messages/>
                    <MessageInput/>
					
			</>
          )}
			
			
        </div>
    );

};
export default MessageContainer;
const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullname} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};