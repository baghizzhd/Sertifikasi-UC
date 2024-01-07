import React, { useState } from "react";
import logo from '../Assets/logo-black.png';
import loginimage from '../Assets/login.png';
import 'typeface-poppins';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const [animateForm, setAnimateForm] = useState(false);
    const [animateImage, setAnimateImage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const Logo = () => {
        return (
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        );
      }

      const Auth = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username: username,
                password: pass
            });
            navigate("/books-master");
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    // Wrong Password
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data.msg
                    });
                } else if (status === 404) {
                    // Email not found
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data.msg
                    });
                } else {
                    // Other errors
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'An unexpected error occurred'
                    });
                }
            }
        }
    };

      return (
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 h-screen w-full overflow-hidden container-main">
          <div className={`hidden xl:block ${animateImage ? 'animate-image-right' : ''}`}>
            <img className="flex w-full h-full object-cover" src={loginimage} alt="Login" />
          </div>
          <div className={`auth-form-container ${animateForm ? 'animate-form-left' : ''}`}>
            <Logo />
            <p className="text-left font-bold login-tagline2">Login</p>
            <p className="my-2.5 mb-3 login-tagline">Enter your username and password to login the website</p>
            <form onSubmit={Auth} className="login-form">
              <label htmlFor="username">Username</label>
              <input required
                value={username} 
                onChange={(e) => setUsername(e.target.value.toLowerCase())}    
                placeholder="Your Username"
                id="username"
                name="username"
                className="text-left inline-block rounded-md text-black  custom-input placeholder-gray-600"
                autoComplete="username"
              />
              <label htmlFor="password">Password</label>
              <div className="mt-auto password-input flex">
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your Password"
                  id="password"
                  name="password"
                  className="text-left inline-block border-none rounded-md text-black custom-input placeholder-gray-600"
                  autoComplete="current-password"
                />
                <button type="button" className="btn-showhide2" onClick={togglePasswordVisibility}>
                  {showPassword ? <BiShow /> : <BiHide />}
                </button>
              </div>
              <button
                type="submit"
                className="border-none cursor-pointer font-semibold inline-block bg-gray-700 hover:bg-gray-900 rounded-md text-white custom-btn"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      );  
}

export default Login