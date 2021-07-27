import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../store/actions/user-actions';
const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newShow, setNewShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const passwordInputRef = useRef();
  const newPasswordInputRef = useRef();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      setShowSpinner(false);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      setShowSpinner(false);
      alert.success('Password updated successfully');
      history.push('/login');
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };

  const showPassword = () => {
    setShow(!show);
    passwordInputRef.current.type = show ? 'password' : 'text';
  };
  const showNewPassword = () => {
    setNewShow(!newShow);
    newPasswordInputRef.current.type = newShow ? 'password' : 'text';
  };

  return (
    <Fragment>
      <MetaData title={'New Password Reset'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

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

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <div className="eye">
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  ref={newPasswordInputRef}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {newShow ? (
                  <i className="icon" onClick={showNewPassword}>
                    <Eye />
                  </i>
                ) : (
                  <i className="icon" onClick={showNewPassword}>
                    <EyeSlash />
                  </i>
                )}
              </div>
            </div>
            <button
              id="new_password_button"
              type="submit"
              className="d-flex justify-content-center btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {showSpinner ? <div className="mr-3" id="spinner"></div> : ''}
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
