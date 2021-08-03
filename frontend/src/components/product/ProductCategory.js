import React, { Fragment, useEffect, useState, useRef } from 'react';
import Pagination from 'react-js-pagination';

import MetaData from '../layout/MetaData';
import Product from './Product';
import Loader from '../layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../../store/actions/product-actions';

const Category = ({ match, history }) => {
  const categoryHeader = match.params.category.replace(/%2F/g, '/');
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(match.params.category);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const maxPriceInputRef = useRef();
  const minPriceInputRef = useRef();

  const keyword = '';

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home',
  ];

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(
    (state) => state.product
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const clickCategoryHandler = (category) => {
    const categoryURLencoded = category.replace(/\//g, '%2F');
    history.push(`/category/${categoryURLencoded}`);
    setCategory(category);
  };

  const priceSubmit = (e) => {
    e.preventDefault();
    setPrice([minPrice, maxPrice]);
  };

  const minPriceOnChange = (e) => {
    setMinPrice(e.target.value);
    minPriceInputRef.current.value = minPrice;
  };
  const maxPriceOnChange = (e) => {
    setMaxPrice(e.target.value);
    maxPriceInputRef.current.value = maxPrice;
  };

  let count = productsCount;
  if (category) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />

          <h1 id="products_heading">{`${categoryHeader}`}</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mt-4 mb-5">
                <div className="px-5">
                  <h4 className="mb-4">Price</h4>

                  <div className="d-flex justify-content-center my-0 mt-1 position-relative">
                    <div className="input-group col-6 mx-0  p-0 mr-1 ">
                      <span className="price-tag">$</span>
                      <input
                        className="price col-12"
                        type="text"
                        placeholder="Min"
                        value={minPrice}
                        onChange={minPriceOnChange}
                        ref={minPriceInputRef}
                      />
                      <label className="price-label my-0">Min</label>
                    </div>
                    <div className="input-group col-6 mx-0 px-0">
                      <span className="price-tag">$</span>
                      <input
                        className="price col-12"
                        type="text"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={maxPriceOnChange}
                        ref={maxPriceInputRef}
                      />
                      <label className="price-label my-0">Max</label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="price-submit btn  btn-sm my-0 px-3 ml-4 center-block"
                    onClick={priceSubmit}
                  >
                    SUBMIT
                  </button>
                  <hr className="my-0" />
                  <div className="mt-5">
                    <h4 className="mb-3">Categories</h4>

                    <ul className="pl-0 card-title">
                      {categories.map((category) => (
                        <li
                          style={{
                            cursor: 'pointer',
                            listStyleType: 'none',
                          }}
                          key={category}
                          onClick={() => {
                            clickCategoryHandler(category);
                          }}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr className="my-3" />
                  <div className="mt-5">
                    <h4 className="mb-3">Ratings</h4>

                    <ul className="pl-0">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          style={{
                            cursor: 'pointer',
                            listStyleType: 'none',
                          }}
                          key={star}
                          onClick={() => setRating(star)}
                        >
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${star * 20}%`,
                              }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products.map((product) => (
                    <Product key={product._id} product={product} col={4} />
                  ))}
                </div>
              </div>
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Category;
