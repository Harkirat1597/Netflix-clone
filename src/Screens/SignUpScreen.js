import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import userContext from "../Context/User/UserContext";

const SignUpScreen = () => {
    const { user, signUpUser } = useContext(userContext);

    const navigate = useNavigate();

    const refEmail = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user.isLoggedIn) return navigate("/dashboard");
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        let res = signUpUser(refEmail.current.value, passRef.current.value, confirmPassRef.current.value);

        if (!res.success) return setMessage(res.error);
        else {
            setMessage(res.message);
            return navigate("/profile");
        }
    }

    return (
        <>
            <Navbar type={"signup"} />

            <div className="signup">
                <div className='signup-background-overlay' />

                <div className='signup-form-container'>
                    <h1>Sign Up</h1>

                    <form>
                        <input 
                            type={"email"} 
                            placeholder={user.email.length > 0 ? `${user.email}` : "Email or phone number"} 
                            ref={refEmail}
                            required
                        />
                        <input 
                            type={"password"} 
                            placeholder={"Password"}
                            ref={passRef}
                            required 
                        />
                        <input 
                            type={"password"} 
                            placeholder={"Confirm password"}
                            ref={confirmPassRef}
                            required 
                        />
                        <button type={"submit"} onClick={handleClick}>Create Account</button>
                    </form>

                    <div className='info'>
                        <p> {message} </p>
                        <p>
                            <span>Already have account with us?</span>
                            <button onClick={() => navigate('/signin')}> Sign in now.</button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpScreen;