import React, { Fragment, useEffect, useState, useRef } from 'react';
import Pagination from 'react-js-pagination';

import MetaData from './layout/MetaData';
import Product from './product/Product';
import Category from './layout/Category';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../store/actions/product-actions';

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const maxPriceInputRef = useRef();
  const minPriceInputRef = useRef();

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

  const { loading, products, error, resPerPage, filteredProductsCount } = useSelector((state) => state.product);

  const alert = useAlert();
  const dispatch = useDispatch();

  let keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, currentPage, keyword, price, category, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  let count = 9;
  if (keyword) {
    count = filteredProductsCount;
  }

  let categoryQuery = category ? `in ${category}` : '';
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
          {keyword ? (
            <h1 id="products_heading">{`${count} results for "${keyword}" ${categoryQuery}`}</h1>
          ) : (
            <h1 id="products_heading">Latest Products</h1>
          )}

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
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
                              onClick={() => setCategory(category)}
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
                  {resPerPage <= count && (
                    <div className="col-lg-12 d-flex justify-content-center mt-5">
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
              ) : (
                <Fragment>
                  {products.map((product) => (
                    <Product key={product._id} product={product} col={4} />
                  ))}
                  {resPerPage <= count && (
                    <div className=" col-lg-12 d-flex justify-content-center mt-5 ">
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
                  <h1 className="col-lg-12 mb-5" id="products_heading">
                    Recommend Categories
                  </h1>
                  {categories.map((category) => (
                    <Category key={category} category={category} col={3} />
                  ))}
                </Fragment>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
