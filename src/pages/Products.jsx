import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../app/productsSlice";
import DashProductCard from "../components/DashProductCard";
function Products() {
  const [searchResults, setSearchResults] = useState([]);
  const { product_id } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    try {
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok === true) {
        const data = await res.json();

        dispatch(setProducts(data.products));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigateProduct(id) {
    navigation(`/home/products/${id}`);
  }
  return (
    <div className="Products">
      {product_id !== "" && typeof product_id !== "undefined" ? (
        <Outlet />
      ) : (
        <div className="products-div">
          {products.length > 0 ? (
            products.map((product, i) => (
              <div className="item" key={i}>
                <DashProductCard
                  handleNavigate={handleNavigateProduct}
                  product={product}
                />
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              No products added
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
