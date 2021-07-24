import axios from 'axios';
import { productActions } from '../slices/products-slice';
import { reviewActions } from '../slices/review-slice';

export const getProducts = (keyword = '', currentPage = 1, price, category, rating) => {
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
export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch(productActions.newProductRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);

    dispatch(productActions.newProductSuccess(data));
  } catch (error) {
    dispatch(productActions.newProductFail(error.response.data.message));
  }
};

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(productActions.updateDeleteProductRequest());

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch(productActions.deleteProductSuccess(data.success));
  } catch (error) {
    dispatch(productActions.updateDeleteProductFail(error.response.data.message));
  }
};

// Update Product (ADMIN)
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(productActions.updateDeleteProductRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

    dispatch(productActions.updateProductSuccess(data.success));
  } catch (error) {
    dispatch(productActions.updateDeleteProductFail(error.response.data.message));
  }
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

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch(productActions.allProductsRequest());

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch(productActions.adminProductsSuccess(data.products));
  } catch (error) {
    dispatch(productActions.allProductsFail(error.response.data.message));
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(reviewActions.reviewRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch(reviewActions.newReviewSuccess(data.success));
  } catch (error) {
    dispatch(reviewActions.reviewFail(error.response.data.message));
  }
};

// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch(reviewActions.reviewRequest());

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch(reviewActions.getReviewsSuccess(data.reviews));
  } catch (error) {
    dispatch(reviewActions.reviewFail(error.response.data.message));
  }
};

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch(reviewActions.deleteReviewRequest());

    const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`);

    dispatch(reviewActions.deleteReviewSuccess(data.success));
  } catch (error) {
    dispatch(reviewActions.deleteReviewFail(error.response.data.message));
  }
};

// Clear Errors
export const clearErrors = () => {
  return async (dispatch) => {
    dispatch(productActions.clearErrors());
  };
};
