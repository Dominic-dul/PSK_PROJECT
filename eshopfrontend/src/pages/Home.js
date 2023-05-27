import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import api from "./../utils/api";
import { useAuth0 } from '@auth0/auth0-react';
import Hero from '../components/Hero';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';



const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [ordreId, setOrderId] = useState(-1);
  const [order, setOrder] = useState([]); 
  const { user, isAuthenticated } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);
  const handleAddToCart = (product) => {
    if(order.length == 0){
        const orderData = {
        productIds: [product.id],
        orderStatus: 'PLACED',
        userEmail: user.email,
        shippingAddress: ''
      };
      console.log(orderData)
      api.postOrder(orderData,token).then((data) => {
        setOrder([data]);
      });
    }
    else {
      // take out quantity from order[0].products where product.id = product.id
      const currentQuantity = order[0].products.filter((item) => item.id == product.id).length
      console.log("quantities cu prod:", currentQuantity, product.quantity)
      if(product.quantity > currentQuantity ){
        var productIds = order[0].products.map(function(product) {
          return product.id;
        });
        productIds.push(product.id)
        const orderData = {
          productIds: productIds,
          orderStatus: 'PLACED',
          userEmail: user.email,
          shippingAddress: ''
        }
        console.log("what is given:",orderData)
        api.putOrder(orderData,order[0].id,token).then((data) => {
          console.log("what is outputted:",data)
          setOrder([data]);
        });
      }

    }
  };

  useEffect(() => {
    if (token == null) {
      getAccessTokenSilently().then((token) => {
        setToken(token);
        console.log(token)
      });
    }
  }, []);
  useEffect(() => {
    if (token) {
      const orderDetails = {
        userEmail:  user.email,
        orderStatus: "PLACED"
      };
      api.getOrdersFilter(token,orderDetails).then((data) => {
        console.log(data)
        setOrder(data);
        console.log(data)
      });
    }
  }, [token]);
  useEffect(() => {
    console.log("Order information:", order)
  }, [order]);
  

  useEffect(() => {
    api.getProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <div>
      <main>
        <Hero></Hero>
        <Container>
        <Row>

        {products
  .filter((product) => product.quantity !== null && product.quantity > 0)
  .map((product) => (
    <Col md={{ span: 6 }} key={product.id}>
      <ProductList
        name={product.name}
        description={product.description}
        price={product.price}
        quantity={product.quantity}
        picturePath={product.picturePath}
        addToCart={() => handleAddToCart(product)}
      />
    </Col>
  ))}

      </Row>
      </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Home;