import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, getProductDetails, clearErrors } from '../../store/actions/product-actions';

import { productActions } from '../../store/slices/products-slice';

const UpdateProduct = ({ match, history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState('');
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, productDetails, isUpdated } = useSelector((state) => state.product);

  const productId = match.params.id;

  useEffect(() => {
    if (productDetails && productDetails._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(productDetails.name);
      setPrice(productDetails.price);
      setDescription(productDetails.description);
      setCategory(productDetails.category);
      setSeller(productDetails.seller);
      setStock(productDetails.stock);
      setOldImages(productDetails.images);
    }

    if (error) {
      setShow(false);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      setShow(false);
      history.push('/admin/products');
      alert.success('Product updated successfully');
      dispatch(productActions.updateProductReset());
    }
  }, [dispatch, alert, error, isUpdated, history, productDetails, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    setShow(true);

    const updateProductData = {
      name,
      price,
      description,
      category,
      stock,
      seller,
      images,
    };

    dispatch(updateProduct(productDetails._id, updateProductData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={'Update Product'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img, index) => (
                      <img key={index} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                    ))}

                  {imagesPreview &&
                    imagesPreview.map((img) => (
                      <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                    ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="d-flex justify-content-center btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  {show ? <div className="mr-3" id="spinner"></div> : ''}
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
