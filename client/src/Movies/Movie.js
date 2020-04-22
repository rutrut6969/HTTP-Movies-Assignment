import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieList from './MovieList';

function Movie({ addToSavedList }, props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then((res) => {
        console.log(res);
        props.setMovieList(...props.movieList, res.data);
        history.push('/');
      })
      .catch((err) => console.error({ err }));
    setTimeout(history.push('/'), 10000);
  };
  console.log('Movie List', props.movieList);
  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button
        className='edit-button'
        onClick={() => history.push(`/update-movie/${movie.id}`)}
      >
        Edit
      </button>
      <button className='delete-button' onClick={deleteMovie}>
        Delete Movie
      </button>
    </div>
  );
}

export default Movie;
