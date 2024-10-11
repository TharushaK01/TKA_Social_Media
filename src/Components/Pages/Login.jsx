import React from 'react';



const Login = () => {
  return ( 
        <div className='flex justify-center items-center h-screen bg-gray-200'>
          <div className='w-96 p-6 shadow-lg bg-white rounded-md border-b-2 border-gray-300'>
            <h1 className='text-3xl block text-center font-semibold'> LOGIN </h1>
            <span>{/* ProgressBar */}</span>
            
           <div class='mt-3'>
           <div className= 'w-full ml-10'>
            <label for='email' class='block text-base mb-2'>Email</label>
            <input type='text' id='email' className='border w-86 text-base px-2 py-1 focus:outline-none focus;ring-0 focus:border-gray-600' placeholder='Enter email'></input>
            </div>
           </div>

           <div class='mt-3'>
           <div className= 'w-full ml-10'>
            <label for='password' class='block text-base mb-2'>Password</label>
            <input type='password' id='password' className='border w-86 text-base px-2 py-1 focus:outline-none focus;ring-0 focus:border-gray-600' placeholder='Enter password'></input>
            </div>
           </div>
           <div>
            <div className='mt-3 ml-5'>
            <label>
              <input type='checkbox' className='w-6 ml-5'/>
            Remeber Me <input name="Remeber Me" />
      </label>
      <div>
        <span></span>
        <labe className='mt-3 ml-10 font-semibold'>Forgot Password?</labe>
        </div>
            </div>
           </div>
          </div>
        </div>
  )
}

export default Login