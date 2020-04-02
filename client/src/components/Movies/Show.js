import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart } from "../../actions/cart";
import { MDBView, MDBContainer, MDBBtn, MDBIcon } from "mdbreact";



const TvShow = ({ id, image, getMovie, isLoading, addToCart, movie, tvShowObj, price }) => {

  // useEffect(() => {

  // }, [])

  return (
    <div style={{ textAlign: 'center'}}>
      <div>
        <Link to="/movie_details" onClick={() => getMovie(id)}>
          <img
            className="movie-container"
            src={`http://image.tmdb.org/t/p/w185${image}`}
          />
        </Link>
        <h5>{tvShowObj.original_title}</h5>
      </div>

      <div>
        <h5>${price}</h5>
        <MDBBtn onClick={() => addToCart(tvShowObj)}>
          Add To Cart <MDBIcon icon="cart-plus" />
        </MDBBtn>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, addToCart })(TvShow);
