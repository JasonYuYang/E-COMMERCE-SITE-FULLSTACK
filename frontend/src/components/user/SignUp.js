import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../store/actions/user-actions';

const SignUp = ({ history }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const [show, setShow] = useState(false);
  const passwordInputRef = useRef();

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      setShowSpinner(false);
      history.push('/');
    }

    if (error) {
      setShowSpinner(false);
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);
    setShowSpinner(true);
    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const showPassword = () => {
    setShow(!show);
    passwordInputRef.current.type = show ? 'password' : 'text';
  };
  return (
    <Fragment>
      <MetaData title={'Register User'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <div className="eye">
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  ref={passwordInputRef}
                  onChange={onChange}
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
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="d-flex justify-content-center btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {showSpinner ? <div className="mr-3" id="spinner"></div> : ''}
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
