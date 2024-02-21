import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTrendingMovies } from 'services/Api';
import styles from './Home.module.css';

const Home = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setFilms(movies);
        setLoading(false);
        console.log('Films after state update:', movies);
      } catch (error) {
        console.error('Error fetching movies', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [films]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <ul className={styles.container}>
      <h2 className={styles.title}>Trending today</h2>
      {films.map(movie => (
        <li key={movie.id} className={styles.list}>
          {''}
          <NavLink
            className={styles.navLink}
            to={`/movie-details/${movie.id}`}
            state={{ from: location }}
            cover={movie.poster_path}
          >
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

Home.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};

export default Home;