import React from 'react';
import './Subscribe.css';
import logoSubscribe from '../../assets/img/logo.png';

const SubscribePage: React.FC = () => {
  return (
    <div className="subscribe-page">
      <div className="subscribe-form">
        <h1 className="subscribe-title">Let's Read!</h1>
        <p className="subscribe-tagline">Sign up and start your streak today!</p>

        <label htmlFor="name" className="subscribe-label">Name</label>
        <input type="text" id="name" placeholder="John Doe" className="subscribe-input" />

        <label htmlFor="email" className="subscribe-label">Email Address</label>
        <input type="email" id="email" placeholder="alex@email.com" className="subscribe-input" />

        <label htmlFor="password" className="subscribe-label">Password</label>
        <input type="password" id="password" placeholder="Enter your password" className="subscribe-input" />

        <label htmlFor="repeat-password" className="subscribe-label">Repeat your password</label>
        <input type="password" id="repeat-password" placeholder="Repeat your password" className="subscribe-input" />

        <a href="/forgot-password" className="subscribe-link">Forgot Password?</a>

        <button className="subscribe-button">Sign up</button>

        {/* <div className="subscribe-divider">OR</div> */}

        {/* <button className="login-button">Login now</button> */}
      </div>
      <div className="subscribe-image">
        <img src={logoSubscribe} alt="Person skateboarding" />
        <p className="subscribe-motto">You should, Read!</p>
      </div>
    </div>
  );
}

export default SubscribePage;
