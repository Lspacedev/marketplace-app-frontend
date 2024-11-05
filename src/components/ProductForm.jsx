import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm({ toggleClicked }) {
  const [obj, setObj] = useState({
    productName: "",
    price: "",
    description: "",
    location: "",
    condition: "",
    tags: [],
    delivery: "",
  });
  const [tag, setTag] = useState("");
  const [images, setImages] = useState([]);

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
  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    console.log(obj);
    if (obj.name === "" && obj.price === "" && obj.description === "") {
      alert("Please enter product information.");
      toggleClicked();
      return;
    }
    const formData = new FormData();
    formData.append("name", obj.productName);
    formData.append("price", obj.price);
    formData.append("description", obj.description);
    formData.append("location", obj.location);
    formData.append("condition", obj.condition);
    formData.append("tags", obj.tags);
    formData.append("delivery", obj.delivery);
    // for (let i = 0; i < obj.images.length; i++) {
    //   formData.append("files[]", obj.images[i]);
    // }
    Object.values(images).forEach((file) => {
      formData.append("image", file);
    });
    // formData.append("profilePic", obj.profilePic);
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok === true) {
        navigation(0);
      }
    } catch (error) {
      console.log(error);
    }
    toggleClicked();
  }
  function handleImageUpload(e) {
    setImage(e.target.files[0]);
  }
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
            x
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

          <div className="description">
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                onChange={(e) => handleChange(e)}
                value={obj.description}
              ></textarea>
            </label>
          </div>

          <div className="location">
            <label htmlFor="location">
              location
              <select
                name="location"
                onChange={handleDropdownChange}
                value={obj.value}
              >
                <option value="sa"></option>
                <option value="sa">sa</option>
              </select>
            </label>
          </div>
          <div className="condition">
            <label htmlFor="condition">
              condition
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
              <input
                type="text"
                id="tags"
                name="tags"
                onChange={(e) => setTag(e.target.value)}
              />
              <button onClick={() => handleTagSubmit()}>Add Tag</button>
            </label>
          </div>
          <div className="delivery">
            <label htmlFor="delivery">
              delivery
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
              {/* <input
                type="file"
                id="images"
                name="images"
                onChange={(e) => setImage(e.target.value)}
              />
              <button onClick={() => handleImageSubmit()}>Add Image</button> */}
            </label>
          </div>
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
