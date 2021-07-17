import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../store/actions/product-actions';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(
    (state) => state.product
  );
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Fragment>
      <MetaData title={'Buy Best Products Online'} />
      <h1 id="products_heading">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
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

export default Home;
