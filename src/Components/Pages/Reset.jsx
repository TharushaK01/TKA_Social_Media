import React from 'react';
import { Link } from 'react-router-dom';

const Reset = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-300'>
      <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
        <p>Enter the email address associated with your account<br></br>
          and we'll send you a link to reset your password
        </p>
        <div class='mt-3 p-6'>
           <div className= ' ml-2 mr-2'>
            <input type='text' id='email' className='w-full border-2 rounded-xl text-base px-2 py-1 focus:outline-none focus;ring-0 focus:border-gray-600' placeholder='Enter email'></input>
            </div>
           </div>
           <div className='flex justify-center'>
            <Link to="/login">
              <button type='submit' className='border-2 border-indigo-700 bg-indigo-700 font-medium text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700'>CONTINUE</button>
              </Link>
              </div>

      </div>
      
    </div>
  )
}

export default Reset