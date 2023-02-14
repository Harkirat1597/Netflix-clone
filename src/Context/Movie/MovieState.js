import React, { useState } from "react";
import MovieContext from "./MovieContext";

const MovieState = (props) => {
    const [showcaseMovie, setShowcaseMovie] = useState({});

    const updateShowcase = (movie) => {
        setShowcaseMovie(movie);
        return;
    }

    let value = {
        showcaseMovie,
        updateShowcase
    }

    return (
        <MovieContext.Provider value={value}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieState;