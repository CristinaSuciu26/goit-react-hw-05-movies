import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../../services/Api';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const movieReviews = async () => {
      try {
        const response = await fetchMovieReviews(movieId);
        console.log('API Response:', response); // Check the response from the API
        setReviews(response);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    movieReviews();
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <div>
          <h2>Movie Reviews</h2>
          <ul>
            {reviews.map(review => (
              <li key={review.id} className={styles.list}>
                <div className={styles.author}>
                  {' '}
                  <p>{review.author}</p>
                </div>

                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.noReviews}>
          We don't have any reviews for this movie.
        </div>
      )}
    </>
  );
};

export default Reviews;
