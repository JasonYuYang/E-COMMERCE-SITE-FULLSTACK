import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategory = ({ category, col }) => {
  const categoryQuery = category.replace(/\//g, '&');

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <Link to={`category/${category}`}>
          <img className="card-img-top mx-auto" src={`/images/category/${categoryQuery}.png`} alt={categoryQuery} />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title card-text">
            <Link to={`category/${category}`}>{category}</Link>
          </h5>
          <Link to={`category/${category}`} id="view_btn" className="btn btn-block">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
