import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../app/productsSlice";

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
      const res = await fetch(`http://localhost:3000/api/products?page=${6}`, {
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
  //   useEffect(() => {
  //     if (submittedSearch.length > 0) {
  //       let filteredRecipes = recipes.filter(
  //         (recipe) =>
  //           recipe.name.toLowerCase().match(submittedSearch.toLowerCase()) ||
  //           recipe.category.toLowerCase().match(submittedSearch.toLowerCase())
  //       );
  //       setSearchResults(filteredRecipes);
  //     }
  //     return () => {
  //       setSearchResults([]);
  //     };
  //   }, [submittedSearch]);
  function handleNavigateProduct(id) {
    navigation(`/home/products/${id}`);
  }
  return (
    <div className="Products">
      {product_id !== "" && typeof product_id !== "undefined" ? (
        <Outlet />
      ) : (
        <div className="products-div">
          {searchResults && searchResults.length !== 0 ? (
            searchResults.map((product, i) => (
              <div className="item" key={i}>
                <ProductCard
                  handleNavigate={handleNavigateProduct}
                  product={product}
                  index={i}
                />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product, i) => (
              <div className="item" key={i}>
                <ProductCard
                  handleNavigate={handleNavigateProduct}
                  product={product}
                />
              </div>
            ))
          ) : (
            <div>No products added</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
