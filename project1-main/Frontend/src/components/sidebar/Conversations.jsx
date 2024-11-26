import React from 'react';
import Conversation from "./Conversation";
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = () =>
{
    const {loading, conversations} = useGetConversations();
    
    return(
        <div className = "py-2 flex flex-col overflow-auto">
            {conversations.map((conversation, index) =>
            (
                <Conversation
                    key = {conversation._id}
                    conversation = {conversation}
                    lastIndex = {index === conversation.length - 1}
                />
            ))}
        </div>
    );
}

export default Conversations;