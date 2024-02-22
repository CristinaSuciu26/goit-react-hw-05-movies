import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import Movies from '../pages/movie-search/Movies.jsx';
import MovieDetails from '../pages/movie-details/MovieDetails.jsx';
import SharedLayout from '../pages/shared-layout/SharedLayout.jsx';
import NotFoundPage from '../pages/not-found/NotFound.jsx';
import { Suspense, lazy } from 'react';
import Loader from '../pages/loader/Loader.jsx';

const Cast = lazy(() => import('../pages/movie-details/cast/Cast.jsx'));
const Reviews = lazy(() =>
  import('../pages/movie-details/reviews/Reviews.jsx')
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
      </Route>
      <Route path="movie-details/:movieId" element={<MovieDetails />}>
        <Route
          path="cast"
          element={
            <Suspense fallback={<Loader />}>
              <Cast />
            </Suspense>
          }
        />
        <Route
          path="reviews"
          element={
            <Suspense fallback={<Loader />}>
              <Reviews />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
