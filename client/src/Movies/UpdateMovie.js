import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieList from './MovieList';

export default function UpdateMovie(props) {
  const [updateInfo, setUpdateInfo] = useState({});
  const { push } = useHistory();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setUpdateInfo(res.data);
      })
      .catch((err) => console.error({ err }));
  }, []);
  const handleChange = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  };
  const starChange = (e) => {
    setUpdateInfo({
      ...updateInfo,
      stars: [...updateInfo.stars, e.target.value],
    });
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updateInfo)
      .then((res) => {
        props.setMovieList({
          ...props.movieList,
          ...updateInfo,
        });
        push(`/movies/${id}`);
      })
      .catch((err) => {
        console.error({ err });
      });
  };
  return (
    <form onSubmit={submit}>
      {console.log({ updateInfo })}
      <label htmlFor='title'>
        Title:
        <input name='title' value={updateInfo.title} onChange={handleChange} />
      </label>
      <label htmlFor='director'>
        Director:
        <input
          name='director'
          value={updateInfo.director}
          onChange={handleChange}
        />
      </label>
      <label htmlFor='star'>
        Add Star:
        <input type='text' name='star' onChange={starChange} />
      </label>
      <button>Submit</button>
    </form>
  );
}
