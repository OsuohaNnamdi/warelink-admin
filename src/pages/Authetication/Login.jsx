import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { login } from '../../Redux/Action/clientActions';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter both email and password.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      return;
    }

    // Dispatch the login action
    dispatch(login(email, password))
      .then((response) => {
        // Check if the response is valid (login was successful)
        if (response) {
          Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully.',
            icon: 'success',
          });
          navigate('/admin');
        }
      })
      .catch((error) => {
        // Handle login failure
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while logging in.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main>
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
              <img src="../assets/images/svg-graphics/signin-g.svg" alt className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Sign in to WareLink</h1>
                <p>Welcome back to WareLink! Enter your email to get started.</p>
              </div>
              <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="formSigninEmail" className="form-label visually-hidden">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="formSigninEmail"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">Please enter email.</div>
                  </div>
                  <div className="col-12">
                    <div className="password-field position-relative">
                      <label htmlFor="formSigninPassword" className="form-label visually-hidden">
                        Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'} // Toggle input type
                        className="form-control fakePassword"
                        id="formSigninPassword"
                        placeholder="*****"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                        onClick={togglePasswordVisibility}
                        style={{ border: 'none', background: 'none' }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                      </button>
                      <div className="invalid-feedback">Please enter password.</div>
                    </div>
                  </div>
                  <div className="col-12 d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </div>
                  <div>
                    Don’t have an account? <a href="/register">Sign Up</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      )}
    </main>
  );
};