import React, { useEffect, useState } from "react";
import api from "./../utils/api";
import "./../styles/Cart.css";
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const Cart = (orderId) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [orderPrice, setOrderPrice] = useState(null);

  useEffect(() => {
    if (token == null) {
      getAccessTokenSilently().then((token) => {
        setToken(token);
      });
    }
  }, []);
  useEffect(() => {
    if(token){
      const orderDetails = {
        userEmail: user.email,
        orderStatus: "PLACED",
      };
      api.getOrdersFilter(token, orderDetails).then((data) => {
        console.log(data[0].products)
        setCartItems(data[0].products);
        setOrderPrice(data[0].price);
      });
    }
  }, [token]);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.reduce((acc, curr) => {
              const index = acc.findIndex((item) => item.name === curr.name);
              if (index === -1) {
                acc.push({ name: curr.name, price: curr.price, quantity: 1 });
              } else {
                acc[index].quantity++;
              }
              return acc;
            }, []).map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="2">Total Price:</td>
              <td>{orderPrice}</td>
            </tr>
          </tbody>
        </Table>
      )}
        {cartItems.length === 0 ? (
          <p></p>
        ) : (
          <Link to="/checkout" >
            <Button variant="primary">Proceed to Checkout</Button>
          </Link>
        )}
    </div>
  );
}
export default Cart;