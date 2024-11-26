import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import { Backend } from '../.config';

const useGetMessages = () => 
{
    const [loading, setLoading] = useState(false);

    const{selectedConversation, messages, setMessages} = useConversation();

    useEffect(() => 
    {
        const getMessages = async() =>
        {
            try
            {
                setLoading(true);

                const res = await fetch(`${Backend}/api/messages/${selectedConversation._id}`);

                const data = await res.json();

                if(data.error)
                {
                    throw new Error(data.error);
                }

                setMessages(data);
            }
            catch(error)
            {
                toast.error(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }

        if(selectedConversation?._id)
        {
            getMessages();
        } 

    }, [selectedConversation?._id, setMessages])

    return {loading, messages};
}

export default useGetMessages