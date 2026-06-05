import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { useSearchParams } from "react-router-dom";
import "../css/Home.css";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchQuery = searchParams.get("q") || "";

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                if (searchQuery) {
                    const searchResults = await searchMovies(searchQuery);
                    setMovies(searchResults);
                } else {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                }
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [searchQuery]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements.search.value.trim();
        if (query) {
            setSearchParams({ q: query });
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    name="search"
                    placeholder="Search for movies..."
                    className="search-input"
                    defaultValue={searchQuery}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

                {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading... </div>
            : (
            <div className="movies-grid">
                {movies.map(
                    (movie) => 
                        (
                        <MovieCard movie={movie} key={movie.id} />
                        )
                )}
            </div>
            )}
        </div>
    );
}

export default Home
