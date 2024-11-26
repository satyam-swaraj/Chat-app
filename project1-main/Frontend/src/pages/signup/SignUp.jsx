import React from 'react';
import GenderCheckBox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

const SignUp = () => 
{
    const[inputs, setInputs] = useState({
        fullName : '',
        userName : '',
        password : '',
        confirmPassword : '',
        gender : '',
    })

    const { loading, signup } = useSignup()

    const handleCheckboxChange = (gender) =>
    {
        setInputs({...inputs, gender})
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className = 'flex flex-col items-center justify-center min-w-96 mx-auto'>

            <div className = 'w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

                <h1 className = 'text-3xl font-semibold text-center text-gray-300'>
                    Signup
                    <span className = 'text-blue-500'> ChatApp </span>
                </h1>

                <form onSubmit = {handleSubmit}>

                    <div>
                        <label className = 'label p-2'>
                            <span className = 'text-base label-text'>Full Name </span>
                        </label>
                        <input type = 'text' placeholder = 'Enter Your Full Name' className = 'w-full input-bordered h-10'
                            value = {inputs.fullName}
                            onChange = {(e) => setInputs({...inputs, fullName : e.target.value})}
                        />
                    </div>

                    <div>
                        <label className = 'label p-2'>
                            <span className = 'text-base label-text'>User Name </span>
                        </label>
                        <input type = 'text' placeholder = 'Enter Your User Name' className = 'w-full input-bordered h-10'
                            value = {inputs.userName}
                            onChange = {(e) => setInputs({...inputs, userName : e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className = 'label p-2'>
                            <span className = 'text-base label-text'>Password </span>
                        </label>
                        <input type = 'password' placeholder = 'Enter Your Password' className = 'w-full input-bordered h-10'
                            value = {inputs.password}
                            onChange = {(e) => setInputs({...inputs, password : e.target.value})}
                        />
                    </div>

                    <div>
                        <label className = 'label p-2'>
                            <span className = 'text-base label-text'>Confirm Password</span>
                        </label>
                        <input type = 'password' placeholder = 'Enter Your Password Again To Confirm' className = 'w-full input-bordered h-10'
                            value = {inputs.confirmPassword}
                            onChange = {(e) => setInputs({...inputs, confirmPassword : e.target.value})}
                        />
                    </div>

                    <GenderCheckBox onCheckboxChange = {handleCheckboxChange} selectedGender = {inputs.gender} />

                    <Link to = '/login' className = 'text-sm hover:underline hover: text-blue-500 mt-2 inline-block'>
                        Already have an account ?
                    </Link>
                    <div>
                        <button className = 'btn btn-block btn-sm mt-2 border border-slate-700' disabled = {loading}>
                            {loading ? <span className = 'loading loading-spinner'></span> : "Sign up"}
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default SignUp