import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../store/actions/user-actions';

const Login = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const passwordInputRef = useRef();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const showPassword = () => {
    setShow(!show);
    passwordInputRef.current.type = show ? 'password' : 'text';
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Login'} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <div className="eye">
                    <input
                      type="password"
                      id="password_field"
                      className="form-control"
                      value={password}
                      ref={passwordInputRef}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {show ? (
                      <i className="icon" onClick={showPassword}>
                        <Eye />
                      </i>
                    ) : (
                      <i className="icon" onClick={showPassword}>
                        <EyeSlash />
                      </i>
                    )}
                  </div>
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button id="login_button" type="submit" className="btn btn-block py-3">
                  LOGIN
                </button>

                <Link to="/signup" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
