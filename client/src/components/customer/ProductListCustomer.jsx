import React, { useEffect, useState } from "react";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import { addToCart } from "../../features/cartSlice";

const ProductListCustomer = () => {
  const [products, setProducts] = useState([]);
  // Task 1: Read the logged-in user's ID from Redux auth state
  const { userId } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/product/getAllProducts`);
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container-fluid bg-white p-5">
      <h2 className="text-center mb-4">Product List......</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.product_id}>
            <div className="card shadow-sm h-100">
              
              <img
                src={product.picture_link}
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />

              <div className="card-body text-center">
                <h5>{product.name}</h5>
                <p className="text-success fw-bold">${product.price}</p>
                <p>Stock: {product.stock}</p>
                <button 
                  type='button' 
                  className="btn btn-primary" 
                  onClick={() =>  dispatch(addToCart(product))}>
                    Add to Cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListCustomer;