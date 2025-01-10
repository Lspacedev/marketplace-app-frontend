import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../components/BackArrow";
import { CgClose } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../app/productsSlice";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
function Product() {
  const product = useSelector((state) => state.products?.product);

  const [obj, setObj] = useState({
    name: "",
    price: "",
    description: "",
    location: "",
    condition: "",
    tags: [],
    delivery: "",
  });
  useEffect(() => {
    fetchProduct();
  }, []);
  const slidesRef = useRef(null);
  const [activeImageNum, setCurrent] = useState(0);
  const length = product?.images?.length;
  const nextSlide = () => {
    setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
  };
  const prevSlide = () => {
    setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
  };
  const [edit, setEdit] = useState(false);
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const { product_id } = useParams();

  const token = localStorage.getItem("token");

  async function fetchProduct() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${product_id}`,
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
        setObj((prev) => ({ ...prev, name: data.name }));
        setObj((prev) => ({ ...prev, price: data.price }));
        setObj((prev) => ({ ...prev, description: data.description }));
        setObj((prev) => ({ ...prev, location: data.location }));
        setObj((prev) => ({ ...prev, condition: data.condition }));
        setObj((prev) => ({ ...prev, tags: data.tags }));
        setObj((prev) => ({ ...prev, delivery: data.delivery }));
        dispatch(setProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  function handleTagSubmit() {
    let updateTags = [...obj.tags, tag];

    setObj((prev) => ({ ...prev, tags: updateTags }));
  }
  function handleTagDelete(delTag) {
    let updateTags = [...obj.tags];

    setObj((prev) => ({
      ...prev,
      tags: updateTags.filter((tag) => tag !== delTag),
    }));
    alert("Tag deleted");
  }
  //navigation
  const navigation = useNavigate();
  function openForm() {
    setEdit(!edit);
  }
  function handleBackNavigate() {
    navigation(`/home/products`);
  }
  async function deleteProduct() {
    let deleteConfirmation = window.confirm(
      "Are you sure you want to delete product?"
    );
    if (deleteConfirmation) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${product_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok === true) {
          alert("Delete succesful");
          navigation("/home/products");
          navigation(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function updateProduct() {
    if (
      !obj.name &&
      !obj.price &&
      !obj.description &&
      !obj.location &&
      !obj.condition &&
      obj.tags.length === 0 &&
      !obj.delivery
    ) {
      alert("Error! No update information was entered!");
      setEdit(false);
      return;
    }
    let updateConfirmation = window.confirm(
      "You are about to update product information. Continue?"
    );
    if (updateConfirmation) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${product_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(obj),
          }
        );
        if (response.ok === true) {
          alert("Update success");
          navigation(0);
        }
        setEdit(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEdit(false);
    }
  }
  function handleImageUpload(e) {
    setObj({
      ...obj,
      profilePic: e.target.files[0],
    });
  }

  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  function handleNavigateBack() {
    navigation(`/home/products`);
  }

  return (
    <div className="Product">
      {edit ? (
        <CgClose className="icon" onClick={() => setEdit(false)} />
      ) : (
        <BackArrow className="icon" handleNavigate={handleNavigateBack} />
      )}
      <div className="product-content">
        {edit === true ? (
          <div className="update-form">
            <div className="name">
              <label htmlFor="product-name">
                Product Name
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  max="50"
                  onChange={(e) => handleChange(e)}
                  value={obj.name}
                />
              </label>
            </div>

            <div className="price">
              <label htmlFor="price">
                Price
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={(e) => handleChange(e)}
                  value={obj.price}
                />
              </label>
            </div>

            <div className="description">
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  maxLength="120"
                  onChange={(e) => handleChange(e)}
                  value={obj.description}
                ></textarea>
              </label>
            </div>

            <div className="location">
              <label htmlFor="location">
                Location
                <select
                  name="location"
                  onChange={handleDropdownChange}
                  value={obj.value}
                >
                  <option value="sa">sa</option>
                </select>
              </label>
            </div>
            <div className="condition">
              <label htmlFor="condition">
                Condition
                <select
                  name="condition"
                  onChange={handleDropdownChange}
                  value={obj.value}
                >
                  <option value=""></option>
                  <option value="new">new</option>
                  <option value="used">used</option>
                </select>
              </label>
            </div>

            <div className="tags">
              <label htmlFor="tags">
                Tag
                <div className="update tags">
                  {obj.tags.length > 0 &&
                    obj.tags.map((tag, i) => (
                      <div className="update tag" key={i}>
                        <div>{tag}</div>
                        <div onClick={() => handleTagDelete(tag)}>
                          <CgClose />
                        </div>
                      </div>
                    ))}
                </div>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                />
                <button
                  className="add-tag-btn"
                  onClick={() => handleTagSubmit()}
                >
                  Add tag
                </button>
              </label>
            </div>
            <div className="delivery">
              <label htmlFor="delivery">
                Delivery
                <select
                  name="delivery"
                  onChange={handleDropdownChange}
                  value={obj.value}
                >
                  <option value=""></option>
                  <option value="free">FREE</option>
                  <option value="default">DEFAULT</option>
                </select>
              </label>
            </div>
          </div>
        ) : (
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
              <div>{product && product.name}</div>
              <div>Tags: </div>
              <div className="update tags">
                {obj.tags.length > 0 &&
                  obj.tags.map((tag, i) => (
                    <div className="update tag" key={i}>
                      <div>{tag}</div>
                    </div>
                  ))}
              </div>
              <div>R{product && product.price}</div>
              <div className="description">
                {product && product.description}
              </div>
            </div>
          </div>
        )}
        <div className="delete-update">
          <button
            className="update"
            onClick={() => {
              edit ? updateProduct() : openForm();
            }}
          >
            {edit ? <div className="update-btn">Update </div> : <div>edit</div>}
          </button>

          <button className="delete" onClick={() => deleteProduct()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Product;
