import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../components/BackArrow";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setPublicProduct } from "../app/publicSlice";
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
  function handleNavigateBack() {
    navigation(`/`);
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
