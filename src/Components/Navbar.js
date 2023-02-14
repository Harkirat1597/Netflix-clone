import React, { useState, useEffect, useContext } from 'react'
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import NetflixIcon from '../Icons/NetflixIcon.png';
import Avatar from '../Icons/Avatar.jpeg';
import userContext from '../Context/User/UserContext';

function Navbar({ type }) {
    const navigate = useNavigate();

    const [show, handleShow] = useState(false);

    const { user } = useContext(userContext);

    const handleTransitions = () => {
        if (window.scrollY > 100) handleShow(true);
        else handleShow(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleTransitions);
        return () => {
            window.removeEventListener('scroll', handleTransitions);
        }
    }, []);

    const handleClickNetflixIcon = (e) => {
        e.preventDefault();
        if (!user.isLoggedIn) return navigate("/");
        return navigate('/dashboard');
    }

    const handleClickAvatar = (e) => {
        e.preventDefault();
        if (!user.isLoggedIn) return;
        return navigate('/profile');
    }

    const handleClickSignIn = (e) => {
        e.preventDefault();
        navigate('/signin');
        return;
    }

    return (
        <div className={`nav ${show && "nav-black"}`}>
            <div className='nav-item-container width-control'>
                <img
                    className='nav-item nav-logo'
                    src={NetflixIcon}
                    alt=""
                    onClick={handleClickNetflixIcon}
                >
                </img>

                
                
                {type === "advertisement" && <button   
                    className='nav-item btn-sign-in'
                    onClick={handleClickSignIn}    
                >
                    Sign in
                </button>}
                
                {type === "dashboard" && <img
                    className='nav-item nav-avatar'
                    src={Avatar}
                    alt=""
                    onClick={handleClickAvatar}
                >
                </img>}


            </div>
        </div>
    );
}

export default Navbar;