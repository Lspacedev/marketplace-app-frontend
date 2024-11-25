import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setPublicProducts } from "../app/publicSlice";

function MarketPlace() {
  const [searchResults, setSearchResults] = useState([]);
  const { item_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  useEffect(() => {
    fetchPublicProducts();
  }, []);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const searchT = useSelector((state) => state.public.searchTerm?.title) || "";
  const submittedSearch =
    useSelector((state) => state.public.submittedSearch?.title) || "";
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
  useEffect(() => {
    console.log(searchTerm, publicProducts);
    if (searchTerm.length > 0) {
      console.log("val");
      let filteredProducts = publicProducts.filter((product) =>
        product.name.toLowerCase().match(searchTerm.toLowerCase())
      );
      console.log({ filteredProducts });
      setSearchResults(filteredProducts);
    }
    return () => {
      setSearchResults([]);
    };
  }, [searchTerm]);
  async function addToCart(id) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({productId: id})
        }
      );
console.log(res)
      if (res.ok === true) {
       
      }
    } catch (error) {
      console.log(error);
    }
  }
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
                <button onClick={()=>addToCart(product.id)}>Add to cart</button>
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
