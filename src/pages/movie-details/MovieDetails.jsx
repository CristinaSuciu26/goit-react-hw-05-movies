import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/Api';
import styles from './MovieDetails.module.css';
import Loader from 'pages/loader/Loader';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setTimeout(() => {
          setMovieDetails(details);
          setLoading(false);
        }, 750);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  const roundedPopularity = Math.round(movieDetails.vote_average * 10);
  const releaseYear = movieDetails.release_date.split('-')[0];

  return (
    <div className={styles.container}>
      <button
        style={{ marginLeft: '0px' }}
        className={styles.button}
        onClick={() => navigate('/')}
      >
        &#11160; Go back
      </button>
      <div className={styles.imgContainer}>
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
              : `https://i.imgur.com/p3MsT9t.jpg`
          }
          alt={movieDetails.title}
        />

        <div className={styles.detailsContainer}>
          <h1>{`${movieDetails.title} (${releaseYear})`}</h1>
          <p>
            <span>
              {' '}
              <strong>User score:</strong>{' '}
            </span>
            {roundedPopularity}%
          </p>
          <p>
            <span>
              {' '}
              <strong>Overview: </strong>
            </span>

            {movieDetails.overview}
          </p>

          <p>
            <span>
              {' '}
              <strong>Genres:</strong>
            </span>

            {movieDetails.genres.map(genre => (
              <span key={genre.id}> {genre.name}</span>
            ))}
          </p>

          <div className={styles.infoContainer}>
            <h3>Additional information</h3>
            <nav>
              <button className={styles.button}>
                <NavLink className={styles.navLink} to={`cast`}>
                  Cast
                </NavLink>
              </button>
              <button className={styles.button}>
                <NavLink className={styles.navLink} to={`reviews`}>
                  Reviews
                </NavLink>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
