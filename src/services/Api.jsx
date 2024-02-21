import axios from 'axios';

const API_KEY = '90e4d7a1b65c00bef7f3cdbf73e78954';
const BASE_URL = 'https://api.themoviedb.org/3';

axios.defaults.baseURL = BASE_URL;

const params = {
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
};
const fetchMovies = async (endpoint, queryParams = {}) => {
  try {
    const response = await axios.get(`${endpoint}`, {
      params: queryParams,
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const handleSearch = async movieName => {
  try {
    const response = await axios.get(
      `/search/movie?query=${movieName}`,
      params
    );
    return response.data.results;
  } catch (error) {
    console.error(`Error searching for "${movieName}":`, error);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`trending/movie/day`, params);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async movieName => {
  const endpoint = '/search/movie';
  const queryParams = { query: movieName };
  return fetchMovies(endpoint, queryParams);
};

export const fetchMovieDetails = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieCast = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};
export const fetchMovieReviews = async movieId => {
  const endpoint = `/movie/${movieId}/reviews`;
  return fetchMovies(endpoint, params.params);
};

export { fetchMovies };
