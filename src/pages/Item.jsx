import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../components/BackArrow";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setPublicProduct } from "../app/publicSlice";
import getStripe from "../../lib/getStripe";

function Item() {
  useEffect(() => {
    fetchProduct();
  }, []);

  const product = useSelector((state) => state.public?.publicProduct);
  const slidesRef = useRef(null);
  const [activeImageNum, setCurrent] = useState(0);
  const length = product?.images?.length;
  const nextSlide = () => {
    setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
  };
  const prevSlide = () => {
    setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
  };

  const dispatch = useDispatch();
  const { item_id } = useParams();
  const navigation = useNavigate();

  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.user);

  async function fetchProduct() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/public/products/${item_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok === true) {
        dispatch(setPublicProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function buyProduct() {
    try {
      //remove item from cart
      removeFromCart(item_id);
      const response = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/public/products/${item_id}/buy`,
        {
          method: "PUT",
          headers: {
            "Content-Length": 0,
            Authorization: `Bearer ${token}`,
          },
          body: {},
        }
      );
      const data = await response.json();

      if (response.ok === true) {
        let quantity = Number(product.price);
        handleCheckout(quantity);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  function handleNavigateBack() {
    navigation(`/`);
  }
  async function handleCheckout(qty) {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: qty,
        },
      ],
      mode: "payment",
      successUrl: `${import.meta.env.VITE_CLIENT_URL}/success`,
      cancelUrl: `${import.meta.env.VITE_CLIENT_URL}/cancel`,
      customerEmail: "customer@email.com",
    });
    console.warn(error.message);
  }
  async function buy(sellerId) {
    if (token === null) {
      alert("Please login to buy product");
      return;
    }
    if (user._id === sellerId) {
      alert("Cannot buy own product");
      return;
    }
    let buyConfirmation = window.confirm(
      "You are about to buy this item. You'll be taken to a payment gateway. Continue?"
    );
    if (buyConfirmation) {
      try {
        buyProduct();
      } catch (err) {
        console.log(err);
      }
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
        //navigation(0);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Item">
      <BackArrow className="back" handleNavigate={handleNavigateBack} />
      <div className="product-content">
        <div className="product-gallery">
          <div className="slides" ref={slidesRef}>
            {JSON.stringify(product) !== "{}" &&
              product?.images.map((image, i) => {
                return (
                  <div
                    className={
                      i === activeImageNum
                        ? "currentSlide active"
                        : "currentSlide"
                    }
                    key={i}
                  >
                    {i === activeImageNum && <img src={image} />}
                  </div>
                );
              })}
            <button className="prev" onClick={prevSlide}>
              <IoIosArrowBack />
            </button>
            <button className="next" onClick={nextSlide}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div className="product-info">
          <div className="name">{product && product.name}</div>

          <div className="price">R{product && product.price}</div>
          <div className="category">{product && product.category}</div>

          <div className="description">{product && product.description}</div>
          <button
            onClick={() =>
              product && product.status === "SOLD"
                ? alert("Product sold")
                : buy(product.sellerId)
            }
          >
            {product && product.status === "SOLD" ? "Sold" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Item;
