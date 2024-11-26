import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => 
{
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = authUser._id === message.senderID;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bubbleBGColor = fromMe ? 'bg-blue-500' : '';
    const formattedTime = extractTime(message.createdAt)


    return (
        <div className = {`chat ${chatClassName}`}>
            <div className = 'chat-image avatar'>
                <div className = 'w-10 rounded-full'>
                    <img 
                        alt = 'Tailwind CSS Chat Bubble Component'
                        src = { profilePicture }
                    />
                </div>
            </div>
            <div className = {`chat-bubble text-white ${bubbleBGColor}`}>{message.message}</div>
            <div className = 'chat-footer opacity-50 test-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
  )
}

export default Message;