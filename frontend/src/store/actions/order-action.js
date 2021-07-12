import axios from 'axios';
import { orderActions } from '../order-slice';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.ordersRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/order/new', order, config);

    dispatch(orderActions.createOrderSuccess(data));
  } catch (error) {
    dispatch(orderActions.ordersFail(error.response.data.message));
  }
};

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch(orderActions.ordersRequest());

    const { data } = await axios.get('/api/v1/orders/me');

    dispatch(orderActions.myOrderSuccess(data.orders));
  } catch (error) {
    dispatch(orderActions.ordersFail(error.response.data.message));
  }
};

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderActions.ordersRequest());

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch(orderActions.orderDetailsSuccess(data.order));
  } catch (error) {
    dispatch(orderActions.ordersFail(error.response.data.message));
  }
};

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
  try {
    dispatch(orderActions.ordersRequest());

    const { data } = await axios.get(`/api/v1/admin/orders`);

    dispatch(orderActions.allOrdersSuccess(data));
  } catch (error) {
    dispatch(orderActions.ordersFail(error.response.data.message));
  }
};

// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(orderActions.updateOrderRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      orderData,
      config
    );

    dispatch(orderActions.updateOrderSuccess(data.success));
  } catch (error) {
    dispatch(orderActions.updateDeleteOrderFail(error.response.data.message));
  }
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(orderActions.deleteOrderRequest());

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch(orderActions.deleteOrderSuccess(data.success));
  } catch (error) {
    dispatch(orderActions.updateDeleteOrderFail(error.response.data.message));
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(orderActions.clearErrors());
};
