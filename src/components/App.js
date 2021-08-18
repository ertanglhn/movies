import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import Axios from 'axios';


class App extends React.Component {
    state = {
        "movies": [],
        "searchQuery": ""
    };

    /* async componentDidMount() {
        const baseUrl = "http://localhost:3001/movies";
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log(data);
        console.log(response);
        this.setState({
            movies : data
        });
    } */
    async componentDidMount() {
        const baseUrl = "http://localhost:3001/movies";
        const response = await Axios.get(baseUrl);
        console.log("Did mount:");
        console.log("----------------------------------------------------------------------");
        console.log(response.data);
        this.setState({
            movies: response.data
        });
    }

    async componentDidUpdate() {
        const baseUrl = "http://localhost:3001/movies";
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log("Did update:");
        console.log("----------------------------------------------------------------------");
        console.log(data);
    }
    /* deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({ movies: newMovieList }));
    } */
    /* //FETCH API
    deleteMovie = async (movie) => {
        const baseUrl = `http://localhost:3001/movies/${movie.id}`;
        await fetch(baseUrl, {
            method: "DELETE"
        });
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({ movies: newMovieList }));
    } */

    //Axios
    deleteMovie = async (movie) => {
        const baseUrl = `http://localhost:3001/movies/${movie.id}`;
        await Axios.delete(baseUrl);
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({ movies: newMovieList }));
    }

    searhMovie = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
    }



    render() {
        var filteredMovieList = this.state.movies.filter(
            (movie) => { return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1 }
        )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar searchMovieProp={this.searhMovie} />
                    </div>
                </div>
                <MovieList
                    movies={filteredMovieList}
                    deleteMovieProp={this.deleteMovie} />
            </div>
        );
    }
}

export default App;