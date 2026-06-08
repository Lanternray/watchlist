import { useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieModal from "./MovieModal";

function MovieCard({movie}) {
    const [showModal, setShowModal] = useState(false);
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
            else addToFavorites(movie)
    }

    function onInfoClick() {
        setShowModal(true);
    }

    return (
        <>
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name}/>
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ❤︎⁠
                        </button>
                    </div>
                </div>

                <div className="movie-info" onClick={onInfoClick}>
                    <h3>{movie.title || movie.name}</h3>
                    <p>{movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0]}</p>
                </div>
            </div>
            {showModal && <MovieModal movie={movie} onClose={() => setShowModal(false)} />}
        </>
    );
}

export default MovieCard