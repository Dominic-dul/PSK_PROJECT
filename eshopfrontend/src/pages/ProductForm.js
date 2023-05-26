import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const ProductForm = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [discountId, setDiscountId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);

    if(!discountId || !price || !name || !description || !file) {
      setShowError(true);
      setErrorMessage("All fields are required");
      return;
    }

    let formData = new FormData();
    formData.append('productRequest', JSON.stringify({
      userEmail: String(user.email),
      discountId: Number(discountId),
      price: Number(price),
      name,
      description,
      quantity,
    }));
    formData.append('file', file);

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post('http://localhost:9999/e-shop/product', formData, {
        headers: {
           Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setErrorMessage("Error: " + error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        setErrorMessage("Error: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setErrorMessage("Error: " + error.message);
      }
    }
  };

  return (

    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>Discount ID</Form.Label>
        <Form.Control type="number" placeholder="Discount ID" value={discountId} onChange={e => setDiscountId(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" onChange={e => setFile(e.target.files[0])} />
      </Form.Group>
      {showSuccess && <Alert variant="success">Product uploaded successfully!</Alert>}
      {showError && <Alert variant="danger">{errorMessage}</Alert>}
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};

export default ProductForm;
