import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateMovieForm = (props) => {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/movies')
            .then(res => setMovie({ movies: res.data }))
            .catch(error => console.log(error));
    }, []);

    const { match } = props
    useEffect(() => {
        const id = match.params.id;
        const movieToUpdate = movie.find(addedMovie => `${addedMovie.id}` === id);
        if (movieToUpdate) {
            console.log(movieToUpdate);
            setMovie(movieToUpdate);
        }
    }, [match, movie]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // axios
        //     .put(`http://localhost:5000/api/movies${movie.id}`, movie)
        //     .then(res => {
        //         props.updateItems(res.data);
        //         props.history.push(`/item-list/${item.id}`);
        //         setItem(initialItem);
        //     })
        //     .catch(err => console.log(err.response));
    };

    return (
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="baseline" />
                <button className="md-button form-button">Add New Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;