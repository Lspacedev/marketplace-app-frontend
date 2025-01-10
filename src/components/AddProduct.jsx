import ProductForm from "./ProductForm";
import { useState } from "react";
function AddProduct() {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    setClicked(!clicked);
  }

  return (
    <div className="AddProduct">
      <div className="Add-div">
        {clicked && <ProductForm toggleClicked={toggleClicked} />}

        <button onClick={toggleClicked}>
          <p id="add-btn-short">+</p>
          <p id="add-btn-long-text">New Product</p>
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
