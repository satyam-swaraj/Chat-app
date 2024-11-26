import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { Backend } from '../.config';


function handleInputErrors({fullName, userName, password, confirmPassword, gender})
{
    if(!fullName || !userName || !password || !confirmPassword || !gender)
    {
        toast.error('Please fill in all the fields');
        return false;
    }

    if(password != confirmPassword)
    {
        toast.error('Password does not match with Confirm-password');
        return false;
    }

    if(password.length < 6)
    {
        toast.error('Password shall be of length 6 or more');
        return false;
    }

    return true;
}


const useSignup = () =>
{
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const signup = async({fullName, userName, password, confirmPassword, gender}) =>
    {
        const success = handleInputErrors({fullName, userName, password, confirmPassword, gender});
        if(!success)
        {
            return;
        }
        setLoading(true);
        try
        {
            const res = await fetch(`${Backend}/api/auth/signup`, 
            {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({fullName, userName, password, confirmPassword, gender})
            });
             
            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            console.log(data);

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);
        }
        catch(error)
        {
            console.log("Error occured in useSignup hook");
            console.log(error);
            console.log(error.message);
            toast.error(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }
    return {loading, signup};
}

export default useSignup;

