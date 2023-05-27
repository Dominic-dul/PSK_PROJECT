import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const fetchOrders = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:9999/e-shop/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders by status "IN_PROGRESS"
  const filteredOrders = orders.filter((order) => order.orderStatus === 'IN_PROGRESS');


  const handleAcceptOrder = async (orderId, userEmail, shippingAddress, productIds) => {
    try {
      const token = await getAccessTokenSilently(); // Retrieve the token inside the function

      const orderData = {
        productIds: productIds,
        userEmail: userEmail,
        orderStatus: 'ACCEPTED',
        shippingAddress: shippingAddress,
      };

      // Make the PUT request to update the order
      const response = await fetch(`http://localhost:9999/e-shop/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Refresh orders after successful update
        fetchOrders();
      } else {
        console.error('Error accepting order:', response.status);
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleRejectOrder = async (orderId, userEmail, shippingAddress, productIds) => {
    try {
      const token = await getAccessTokenSilently(); // Retrieve the token inside the function

      const orderData = {
        productIds: productIds,
        userEmail: userEmail,
        orderStatus: 'REJECTED',
        shippingAddress: shippingAddress,
      };

      // Make the PUT request to update the order
      const response = await fetch(`http://localhost:9999/e-shop/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Refresh orders after successful update
        fetchOrders();
      } else {
        console.error('Error accepting order:', response.status);
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Order Status</th>
            <th>Price</th>
            <th>Shipping Address</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
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
                    <br />
                    <b>Quantity:</b> {product.quantity}
                    <hr />
                  </div>
                ))}
              </td>
              <td>
                <Button
                  variant="success"
                  onClick={() =>
                    handleAcceptOrder(
                      order.id,
                      order.userEmail,
                      order.shippingAddress,
                      order.products.map((product) => product.id)
                    )
                  }
                >
                  Accept
                </Button>{' '}
                <Button variant="danger" onClick={() =>
                  handleRejectOrder(
                    order.id,
                    order.userEmail,
                    order.shippingAdress,
                    order.products.map((product) => product.id)
                  )
                }>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersPage;
