import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../store/actions/user-actions';
import { userActions } from '../../store/slices/user-slice';

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [oldShow, setOldShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const oldPasswordInputRef = useRef();
  const passwordInputRef = useRef();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      setShowSpinner(false);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      setShowSpinner(false);
      alert.success('Password updated successfully');

      history.push('/me');

      dispatch(userActions.resetUpdateUser());
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('password', password);

    dispatch(updatePassword(formData));
  };

  const showPassword = () => {
    setShow(!show);
    passwordInputRef.current.type = show ? 'password' : 'text';
  };
  const showOldPassword = () => {
    setOldShow(!oldShow);
    oldPasswordInputRef.current.type = oldShow ? 'password' : 'text';
  };
  return (
    <Fragment>
      <MetaData title={'Change Password'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label for="old_password_field">Old Password</label>
              <div className="eye">
                <input
                  type="password"
                  id="old_password_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  ref={oldPasswordInputRef}
                />
                {oldShow ? (
                  <i className="icon" onClick={showOldPassword}>
                    <Eye />
                  </i>
                ) : (
                  <i className="icon" onClick={showOldPassword}>
                    <EyeSlash />
                  </i>
                )}
              </div>
            </div>

            <div className="form-group">
              <label for="new_password_field">New Password</label>
              <div className="eye">
                <input
                  type="password"
                  id="new_password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={passwordInputRef}
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

            <button
              type="submit"
              className="d-flex justify-content-center btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              {showSpinner ? <div className="mr-3" id="spinner"></div> : ''}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
