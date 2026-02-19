import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create a new user with email and password
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      console.log('User signed up:', user);

      // Show a message to inform the user to check their inbox
      alert('A verification email has been sent. Please check your inbox.');

      // Redirect to the login page
      navigate('/login');
    } catch (err) {
      console.error('Error signing up:', err.message);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">

      <h2>✨ Create Account</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email"
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button
        onClick={handleSignup}
        className="btn auth-btn w-100"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <div className="auth-switch">
        Already have account? <Link to="/login">Login</Link>
      </div>

    </div>
  </div>
);

};

export default Signup;
