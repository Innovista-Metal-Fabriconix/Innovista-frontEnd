import React from "react";
import { Link } from "react-router-dom";

function Products() {
  return (
    <>
      <div>Products</div>
      <Link to="/product-details">Go to Product Details</Link>
    </>
  );
}

export default Products;
