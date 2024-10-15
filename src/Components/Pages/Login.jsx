import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return ( 
        <div className='flex justify-center items-center h-screen bg-gray-200'>
          <div className='px-10 py-10  shadow-lg bg-white rounded-md border-b-2 border-gray-300'>
            <h1 className='text-3xl block text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-blue-900'> LOGIN </h1>
            <span>{/* ProgressBar */}</span>
            
           <div class='mt-3 p-6'>
           <div className= ' ml-2 mr-2'>
            <label for='email' class='block text-base mb-2 text-lg'>Email</label>
            <input type='text' id='email' className='w-full border rounded-xl text-base px-2 py-1 focus:outline-none focus;ring-0 focus:border-gray-600' placeholder='Enter email'></input>
            </div>
           </div>

           <div class=' p-6'>
           <div className= 'ml-2 mr-2'>
            <label for='password' class='block text-base mb-2 text-lg'>Password</label>
            <input type='password' id='password' className='w-full border rounded-xl text-base px-2 py-1 focus:outline-none focus;ring-0 focus:border-gray-600' placeholder='Enter password'></input>
           </div>
           <div>
            <div className='mt-3 ml-5 flex justify-between itmes-center'>
            <label>
              <input type='checkbox' className=''/>
            Remeber Me <input name="Remeber Me" />
      </label>
      <div className='mt-3'>
        <Link to="/Reset">
        <button className='font-semibold'>Forgot Password?</button>
        </Link>
        </div>
            </div>
            <div className='ml-2 p-6 flex flex-col gap-y-6'>
            <Link to="/">
              <button type='submit' className='border-2 border-indigo-700 bg-indigo-700 font-medium text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700'>Login</button>
              </Link>
              <button className='flex border-2 py-1 rounded-md border-gray-200 items-center justify-center gap-2 activ:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'>
                <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>
                Sign with Google</button>
            </div>
            <div className='mt-3 flex justify-center items-center'>
              <p className='font-medium text-base'>Don't have an account</p>
              <Link to="/Register">
              <button className=' text-base text-blue-500 font-medium ml-2'>Sign Up</button>
              </Link>
            </div>
           </div>
          </div>
        </div>
        </div>
  );
};

export default Login;