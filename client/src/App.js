import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route 
        exact path="/"
        render={props => <MovieList {...props} movies={movies} />} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} getMovies={getMovies} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateMovieForm {...props} />
        )}
      />
      {/* <Route exact path="/" component={UpdateMovieForm} /> */}
    </>
  );
};

export default App;
