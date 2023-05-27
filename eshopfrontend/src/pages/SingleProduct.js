// import React, { useEffect } from 'react';
// import { useLocation,useParams } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

// const SingleProduct = () => {
//     const {productId} = useParams()
//     const { getAccessTokenSilently } = useAuth0();
    
//     useEffect(() => {
//         getAccessTokenSilently().then((token) => {

    
//     console.log(productId);
//     const prop={}
//   return (
//     <div>
//       <h1>{prop.name}</h1>
//       <p>{prop.description}</p>
//       <p>Price: {prop.price}</p>
//       <p>Quantity: {prop.quantity}</p>
//       <img src={prop.picturePath} alt="flower" />
//       <button onClick={prop.addToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default SingleProduct;