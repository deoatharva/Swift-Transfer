import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Safe check
      const user = data?.user;

      if (!user) {
        setError('Login failed. User not found.');
        return;
      }

      // Check email verification
      if (!user.email_confirmed_at) {
        setError('Please verify your email address before logging in.');
        return;
      }

      console.log('User logged in:', user);
      navigate('/dashboard');

    } catch (err) {
      console.error('Error logging in:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">

      <h2>🔐 Login</h2>

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
        onClick={handleLogin}
        className="btn auth-btn w-100"
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>

      <div className="auth-switch">
        Don’t have account? <Link to="/signup">Sign up</Link>
      </div>

    </div>
  </div>
);

};

export default Login;
