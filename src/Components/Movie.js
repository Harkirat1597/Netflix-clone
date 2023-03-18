import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../Context/Movie/MovieContext";
import MovieCard from "./Loading/MovieCard";

const base_url = "https://image.tmdb.org/t/p/original/";

const Movie = ({ movie, isLargeRow }) => {
    const navigate = useNavigate();

    const [loading, setloading] = useState(true);

    const [hover, setHover] = useState(false);

    const movieContext = useContext(MovieContext);
    const { updateShowcase } = movieContext;

    const handleClick = () => {
        updateShowcase({...movie});
        setTimeout(() => {
            navigate('/play');
        }, 500);
        return;
    }

    const handleLoading = () => {
        setloading(false);
        return;
    }

    return (
        <div 
            className={`movie-poster ${isLargeRow && "movie-poster-large"}`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={handleClick}
        >
            <img
                style={loading ? { display: "none" } : {}}
                key={movie.id}
                src={`${base_url}${movie.poster_path}`}
                alt=""
                onLoad={handleLoading}
            />

            <MovieCard style={loading ? {} : { display: "none" }}/>

            {hover && <div className="movie-poster-hover-element">
                <div className="movie-poster-hover-element--play-icon-holder">
                    <div>
                        <i className="fa-solid fa-play"></i>
                    </div>
                </div>
                <h3>{movie.name ? movie.name : movie.title}</h3>
            </div>}
        </div>
    );
}

export default React.memo(Movie);