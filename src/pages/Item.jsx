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

  async function fetchProduct() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/public/products/${item_id}`,
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
      const response = await fetch(
        `http://localhost:3000/api/public/products/${item_id}/buy`,
        {
          method: "PUT",
          headers: {
            "Content-Length": 0,
            Authorization: `Bearer ${token}`,
          },
          body: {},
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);

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
          price: import.meta.env.VITE_NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: qty,
        },
      ],
      mode: "payment",
      successUrl: `http://localhost:5173/success`,
      cancelUrl: `http://localhost:5173/cancel`,
      customerEmail: "customer@email.com",
    });
    console.warn(error.message);
  }
  async function buy() {
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
  return (
    <div className="Item">
      <BackArrow handleNavigate={handleNavigateBack} />
      <div className="product-content">
        <div className="product-info">
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
            <h1>{product && product.name}</h1>
            <h1>R{product && product.price}</h1>
            <h1>{product && product.description}</h1>
            <button onClick={buy}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Item;
