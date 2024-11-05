import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setPublicProducts } from "../app/publicSlice";
function MarketPlace() {
  const [searchResults, setSearchResults] = useState([]);
  const { item_id } = useParams();
  useEffect(() => {
    fetchPublicProducts();
  }, []);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const publicProducts = useSelector((state) => state.public.publicProducts);
  const token = localStorage.getItem("token");

  async function fetchPublicProducts() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/public/products?page=${1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok === true) {
        const data = await res.json();

        dispatch(setPublicProducts(data.products));
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleNavigatePublicProduct(id) {
    navigation(`/marketplace/${id}`);
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
  console.log(publicProducts);
  return (
    <div className="MarketPlace">
      {item_id !== "" && typeof item_id !== "undefined" ? (
        <Outlet />
      ) : (
        <div className="items-div">
          {searchResults && searchResults.length !== 0 ? (
            searchResults.map((product, i) => (
              <div className="item" key={i}>
                <ProductCard
                  handleNavigate={handleNavigatePublicProduct}
                  product={product}
                  index={i}
                />
              </div>
            ))
          ) : publicProducts.length > 0 ? (
            publicProducts.map((product, i) => (
              <div className="item" key={i}>
                <ProductCard
                  handleNavigate={handleNavigatePublicProduct}
                  product={product}
                />
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
