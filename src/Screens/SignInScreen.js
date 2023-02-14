import React, { useContext, useRef, useState, useEffect } from 'react'
import './SignInScreen.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import userContext from '../Context/User/UserContext';

function SignInScreen() {
    const navigate = useNavigate();

    const { user, signInUser } = useContext(userContext);

    const [message, setMessage] = useState("");

    const emailRef = useRef();
    const passRef = useRef();

    useEffect(() => {
        if (user.isLoggedIn) return navigate("/dashboard");
    }, []);

    const handleClickSignIn = (e) => {
        e.preventDefault();
        const res = signInUser(emailRef.current.value, passRef.current.value);
        if (!res.success) return setMessage(res.error);
        setMessage(res.message);
        navigate("/dashboard");
        return;
    }

    return (
        <>
            <Navbar type={"signin"} />

            <div className='signin'>
                <div className='signin-background-overlay' />

                <div className='signin-form-container'>
                    <h1>Sign In</h1>
                    
                    <form>
                        <input type={"email"} placeholder={"Email or phone number"} ref={emailRef} required />
                        <input type={"password"} placeholder={"Password"} ref={passRef} required />
                        <button onClick={handleClickSignIn} type={"submit"}>Sign In</button>
                    </form>

                    <div className='info'>
                        <p> {message} </p>
                        <p>
                            <span>New to Netflix?</span>
                            <button onClick={() => navigate("/signup")}>Sign up now.</button>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignInScreen;