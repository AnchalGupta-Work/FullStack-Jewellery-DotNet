import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import ErrorMessage from '../common/ErrorMessage';
import PasswordInput from '../common/PasswordInput';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate token
    if (!token) {
      setError('Invalid reset token');
      return;
    }

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword(token, formData.password);
      
      if (response.success) {
        toast.success('Password reset successful');
        navigate('/login');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  if (!token) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4 text-center">
                <i className="bi bi-exclamation-circle text-danger display-1 mb-4"></i>
                <h2 className="mb-4">Invalid Link</h2>
                <p className="text-muted mb-4">
                  This password reset link is invalid or has expired.
                  Please request a new password reset link.
                </p>
                <Link to="/forgot-password" className="btn btn-primary w-100">
                  Request New Link
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
              <h2 className="text-center mb-4">Reset Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your new password below.
              </p>

              <ErrorMessage message={error} />

              <form onSubmit={handleSubmit}>
                <PasswordInput
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  label="New Password"
                  placeholder="Enter new password"
                  error={touched.password && validatePassword(formData.password)}
                  touched={touched.password}
                />

                <PasswordInput
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  error={touched.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
                  touched={touched.confirmPassword}
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Resetting Password...
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

export default ResetPassword;