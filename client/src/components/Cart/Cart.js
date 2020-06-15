import React, { useEffect } from "react";
import { connect } from "react-redux";
import Img from "react-image";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBNavLink,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import { deleteItem, loadCart, getPriceTotal } from "../../actions/cart";
import CartItem from "./CartItem";
import SpinnerPage from "../Layout/SpinnerPage";

const Cart = ({ cart, loadCart, getPriceTotal, total, loading, deleteItem }) => {
  useEffect(() => {
    loadCart();
    getPriceTotal(cart);
  }, [loading]);

  if (loading) {
    return <SpinnerPage />;
  }

  let cartItems = (
    <div>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Movie</th>
            <th>Price</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {cart.map((movie) => (
            <tr>
              <td>
                <img src={`https://image.tmdb.org/t/p/w92${movie.image}`} />
                <h5>{movie.name}</h5>
              </td>
              <td>
                <div>{movie.price}</div>
              </td>
              <td><MDBBtn onClick={() => deleteItem(movie.id)}>Remove</MDBBtn></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );

  let checkOut = (
    <div style={{ marginLeft: "10px", color: "white" }}>
      <h2>Total: ${total}</h2>
      <MDBNavLink to="/checkout">
        <MDBBtn>Check Out</MDBBtn>
      </MDBNavLink>
    </div>
  );

  return (
    <MDBContainer>
      <div style={{ marginTop: "100px" }}>
        <h3>Cart: {cart.length} item(s)</h3>
        <div>{cartItems}</div>
        <div>{checkOut}</div>
      </div>
    </MDBContainer>
  );
};

Cart.propTypes = {
  loadCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  total: state.cart.totalPrice,
  loading: state.cart.loading,
});

export default connect(mapStateToProps, {
  deleteItem,
  loadCart,
  getPriceTotal,
})(Cart);
