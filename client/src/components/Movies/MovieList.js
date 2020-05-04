import React, { Component, useEffect, useState } from "react";
import config from "../../config.json";
import PropTypes from "prop-types";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import {
  getMovie,
  setMovies,
  clearCache,
  getRelatedId,
  changePage,
  getMovieVideo,
} from "../../actions/movie";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchPage from "../Search/Search";
import { MDBContainer, MDBRow, MDBCol, MDBView } from "mdbreact";
import "../../App.css";
import { SET_MOVIES } from "../../actions/types";
import RelatedMovies from "./RelatedMovies";

const MovieList = ({
  addToCart,
  loadCart,
  getCart,
  userId,
  setMovies,
  isLoading,
  movies,
  relatedMovies,
  getRelatedId,
  getMovieVideo,
}) => {
  const [vids, setVids] = useState(null);
  let [page, changePage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${config.API_KEY}&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        loadCart();
        // getRelatedId();
        // getVid()
      });
  }, [page]);

  const getVid = async () => {
    await fetch(
      "https://api.themoviedb.org/3/movie/38/videos?api_key=8fb61d9f021e57975ac7a2ef25b640a7&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setVids(data.results));
  };

  const nextPage = (e) => {

    if (page === 7) {
      page = 9
    }
    else {
      changePage(page + 1)
    }

    
  };

  if (isLoading) {
    return <SpinnerPage />;
  }

  const movieList = (
    <MDBContainer>
      <MDBRow>
        {movies.map((movie, key) => {
          return (
            <MDBCol key={key} size="3">
              <div className="hover-movie">
                <Movie
                  id={movie.id}
                  addToCart={addToCart}
                  title={movie.title}
                  image={movie.poster_path}
                  overview={movie.overview}
                  movieObj={movie}
                  price={2.99}
                />
              </div>
            </MDBCol>
          );
        })}
      </MDBRow>
      <button onClick={(e) => nextPage(e)}>Next Page</button>
    </MDBContainer>
  );

  return (
    <div>
      <SearchPage />
      {movieList}
      <RelatedMovies />
    </div>
  );
};

MovieList.propTypes = {
  addToCart: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.movies,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  getCart,
  setMovies,
  getRelatedId,
  getMovieVideo,
})(MovieList);
