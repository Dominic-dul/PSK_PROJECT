import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import api from "./../utils/api";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const fetchOrders = async () => {
    try {
      const token = await getAccessTokenSilently();
      const orderDetails = {
        userEmail: user.email,
        orderStatus: null
      };
        api.getOrdersFilter(token, orderDetails).then((response) => {
            console.log(response[0])
            setOrders(response);
        });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div>
      <h2>Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Order Status</th>
            <th>Price</th>
            <th>Shipping Address</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
            {console.log(orders)}
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userEmail}</td>
              <td>{order.orderStatus}</td>
              <td>{order.price}</td>
              <td>{order.shippingAddress}</td>
              <td>
                {order.products.map((product) => (
                  <div key={product.id}>
                    <b>Name:</b> {product.name}
                    <br />
                    <b>Description:</b> {product.description}
                    <br />
                    <b>Price:</b> {product.price}
                    <hr />
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentOrders;
