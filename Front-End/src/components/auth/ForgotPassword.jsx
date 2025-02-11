import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import ErrorMessage from '../common/ErrorMessage';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        setSuccess(true);
        toast.success('Password reset instructions sent to your email');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4 text-center">
                <i className="bi bi-envelope-check text-success display-1 mb-4"></i>
                <h2 className="mb-4">Check Your Email</h2>
                <p className="text-muted mb-4">
                  We've sent password reset instructions to your email address.
                  Please check your inbox and follow the instructions.
                </p>
                <Link to="/login" className="btn btn-primary w-100">
                  Return to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Forgot Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your email address and we'll send you instructions to reset your password.
              </p>

              <ErrorMessage message={error} />

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>

                <div className="text-center mt-4">
                  <Link to="/login" className="text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;