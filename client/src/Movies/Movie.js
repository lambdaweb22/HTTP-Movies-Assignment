import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = e => {
    const id = this.props.match.params.id
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => {
        this.props.getMovies();
        this.props.history.push('/')
      })
      .catch(err => {
        console.err('error', err)
      })
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    //deconstruct
    const { movie } = this.state;

    return (
      <div className="save-wrapper">
        <MovieCard movie={movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link to={{pathname: `/update-movie/${this.state.movie.id}`, state: this.state.movie}}>
          <button>Update</button>
        </Link>
        {/* // <Link to={`/update-movie/${this.state.movie.id}`}>
        //   <button>Update</button>
        // </Link> */}
        <button onClick={this.deleteMovie}>Delete</button>
      </div>
    );
  }
}
