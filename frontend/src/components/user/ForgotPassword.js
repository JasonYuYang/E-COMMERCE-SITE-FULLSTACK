import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../store/actions/user-actions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      setShowSpinner(false);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      setShowSpinner(false);
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const formData = new FormData();
    formData.set('email', email);

    dispatch(forgotPassword(formData));
  };
  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="d-flex justify-content-center btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {showSpinner ? <div className="mr-3" id="spinner"></div> : ''}
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
