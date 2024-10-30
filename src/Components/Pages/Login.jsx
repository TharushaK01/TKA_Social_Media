import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../Pages/AuthProvider'; 

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithEmailAndPassword, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await loginWithEmailAndPassword(email, password);
            console.log("Login Successfully");
            navigate('/');
        } catch (err) {
            console.error("Login failed:", err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);

        try {
            await signInWithGoogle();
            console.log("Google sign-in successful");
            navigate('/');
        } catch (err) {
            console.error("Google sign-in failed:", err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <ClipLoader color="#0a69ae" size={45} speedMultiplier={0.5} />
                </div>
            ) : (
                <div className='flex justify-center items-center h-screen bg-gray-200'>
                    <div className='px-10 py-10 shadow-lg bg-white rounded-md border-b-2 border-gray-300'>
                        <h1 className='text-3xl block text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-blue-900'>LOGIN</h1>
                        <form onSubmit={handleEmailPasswordLogin} className='mt-3 px-30'>
                            <div className='mt-3 p-6'>
                                <div className='ml-2 mr-2'>
                                    <label htmlFor='email' className='block text-base mb-2 text-lg'>Email</label>
                                    <input 
                                        type='email'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full border rounded-xl text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'
                                        placeholder='Enter email'
                                        required 
                                    />
                                </div>
                            </div>

                            <div className='p-6'>
                                <div className='ml-2 mr-2'>
                                    <label htmlFor='password' className='block text-base mb-2 text-lg'>Password</label>
                                    <input 
                                        type='password'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full border rounded-xl text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'
                                        placeholder='Enter password'
                                        required 
                                    />
                                </div>
                                <div>
                                    <div className='mt-3 ml-5 flex justify-between items-center'>
                                        <label>
                                            <input type='checkbox' />
                                            Remember Me
                                        </label>
                                        <div className='mt-3'>
                                            <Link to="/Reset">
                                                <button className='font-semibold'>Forgot Password?</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='ml-2 p-6 flex flex-col gap-y-6'>
                                        <button type='submit' className='border-2 border-indigo-700 bg-indigo-700 font-medium text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700'>
                                            Login
                                        </button>
                                        
                                        <button 
                                            type='button'
                                            onClick={handleGoogleSignIn}
                                            className='flex border-2 py-1 rounded-md border-gray-200 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'
                                        >
                                            {/* Google Sign-in SVG */}
                                            Sign in with Google
                                        </button>
                                    </div>

                                    <div className='mt-3 flex justify-center items-center'>
                                        <p className='font-medium text-base'>Don't have an account?</p>
                                        <Link to="/Register">
                                            <button className='text-base text-blue-500 font-medium ml-2'>Sign Up</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
