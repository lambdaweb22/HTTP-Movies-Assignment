import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovieForm = (props) => {
    console.log(props);
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        director: "",
        metascore: 0,
        stars: []
    });

    // useEffect(() => {
    //     getMovie();
    // }, [props.location.state]);

    useEffect(() => {
        if (props.location.state) {
            setMovie({ ...props.location.state });
        }
    }, [props.location.state])

    // const getMovie = () => {
    //     const id = props.match.params.id;
    //     axios
    //         .get(`http://localhost:5000/api/movies/${id}`)
    //         .then(res => setMovie(res.data))
    //         .catch(err => console.log(err.response));
    // }

    // const { match } = props
    // useEffect(() => {
    //     const id = match.params.id;
    //     const movieToUpdate = movie.find(addedMovie => `${addedMovie.id}` === id);
    //     if (movieToUpdate) {
    //         console.log(movieToUpdate);
    //         setMovie(movieToUpdate);
    //     }
    // }, [match, movie]);

    const changeHandler = e => {
        setMovie({ ...movie, [e.target.name]: [e.target.value] });
    }

    // const changeHandler = e => {
    //     e.persist();
    //     let value = e.target.value;
    //     if (e.target.name === 'metascore') {
    //         value = parseInt(value, 10);
    //     }

    //     setMovie({
    //         ...movie,
    //         [e.target.name]: value
    //     });
    // };

    const editMovie = e => {
        e.preventDefault();
        const editedMovie = {...movie}
        if (!Array.isArray(movie.stars)) {
            editedMovie.stars = editedMovie.stars.split(",");
        }
        // console.log(editedMovie, "<--- Edited Movie")
        axios
            // .put(`http://localhost:5000/api/movies${movie.id}`, movie)
            .put(`http://localhost:5000/api/movies/${editedMovie.id}`, editedMovie)
            .then(res => {
                setMovie({
                    id: null,
                    title: "",
                    director: "",
                    metascore: 0,
                    stars: []
                });
                props.history.push("/");
            })
            // .then(res => {
            //     props.updateItems(res.data);
            //     props.history.push(`/item-list/${item.id}`);
            //     setItem(initialItem);
            // })
            .catch(err => console.error(err.response));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={editMovie}>
                Title:
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={movie.title}
                />
                <div className="baseline" />
                Director:
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={movie.director}
                />
                <div className="baseline" />
                Metascore:
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    value={movie.metascore}
                />
                Stars:
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    value={movie.stars}
                />
                <div className="baseline" />
                <button className="md-button form-button">Update Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;