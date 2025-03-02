import React, { useState } from 'react';
import './Subscribe.css';
import logoSubscribe from '../../assets/img/logo.png';

const SubscribePage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        await response.json();
        setSuccess('Registration successful');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccess('');
      }
    } catch (error) {
      console.error('Error during registration:', error); // Adiciona este log
      setError('An error occurred during registration');
      setSuccess('');
    }
  };

  return (
    <div className="subscribe-page">
      <div className="subscribe-form">
        <h1 className="subscribe-title">Let's Read!</h1>
        <p className="subscribe-tagline">Sign up and start your streak today!</p>

        {error && <p className="subscribe-error">{error}</p>}
        {success && <p className="subscribe-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="subscribe-label">Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="subscribe-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email" className="subscribe-label">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="alex@email.com"
            className="subscribe-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="subscribe-label">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="subscribe-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="repeat-password" className="subscribe-label">Repeat your password</label>
          <input
            type="password"
            id="repeat-password"
            placeholder="Repeat your password"
            className="subscribe-input"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />

          <button type="submit" className="subscribe-button">Sign up</button>
        </form>

        <a href="/forgot-password" className="subscribe-link">Forgot Password?</a>
      </div>
      <div className="subscribe-image">
        <img src={logoSubscribe} alt="Person skateboarding" />
        <p className="subscribe-motto">You should, Read!</p>
      </div>
    </div>
  );
}

export default SubscribePage;
