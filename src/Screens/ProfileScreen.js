import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Avatar from '../Icons/Avatar.jpeg';
import userContext from '../Context/User/UserContext';

const ProfileScreen = () => {
    const { user, signOut, plans, buyPlan } = useContext(userContext);

    const [activePlan, setActivePlan] = useState(() => plans[0]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleActivePlan = (e, plan) => {
        e.preventDefault();
        document.querySelectorAll(".plan").forEach((el) => {
            el.classList.remove("plan-active");
        })
        e.target.closest(".plan").classList.add("plan-active");
        setActivePlan(plan);
        // console.log(activePlan);
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        signOut();
        navigate("/signin");
        return;
    }

    const handleBuyPlan = (e) => {
        e.preventDefault();
        console.log(activePlan);
        if (!activePlan) return;
        let res = buyPlan(activePlan);
        if (!res.success) return setMessage(res.error);
        setMessage(res.message);
        return navigate("/dashboard"); 
    }

    return (
        <>
            <Navbar />
            
            <div className='profile-page'>

                <div className='profile-container'>
                    <div className='profile-header'>
                        <h1>Edit Profile</h1>
                    </div>

                    <div className='user'>
                        <div className='user-avatar-container'>
                            <img 
                                className='user-avatar'
                                src={Avatar}
                                alt=""
                            />
                        </div>
                        
                        <div className='user-info'>
                            <div className='user-email'>
                                harkiratsinghsur@gmail.com
                            </div>
                            
                            {!user.isPlanActive && <div className='user-plans'>
                                {plans.map((plan, i) => 
                                    <div 
                                        className={i === 0 ? 'plan plan-active': 'plan'} 
                                        onClick={(e) => {
                                            handleActivePlan(e, plan);
                                        }}
                                    >
                                        <p>&#8377;{plan.price}</p>
                                        <p>{plan.validity}</p>
                                    </div>
                                )}       
                            </div>}

                            {user.isPlanActive && <div className='user-plan-info'>
                                <h2>Plan Details</h2>
                                <p>Price - {user.planActive.price} </p>
                                <p>Validity - {user.planActive.validity} </p>
                            </div>}
                            
                            {!user.isPlanActive && activePlan && <button  className='btn-continue-plan'
                            onClick={handleBuyPlan}
                            >
                                Continue & Buy
                            </button>}

                            <button onClick={handleSignOut} className='btn-user-sign-out'>
                                Sign Out
                            </button>

                            <p>{message}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileScreen; 