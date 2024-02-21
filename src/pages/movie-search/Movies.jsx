import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { handleSearch } from '../../services/Api';
import styles from './Movies.module.css';

const Movies = ({ value = '', onSubmit }) => {
  const [inputValue, setInputValue] = useState(value);
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const results = await handleSearch(inputValue);
      setSearchResults(results);
      console.log('Search Results:', results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }

    if (onSubmit) {
      onSubmit(inputValue);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Movie Search:</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search movies..."
        />
        <button className={styles.submitBtn} type="submit">
          Search
        </button>
      </form>

      <div>
        <ul>
          {searchResults &&
            searchResults.map(movie => (
              <li key={movie.id} className={styles.movieList}>
                <NavLink
                  className={styles.navLink}
                  to={`/movie-details/${movie.id}`}
                >
                  {movie.title}
                </NavLink>
                {movie.releaseYear}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

Movies.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Movies;
