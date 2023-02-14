import React, { useEffect, useContext } from 'react';
import './HomeScreen.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar.js';
import Banner from '../Components/BannerCarousal/Banner';
import RowCarousal from '../Components/RowCarousal/RowCarousal.js';
import requests from '../API_Configurations/Requests.js';
import userContext from '../Context/User/UserContext.js';

const HomeScreen = () => {
    const { user } = useContext(userContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isLoggedIn) return navigate("/signup");
        else if (user.isLoggedIn && !user.isPlanActive) return navigate("/profile"); 
    }, []);

    return (
        <>
            {/* Navbar */}
            <Navbar type={"dashboard"}/>

            <div className='homescreen width-control'>

                {/* Banner */}
                <Banner />

                {/* Rowss */}
                <RowCarousal 
                    title={"NETFLIX ORIGINALS"}
                    fetchUrl={requests.fetchNetflixOriginals}
                    isLargeRow
                />

                <RowCarousal 
                    title={"Trending Now"}
                    fetchUrl={requests.fetchTrending}
                />
                
                <RowCarousal 
                    title={"Top Rated"}
                    fetchUrl={requests.fetchToprated}
                />

                <RowCarousal 
                    title={"Action Movies"}
                    fetchUrl={requests.fetchActionMovies}
                />
                
                <RowCarousal 
                    title={"Comedy Movies"}
                    fetchUrl={requests.fetchComedyMovies}
                />

                <RowCarousal 
                    title={"Horror Movies"}
                    fetchUrl={requests.fetchHorrorMovies}
                />
                
                <RowCarousal 
                    title={"Romance Movies"}
                    fetchUrl={requests.fetchRomanceMovies}
                />
                
                <RowCarousal 
                    title={"Documentaries"}
                    fetchUrl={requests.fetchDocumentaries}
                />
                
            </div>
        </>
    );
}

export default HomeScreen;