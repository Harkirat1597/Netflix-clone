import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../Context/Movie/MovieContext";
import MovieCard from "./Loading/MovieCard";
import UserContext from "../Context/User/UserContext";

const base_url = "https://image.tmdb.org/t/p/original/";

const Movie = ({ movie, isLargeRow }) => {
    const navigate = useNavigate();

    const [loading, setloading] = useState(true);
    const [hover, setHover] = useState(false);

    const movieContext = useContext(MovieContext);
    const { updateShowcase } = movieContext;

    const userContext = useContext(UserContext);
    const { watchlist, removeFromWatchlist, addToWatchlist } = userContext;

    const [containsInWatchlist, setContainsInWatchlist] = useState(() => {
        if (watchlist.length <= 0) return false;
        let contains = watchlist.filter(m => m.id === movie.id);
        if (contains.length > 0) return true;
        else return false;
    })

    const handleClick = () => {
        updateShowcase({ ...movie });
        setTimeout(() => {
            navigate('/play');
        }, 500);
        return;
    }

    const handleLoading = () => {
        setloading(false);
        return;
    }

    const handleAddRemoveFromWatchList = () => {
        if (!containsInWatchlist) {
            addToWatchlist(movie);
            setContainsInWatchlist(true);
        } else {
            removeFromWatchlist(movie);
            setContainsInWatchlist(false);
        }
    }

    return (
        <div
            className={`movie-poster ${isLargeRow && "movie-poster-large"}`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            {containsInWatchlist && <i
                className="fa-solid fa-bookmark"
                style={{ color: "#E50914", fontSize: "1.5rem", position: "absolute", top: "5%", left: "5%", zIndex: "100" }}
                onClick={handleAddRemoveFromWatchList}
            ></i>}

            <img
                style={loading ? { display: "none" } : {}}
                key={movie.id}
                src={`${base_url}${movie.poster_path}`}
                alt=""
                onLoad={handleLoading}
            />

            <MovieCard style={loading ? {} : { display: "none" }} />

            {hover && <div className="movie-poster-hover-element">
                <div className="movie-poster-hover-element--play-icon-holder">
                    <div className="btn-scale-onHover-increase" onClick={handleClick}>
                        <i className="fa-solid fa-play"></i>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", zIndex: "100" }}>
                    {containsInWatchlist && [
                        <i
                            className="fa-solid fa-bookmark"
                            style={{ color: "white" }}
                            onClick={handleAddRemoveFromWatchList}
                        ></i>,
                        <p className="text-small text-white"> Remove from watch later </p>
                    ]}

                    {!containsInWatchlist && [
                        <i
                            className="fa-regular fa-bookmark"
                            style={{ color: "white" }}
                            onClick={handleAddRemoveFromWatchList}
                        ></i>,
                        <p className="text-small text-white"> Add to watch later </p>
                    ]}
                </div>
                <h3>{movie.name ? movie.name : movie.title}</h3>
            </div>}
        </div>
    );
}

export default React.memo(Movie);