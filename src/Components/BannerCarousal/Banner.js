import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../API_Configurations/axios';
import requests from '../../API_Configurations/Requests';
import MovieContext from '../../Context/Movie/MovieContext';

const base_url = "https://image.tmdb.org/t/p/original";

function Banner() {
    const context = useContext(MovieContext);
    const { updateShowcase } = context;

    const navigate = useNavigate();

    const [movie, setMovie] = useState([]);

    const truncateString = (str, n) => {
        if (!str) return;
        return str.length > n ? str.substr(0, n-1) + '...' : str;
    }

    const fetchData = async () => {
        const res = await axios.get(requests.fetchNetflixOriginals);
        setMovie(res.data.results[0]);
        return res;
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleClickPlay = () => {
        updateShowcase({...movie});
        setTimeout(() => {
            navigate('/play');
        }, 500);
        return;
    }

    return (
        <header 
            className='banner'
            style={ 
                {
                    backgroundSize: "cover",
                    backgroundImage: `url("${base_url}${movie.backdrop_path}")`,
                    backgroundPosition: "center center"
                }
            }
        >
            <div className='banner-content'>
                <h1 className='banner-title'>{movie.name}</h1>
                
                <div className='banner-buttons'>
                    <button className='banner-button' onClick={handleClickPlay}>Play</button>
                    <button className='banner-button'>My list</button>
                </div>

                <div className='banner-description'>
                    {truncateString(movie.overview, 250)}
                </div>

            </div>

            <div className='banner-bottom-overlay-fade'></div>
        </header>
    )
}

export default Banner;