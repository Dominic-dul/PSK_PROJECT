import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import api from "./../utils/api";


const Checkout = () => {
  // const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [token, setToken] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [productIds, setProductIds] = useState([]);
  const [order, setOrder] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);
    setPaymentMethod("CASH");
    console.log("adress is: " + address);
    console.log("payment method is: " + paymentMethod);
    if(!address || !paymentMethod ) {
      setShowError(true);
      setErrorMessage("All fields are required");
      return;
    }
    const paymentDetails = {
        "orderId": orderId,
        "paymentType": paymentMethod,
        "amount": orderPrice,
        "transactionDate": new Date(),
        "transactionState": "IN_PROGRESS",
        "billingAddress": address
    };
    console.log(paymentDetails)
    api.postPayment(token,paymentDetails).then((data) => {
      console.log(data)
      //process order to in progress
      const orderData = {
          "productIds": productIds,
          "userEmail": user.email,
          "orderStatus": "IN_PROGRESS",
          "shippingAddress": address
      }
      api.putOrder(orderData, orderId, token).then((data) => {
        console.log(data)
      });
      // process product quantity
      // map through all products and update quantity
      // Filter out duplicate products based on id
      console.log("Order is:",order)
      let formData = new FormData();
      var uniqueProducts = {};
      order.products.forEach((product) => {
        if (uniqueProducts.hasOwnProperty(product.id)) {
          uniqueProducts[product.id].count++;
        } else {
          uniqueProducts[product.id] = {
            ...product,
            count: 1
          };
        }
      });
      
      const uniqueProductArray = Object.values(uniqueProducts);
      uniqueProductArray.forEach((product) => {
        formData.append('productRequest', JSON.stringify({
          userEmail: String(product.userEmail),
          discountId: Number(product.discountId),
          price: Number(orderPrice),
          name: String(product.name),
          description: String(product.description),
          quantity: Number(product.quantity - product.count),
        }));
      // formData.append('file', String(product.picturePath));
      console.log("Product in cart:",formData)
      api.putProduct(formData,product.id, token).then((data) => {
        console.log(data)
      });
      });

    });
    setShowSuccess(true);
    // Perform submission logic
    console.log("Form submitted");
  };
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
        if (data){
          setProductIds(data[0].products.map(function(product) {
            return product.id;
          }));
          setOrderPrice(data[0].price);
          setOrderId(data[0].id)
          setOrder(data[0])
        }

      });
    }
  }, [token]);

  return (
    <div className="container">
      <h2>Checkout</h2>
      <Form onSubmit={handleSubmit}>
        {showSuccess && <Alert variant="success">Order placed</Alert>}
        {showError && <Alert variant="danger">{errorMessage}</Alert>}  
        {/* <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group> */}
        <Form.Group controlId="address">
          <Form.Label>Shipping Address:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="paymentMethod">
          <Form.Label>Payment Method:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="CASH">Cash</option>
            {/* <option value="CREDIT_CARD">Credit Card</option>
            <option value="PAYPAL">PayPal</option> */}
          </Form.Control>
        </Form.Group>
        Payment Amount: {orderPrice}
  
        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    </div>
  );
};

export default Checkout;