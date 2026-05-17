import { useState } from "react";
import { Container,Row,Col } from "reactstrap";

export default function ProductRegister() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  return (
    <div className="d-flex justify-content-center mt-5">
            <div className="card shadow p-4" style={{ width: "400px" }}>
              <form >
                <h4 className="text-center mb-4">Register Product</h4>
                   <div className="mb-3">
                    <label className="form-label">Product Id</label>
                          <input
                            className="form-control mb-2"
                            onChange={(e) =>setId(e.target.value)}
                          />
                   </div>
                   <div className="mb-3">
                      <label className="form-label">Product Name</label>
                      <input
                        className="form-control mb-2"
                        onChange={(e) =>setName(e.target.value)}
                      />
                   </div>
                   <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type='number'
                        className="form-control mb-2"
                        onChange={(e) =>setPrice(e.target.value)}
                      />
                   </div>
                   <div className="mb-3">
                      <label className="form-label">Stock </label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        onChange={(e) =>setStock(e.target.value)}
                      />
                   </div>
                   <div className="mb-3">
                      <label className="form-label">Picture Link </label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        onChange={(e) =>setLink(e.target.value)}
                      />
                   </div>
                   <div>
                       <button type='button' className="btn btn-primary">Register</button>
                   </div>
              
                </form>
            </div>
    </div>
   

  );
}