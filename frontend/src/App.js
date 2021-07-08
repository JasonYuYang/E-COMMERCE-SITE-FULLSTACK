import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './store/actions/user-actions';

import { useSelector } from 'react-redux';
import store from './store/index';
import axios from 'axios';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());
    const getStripApiKey = async () => {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey);
    };

    getStripApiKey();
  }, []);
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={ProductDetails} exact />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/password/forgot' component={ForgotPassword} exact />
          <ProtectedRoute path='/me' component={Profile} exact />
          <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
          <ProtectedRoute
            path='/password/update'
            component={UpdatePassword}
            exact
          />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
