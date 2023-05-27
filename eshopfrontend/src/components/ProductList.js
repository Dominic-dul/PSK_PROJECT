import React from "react";
import '../styles/Product.css';
import { Card, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';



const ProductList = (props) => {
  const { isAuthenticated } = useAuth0();
  const handleAddToCart = () => {
    // Logic to add the product to the cart
    // You can implement this based on your application's requirements
    props.addToCart(props);
  };
  return (
    <Card className="my-4">
      <div className="d-flex align-items-center card-container">
        <Card.Img className="product-image" variant="left" src={props.picturePath} alt="flowers"/>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text>{props.price} €</Card.Text>
          <Card.Text>Quantity: {props.quantity}</Card.Text>
          {isAuthenticated && (
            <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          )}
        </Card.Body>
      </div>
    </Card>
  );
};

export default ProductList;