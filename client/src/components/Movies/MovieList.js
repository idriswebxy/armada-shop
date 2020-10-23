import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { addToCart, loadCart } from "../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  loadMovies,
  loadChange,
  loadMoreItems,
} from "../../actions/movie";
import {
  API_URL,
  API_KEY,
} from "../../config";
import "./MovieList.css";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchBar from "../Search/Search";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "../../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const MovieList = ({
  addToCart,
  loadCart,
  isLoading,
  movies,
  loadMore,
  fetchItems,
  page,
  totalPages,
  loadChange,
  nextPage,
  loadMovies,
  loadMoreItems,
}) => {

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();


  let endpoint = "";

  useEffect(() => {
    if (movies.length <= 20) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchItems(endpoint);
      loadCart();
    } else {
      loadCart();
    }
  }, []);

  const movieList = (
    <MDBContainer>
      <div className="rmdb-home">
        <div className="rmdb-home-grid">
          <MDBRow>
            {movies.map((movie, index) => {
              return (
                <MDBCol md='3'>
                  <Movie
                    index={index}
                    id={movie.id}
                    addToCart={addToCart}
                    title={movie.title}
                    image={movie.poster_path}
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                    price={2.99}
                    movieObj={movie}
                  />
                </MDBCol>
              );
            })}
          {isLoading ? <Spinner /> : null}
          {page <= totalPages && !isLoading ? (
            <LoadMoreBtn
              text="Load More"
              onClick={() => loadMoreItems(endpoint, page)}
            />
          ) : null}
          </MDBRow>
        </div>
      </div>
    </MDBContainer>
  );


  return (
    <div>
      <SearchBar />
      {movieList}
    </div>
  )

};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.movies,
  page: state.movie.moviePage,
  searchedMovie: state.movie.searchedMovie,
  totalPages: state.movie.totalPages,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  nextPage,
  prevPage,
  // loadMore,
  loadMovies,
  fetchItems,
  loadChange,
  loadMoreItems,
})(MovieList);
