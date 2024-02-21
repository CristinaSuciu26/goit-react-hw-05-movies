import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../../services/Api';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const movieCast = async () => {
      try {
        const response = await fetchMovieCast(movieId);
        setCast(response);
      } catch (error) {
        console.error(error);
      }
    };

    movieCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Movie Cast:</h2>
      {cast.length !== 0 && (
        <div>
          {cast.cast.map(actor => (
            <div key={actor.id} className={styles.cast}>
              {' '}
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : `https://i.imgur.com/p3MsT9t.jpg`
                }
                alt={actor.original_name}
              />
              <div className={styles.castDetails}>
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {cast.length === 0 && <div>We don't have any cast for this movie.</div>}
    </div>
  );
};

export default Cast;
