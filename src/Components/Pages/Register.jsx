import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners/ClipLoader';
import { AuthContext } from '../AppContext/AppContext';
import { db } from '../../Components/firebase/firebase'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email and password
      if (!email || !password) {
        alert("Please fill in both email and password.");
        setLoading(false);
        return;
      }

      console.log('Email:', email);
      console.log('Password:', password);
      
      const userCredential = await registerWithEmailAndPassword(email, password);
      
      const userRef = collection(db, 'users');
      await addDoc(userRef, {
        uid: userCredential.user.uid,
        name: name,
        email: email,
      });
      
      navigate('/'); // Navigate after successful registration
    } catch (error) {
      console.error('Error registering user:', error.message);
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
          <div className='px-40 py-10 shadow-lg bg-white rounded-md border-b-2 border-gray-300'>
            <h1 className='text-3xl block text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-blue-900'>REGISTER</h1>
            <form onSubmit={handleRegister} className='mt-3 px-30'>
              <div>
                <label htmlFor='name' className='block text-base mb-2 text-lg'>Name</label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full border rounded-xl text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'
                  placeholder='Enter name'
                  required
                />
              </div>

              <div className='mt-3'>
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

              <div className='mt-3'>
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

              <div className='mt-6'>
                <button
                  type='submit'
                  className='border-2 border-indigo-700 bg-indigo-700 font-medium text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700'
                >
                  Register
                </button>
              </div>
            </form>

            <div className='mt-3 flex justify-center items-center'>
              <p className='font-medium text-base'>Already have an account?</p>
              <Link to="/Login">
                <button className='text-base text-blue-500 font-medium ml-2'>Login</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
