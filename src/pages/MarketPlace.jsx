import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setPublicProducts } from "../app/publicSlice";
import { FaArrowLeft } from "react-icons/fa6";

function MarketPlace() {
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState([]);

  const { item_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const searchT = useSelector((state) => state.public.searchTerm?.title) || "";
  const submittedSearch =
    useSelector((state) => state.public.submittedSearch?.title) || "";
  const publicProducts = useSelector((state) => state.public.publicProducts);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchPublicProducts();
  }, []);
  async function fetchPublicProducts() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/public/products?page=${1}`,
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
    if (searchTerm.length > 0) {
      if (item_id !== "" && typeof item_id !== "undefined") {
        let filteredProducts = publicProducts.filter(
          (product) =>
            product.name.toLowerCase().match(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().match(searchTerm.toLowerCase())
        );

        setSearchResults(filteredProducts);
        navigation(`/?search=${searchTerm}`);
      }
      let filteredProducts = publicProducts.filter(
        (product) =>
          product.name.toLowerCase().match(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().match(searchTerm.toLowerCase())
      );
      if (filteredProducts.length === 0) {
        setNotFound(true);
      }
      setSearchResults(filteredProducts);
    }
    return () => {
      setSearchResults([]);
    };
  }, [searchTerm, item_id]);
  async function addToCart(id, sellerId) {
    if (token === null) {
      alert("Please login to add to cart");
      return;
    }
    if (user._id === sellerId) {
      alert("Cannot add own product to cart");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      });
      console.log(res);
      if (res.ok === true) {
        navigation(0);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFromCart(id) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/cart/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: id }),
        }
      );
      if (res.ok === true) {
        console.log(res);
        navigation(0);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="MarketPlace">
      {searchResults && searchResults.length > 0 && (
        <div className="none">
          <p
            onClick={() => {
              navigation("/");
              navigation(0);
            }}
          >
            <FaArrowLeft className="icon" />
          </p>
        </div>
      )}
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
          ) : searchResults.length === 0 && notFound === true ? (
            <div className="none" style={{ margin: "20px auto" }}>
              <div>No products available</div>
              <p
                onClick={() => {
                  navigation("/");
                  navigation(0);
                }}
              >
                Back to marketplace
              </p>
            </div>
          ) : publicProducts.length > 0 ? (
            publicProducts.map((product, i) => (
              <ProductCard
                className="item"
                key={i}
                handleNavigate={handleNavigatePublicProduct}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                product={product}
                cart={user && user.cart}
              />
            ))
          ) : (
            <div style={{ margin: "20px auto" }}>No products available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
