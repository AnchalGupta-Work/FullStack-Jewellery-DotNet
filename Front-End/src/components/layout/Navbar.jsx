import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './layout.css';


const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <span className="text-sm">
                <i className="bi bi-telephone me-2"></i>
                +91 98765 43210
              </span>
              <span className="text-sm">
                <i className="bi bi-envelope me-2"></i>
                info@elegant.com
              </span>
            </div>
            <div className="d-flex gap-3">
              <a href="#" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar navbar-expand-lg bg-white ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <span className="ms-2 h4 mb-0">Elegant</span>
          </Link>

          {/* Search Bar */}
          <form className="d-none d-md-flex flex-grow-1 mx-4" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control border-end-0"
                placeholder="Search for jewellery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-secondary border-start-0">
                <i className="bi bi-search text-primary"></i>
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="text-decoration-none text-dark">
              <i className="bi bi-house"></i>
            </Link>
            
            <Link to="/products" className="text-decoration-none text-dark">
              <i className="bi bi-gem"></i>
            </Link>

            {!user?.role?.includes('Admin') && (
              <Link to="/cart" className="position-relative text-decoration-none text-dark">
                <i className="bi bi-cart3 fs-5"></i>
                {cart?.totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {cart.totalItems}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-link text-dark text-decoration-none dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <div 
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                  >
                    {user.firstName?.charAt(0)}
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  {user.role === 'Admin' ? (
                    <>
                      <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/admin/products">Products</Link></li>
                      <li><Link className="dropdown-item" to="/admin/orders">Orders</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary rounded-pill px-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Category Navigation */}
      <div className="bg-white border-top border-bottom">
        <div className="container">
          <ul className="nav justify-content-center py-2">
            <li className="nav-item">
              <Link 
                to="/products?category=1" 
                className="nav-link text-dark px-4"
              >
                Rings
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/products?category=2" 
                className="nav-link text-dark px-4"
              >
                Necklaces
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/products?category=3" 
                className="nav-link text-dark px-4"
              >
                Earrings
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/products?category=4" 
                className="nav-link text-dark px-4"
              >
                Bracelets
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;