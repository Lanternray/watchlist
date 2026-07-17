import MovieCard from "../components/MovieCard";
import { useState, useEffect, useRef } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { useSearchParams } from "react-router-dom";
import "../css/Home.css";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
    const debounceRef = useRef(null);

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

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (value.trim()) {
                setSearchParams({ q: value.trim() });
            } else {
                setSearchParams({});
            }
        }, 500);
    };

    const handleClear = () => {
        setInputValue("");
        setSearchParams({});
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        className="search-input"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    {inputValue && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClear}
                            aria-label="Clear search"
                        >
                            &times;
                        </button>
                    )}
                </div>
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
