import { useState } from "react";
import { json } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';
import { Backend } from "../.config";

const useLogout = () =>
{
    const[loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    
    const logout = async() =>
    {
        setLoading(true);
        try
        {
            const res = await fetch(`${Backend}/api/auth/logout`,
            {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
            });

            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setLoading(false);
        }
    };
    return {loading, logout};
}

export default useLogout;