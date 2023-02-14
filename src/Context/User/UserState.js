import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const initialStateUser = {
        email: "",
        password: "",
        isLoggedIn: false,
        planActive: {},
        isPlanActive: false
    }

    const plans = [
        {
            id: 1,
            validity: "1 year",
            price: 1799
        },
        {
            id: 2,
            validity: "6 months",
            price: 1199
        },
        {
            id: 3,
            validity: "1 month",
            price: 699
        }
    ]

    const [user, setUser] = useState(() => {
        let localUser = JSON.parse(localStorage.getItem("localUserNetflix"));
        if (!localUser) return initialStateUser;
        return localUser;
    });

    useEffect(() => {
        const setLocalUser = () => {
            localStorage.setItem("localUserNetflix", JSON.stringify(user));
            // console.log(JSON.parse(localStorage.getItem("localUserNetflix")));
            return;
        }
        setLocalUser();
    }, [user]);

    const updateUser = (userObj) => {
        return setUser({ ...user, ...userObj });
    }

    const signOut = () => {
        return updateUser({isLoggedIn: false});
    }

    const signUpUser = (email, password, confirmPass) => {
        if (!email || !password || !confirmPass) return {success: false, error: "Invalid input"};
        
        if (password !== confirmPass) {
            return {success: false, error: "* Password and confirm password does not match!"};
        } 

        if (password === confirmPass && password.length < 7) {
            return {success: false, error: "* Password length must be greater than or equal to 7"};
        }

        updateUser({email, password, isLoggedIn: true});
        return {success: true, message: "Account created successfully!"};
    }

    const signInUser = (email, password) => {
        if (!email || !password) return {success: false, error: "Invalid input"};

        if (email === user.email && password === user.password) {
            updateUser({isLoggedIn: true})
            return {success: true, message: "Welcome back!"};
        }
        else return {success: false, error: "Wrong username or password entered!"};
    }

    const buyPlan = (plan) => {
        if (!plan) return {success: false, error: "Select a plan to buy!"};
        let planId = plans.map((pln) => pln.id).indexOf(plan.id);
        if (planId < 0) return {success: false, error: "Invalid plan!"};
        updateUser({planActive: plan, isPlanActive: true});
        return {success: true, message: "Thank you for purchasing our services!"}
    }

    let value = {
        user,
        updateUser,
        signOut,
        signUpUser,
        signInUser,
        plans,
        buyPlan
    }

    return <UserContext.Provider value={value}>
        {props.children}
    </UserContext.Provider>
}

export default UserState;