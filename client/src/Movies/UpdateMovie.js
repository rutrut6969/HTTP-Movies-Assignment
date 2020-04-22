import React, { useState } from 'react';
import axios from 'axios';

export default function UpdateMovie(props) {
  // Selected Movie to Edit:
  const [selectedMovie, setSelectedMovie] = useState({
    id: '',
    title: '',
    movie: false,
  });

  //State for new movie information:
  const [newInfo, setNewInfo] = useState({
    title: '',
    director: '',
    stars: '',
  });

  // Able to Add new Stars to movie.stars
  const [addStar, setAddStar] = useState({
    add: false,
    star: '',
  });

  // Able to remove Stars from movie.stars
  const [removeStar, setRemoveStar] = useState({
    remove: false,
    star: '',
  });

  // Sets the state for AddStar inputs to be displayed
  const addStarBtn = (e) => {
    setAddStar({
      ...addStar,
      add: true,
    });
    setRemoveStar({
      ...removeStar,
      remove: false,
    });
  };

  // Sets the state for the star itself to be added
  const starChange = (e) => {
    e.preventDefault();
    setAddStar({
      ...addStar,
      star: e.target.value,
    });
  };

  const starChangeBtn = (e) => {
    e.preventDefault();
    setAddStar({
      ...addStar,
      add: false,
    });
  };

  // Sets the state for the remove area to be displayed
  const removeStarBtn = (e) => {
    e.preventDefault();
    setRemoveStar({
      ...removeStar,
      remove: true,
    });
    setAddStar({
      ...addStar,
      add: false,
    });
  };

  // Allows us to change the selected movie
  const selectChange = (e) => {
    setSelectedMovie({
      id: e.target.value,
      title: e.target.name,
    });
  };

  //Handles New Info Changes
  const handleChange = (e) => {
    setNewInfo({
      ...newInfo,
      [e.target.name]: e.target.value,
    });
  };

  //Updates the movie:
  const update = (e) => {
    e.preventDefault();
    const newMovieInfo = setNewInfo({
      ...newInfo,
      stars: addStar,
    });
    axios
      .put('http://localhost:5000/movies/:id', newMovieInfo)
      .then((res) => console.log({ res }))
      .catch((err) => console.error({ err }));
  };

  return (
    <>
      {selectedMovie.movie ? (
        <form onSubmit={update}>
          <label htmlFor='title'>
            Title:
            <input
              name='title'
              type='text'
              onChange={handleChange}
              value={newInfo.title}
            />
          </label>
          <label htmlFor='director'>
            Director:
            <input
              name='director'
              type='text'
              onChange={handleChange}
              value={newInfo.director}
            />
          </label>
          {addStar.add ? (
            <>
              <label htmlFor='starName'>
                Star Name:
                <input
                  name='starName'
                  value={addStar.star}
                  onChange={starChange}
                />
              </label>
              <button onClick={starChangeBtn}>Add Star</button>
            </>
          ) : (
            <>
              <button onClick={addStarBtn}>Add Star</button>
            </>
          )}
          {removeStar.remove ? (
            <label htmlFor='starName'>
              Select Star to Remove:
              <select name='starName'>
                {props.movies.map((movie) => {
                  movie.stars.map((star) => (
                    <option value={star} name={star}>
                      {star}
                    </option>
                  ));
                })}
              </select>
            </label>
          ) : (
            <>
              <button onClick={removeStarBtn}>Remove Star</button>
            </>
          )}
          <button type='submit'>Submit Info</button>
        </form>
      ) : (
        <form>
          <select name='movies' onChange={selectChange}>
            {props.movies.map((movie) => (
              <option name={movie.title} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSelectedMovie({ ...selectedMovie, movie: true })}
          >
            Select
          </button>
        </form>
      )}
    </>
  );
}
