import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);

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
                <button type='button' className="btn btn-primary m-2">Update</button>
                <button type='button' className="btn btn-primary m-2">Del</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListAdmin;