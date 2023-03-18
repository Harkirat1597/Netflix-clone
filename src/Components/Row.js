import React, { useState, useEffect } from 'react'
import axios from '../API_Configurations/axios';
import Movie from './Movie';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        fetchData();
    }, [ fetchUrl ]);

    const fetchData = async () => {
        const res = await axios.get(fetchUrl);
        setMovies(res.data.results);
        return;
    }

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row-posters'>
                {movies.map((movie) => {
                    return <Movie movie={movie} isLargeRow={isLargeRow} />
                })}
            </div>
        </div>
    )
}

export default Row;