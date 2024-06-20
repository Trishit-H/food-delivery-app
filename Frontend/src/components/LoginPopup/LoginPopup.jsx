import { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const { url, token, setToken } = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("Login");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(formData => ({ ...formData, [name]: value }))
    };

    const handleOnLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;

        if (currentState === 'Login') {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl, formData);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleOnLogin}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-pop-inputs">
                    {
                        currentState === 'Login' ? <></> : <input type="text" name='name' onChange={handleOnChange} value={formData.name} placeholder='Your name' required />
                    }
                    <input type="email" name="email" onChange={handleOnChange} value={formData.email} placeholder="Your email" required />
                    <input type="password" name="password" onChange={handleOnChange} value={formData.password} placeholder="Your password" required />
                </div>
                <button type='submit'>{currentState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currentState === 'Login' ? <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p> : <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup;