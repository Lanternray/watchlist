import "../css/MovieModal.css";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="modal-poster"
          />
          <div className="modal-header-info">
            <h2>{movie.title || movie.name}</h2>
            <p className="modal-year">
              {movie.release_date?.split("-")[0] ||
                movie.first_air_date?.split("-")[0]}
            </p>
            {movie.vote_average && (
              <p className="modal-rating">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            )}
          </div>
        </div>
        <div className="modal-body">
          <h3>Overview</h3>
          <p>{movie.overview || "No overview available."}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;