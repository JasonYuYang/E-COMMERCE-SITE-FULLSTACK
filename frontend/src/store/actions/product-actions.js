import axios from 'axios';
import { productActions } from '../products-slice';

export const getProducts = (
  keyword = '',
  currentPage = 1,
  price,
  category,
  rating = 0
) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.allProductsRequest());

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch(productActions.allProductsSuccess(data));
    } catch (error) {
      dispatch(productActions.allProductsFail(error.response.data.message));
    }
  };
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productActions.productDetailsRequest());

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch(productActions.productDetailsSuccess(data.product));
  } catch (error) {
    dispatch(productActions.productDetailsFail(error.response.data.message));
  }
};

// Clear Errors
export const clearErrors = () => {
  return async (dispatch) => {
    dispatch(productActions.clearErrors());
  };
};
