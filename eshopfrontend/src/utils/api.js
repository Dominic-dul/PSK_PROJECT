import axios from "axios";

const API_URL = "http://localhost:9999/e-shop";

function getProducts() {
  return axios.get(`${API_URL}/products`, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

async function postOrder(orderData,token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    };

    const response = await axios.post(`${API_URL}/order`, orderData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

async function putOrder(orderData,orderId,token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    };
    const response = await axios.put(`${API_URL}/order/${orderId}`, orderData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

function getOrderById(orderId) {
  return axios.get(`${API_URL}/order/${orderId}`, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
  })
    .then((response) => response.data) 
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function getOrdersFilter(token, orderDetails) {
  return axios.get(`${API_URL}/orders/filter`, {
    params: orderDetails,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
  })
    .then((response) => response.data) 
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// post payment
function postPayment(token, paymentDetails) {
  return axios.post(`${API_URL}/payment`, paymentDetails, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
  })
    .then((response) => response.data) 
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function putProduct(formData,id,token){
  return axios.put(`${API_URL}/product/${id}`, formData, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  })
}

const api = {
    getProducts,
    postOrder,
    putOrder,
    getOrderById,
    getOrdersFilter,
    postPayment,
    putProduct,
  };
  
  export default api;
  