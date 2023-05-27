import React from 'react';
import flowerImg from '../images_for_pages/flower-shop.jpg'
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';

export default function Hero() {
  const {user, isAuthenticated} = useAuth0();
  return (
  <div>
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1">
          {isAuthenticated && `Hello, ${user.nickname}, welcome to your Floral Paradise`}
          {!isAuthenticated && 'Your Floral Paradise'}
        </h1>
        <p class="lead">Passatshop - best flower e-shop in town with <b>same day</b> delivery. Express Your Emotions with Exquisite Blooms 🌸</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          {!isAuthenticated && <LoginButton></LoginButton>}
          {/* <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button> */}
        </div>
      </div>
      <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img class="rounded-lg-3" src={flowerImg} alt="" width="720" />
      </div>
    </div>
  </div>
  );
}