import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import MovieContext from '../Context/Movie/MovieContext';


function PlayScreen() {
    const movieContext = useContext(MovieContext);
    const { showcaseMovie } = movieContext;
    
    const base_url = "https://image.tmdb.org/t/p/original";
    const [movie, setMovie] = useState({});

    // Effect for Setting movie
    useEffect(() => {
        setMovie(showcaseMovie);
    }, [showcaseMovie]);
    
    return (
        <>
            <Navbar type={"dashboard"}/>

            <div className='play width-control'>
                <div className='playscreen'>
                    {/* Movie backdrop image */}
                    <div className='playscreen-backdrop-image'
                        style={{
                            backgroundSize: "cover",
                            backgroundImage: `url("${base_url}${movie.backdrop_path}")`,
                            backgroundPosition: "top center"
                        }}
                    ></div>
                    <div className='overlay-playscreen'>
                        <div className='playscreen-btn-container'>
                            <button className='btn-playscreen'>
                                <i className="fa-solid fa-play"></i>
                            </button>
                            <button className='btn-playscreen' style={{display: "none"}}>
                                <i class="fa-solid fa-pause"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='playscreen-movie-info'>
                    <h1> {movie.title ? movie.title : movie.original_name} </h1>
                    <h2 style={{fontWeight: "lighter"}}> Rating <span> {Math.floor(movie.vote_average)} </span> </h2>
                    <p> {movie.overview} </p>
                </div>

            </div>   
        </>
    )
}

export default PlayScreen