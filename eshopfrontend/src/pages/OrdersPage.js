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
        orderStatus: 'ACCEPTED',
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

  const handleRejectOrder = async (orderId, userEmail, order, productIds) => {
    try {
      const token = await getAccessTokenSilently(); // Retrieve the token inside the function
  
      const orderData = {
        orderStatus: 'REJECTED',
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
        // Update the quantities of the rejected products
        const uniqueProducts = {};
        order.products.forEach((product) => {
          if (uniqueProducts.hasOwnProperty(product.id)) {
            uniqueProducts[product.id].count++;
          } else {
            uniqueProducts[product.id] = {
              ...product,
              count: 1,
            };
          }
        });
  
        const uniqueProductArray = Object.values(uniqueProducts);
        const updateQuantities = uniqueProductArray.map(async (product) => {
          const formData = new FormData();
          formData.append('productRequest', JSON.stringify({
            userEmail: String(product.userEmail),
            discountId: Number(product.discountId),
            price: Number(order.price),
            name: String(product.name),
            description: String(product.description),
            quantity: Number(product.quantity + product.count),
          }));
          
          const updateResponse = await fetch(`http://localhost:9999/e-shop/product/${product.id}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
  
          if (!updateResponse.ok) {
            console.error('Error updating product quantity:', updateResponse.status);
          }
        });
  
        // Wait for all product quantity updates to complete
        await Promise.all(updateQuantities);
  
        // Refresh orders after successful update
        fetchOrders();
      } else {
        console.error('Error rejecting order:', response.status);
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
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
                    order,
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
