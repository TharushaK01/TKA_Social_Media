import React from 'react';
import AuthProvider from './Components/AppContext/AppContext';
import Register from './Components/Pages/Register';
import './App.css';
import Pages from './Components/Pages/Pages';
import { BrowserRouter } from 'react-router-dom';
import AppContext from './Components/AppContext/AppContext';

function App() {
  return  (  
      <h1 className="App">
        <BrowserRouter>
        <AppContext>
        <AuthProvider>
        <Register />
        <Pages></Pages>
        </AuthProvider>
        </AppContext>
        </BrowserRouter>
      </h1>

);

}

export default App;
