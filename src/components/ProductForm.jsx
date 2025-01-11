import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
function ProductForm({ toggleClicked }) {
  const [obj, setObj] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
    location: "",
    condition: "",
    tags: [],
    delivery: "",
  });
  const [tag, setTag] = useState("");
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const token = localStorage.getItem("token");

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
  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (
      obj.productName === "" ||
      obj.price === "" ||
      obj.category === "" ||
      obj.description === "" ||
      obj.location === "" ||
      obj.condition === "" ||
      obj.delivery === ""
    ) {
      alert("Please enter product information.");
      //toggleClicked();
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", obj.productName);
    formData.append("price", obj.price);
    formData.append("category", obj.category);
    formData.append("description", obj.description);
    formData.append("location", obj.location);
    formData.append("condition", obj.condition);
    formData.append("tags", JSON.stringify(obj.tags));
    formData.append("delivery", obj.delivery);

    Object.values(images).forEach((file) => {
      formData.append("image", file);
    });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok === true) {
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    toggleClicked();
    navigation(0);
  }
  // function handleImageUpload(e) {
  //   setImage(e.target.files[0]);
  // }
  function handleImageSubmit(e) {
    let updateImages = [...obj.images, image];

    setObj({
      ...obj,
      images: updateImages,
    });
  }
  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="ProductForm">
      <div className="form-div">
        <div className="form-title-close">
          <h3>Enter Product Information</h3>
          <div className="form-close" onClick={handleFormClose}>
            <IoCloseOutline className="icon" />
          </div>
        </div>
        <div className="form">
          <div className="name">
            <label htmlFor="product-name">
              Product Name
              <input
                type="text"
                id="name"
                name="productName"
                max="50"
                onChange={(e) => handleChange(e)}
                value={obj.productName}
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
          <div className="category">
            <label htmlFor="category">
              Category
              <select
                name="category"
                onChange={handleDropdownChange}
                value={obj.value}
              >
                <option value=""></option>
                <option value="tech">Tech</option>
                <option value="clothing">Clothing</option>
                <option value="outdoors">Outdoors</option>
              </select>
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
                <option value=""></option>
                <option value={`${user.city}`}>{user.city}</option>
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
              />
              <button className="add-tag-btn" onClick={() => handleTagSubmit()}>
                Add Tag
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
          <div className="images">
            <label htmlFor="images">
              Images: <span>Max 3</span>
              <input
                type="file"
                id="file"
                name="uploadImages"
                multiple
                onChange={(e) => setImages(e.target.files)}
              />
            </label>
          </div>
          <button onClick={loading ? console.log() : handleSubmit}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
