import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";

function ReviewForm({ toggleClicked }) {
  const [obj, setObj] = useState({
    seller: "",
    rating: "",
    reviewText: "",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let reviewConfirmation = window.confirm(
      "You are about to add a review. Continue?"
    );
    if (reviewConfirmation) {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PROD_URL}/api/public/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(obj),
          }
        );
        const data = await response.json();
        if (response.ok === true) {
          console.log({ data });
        }
        toggleClicked();

        setLoading(false);
      } catch (error) {
        console.log(error);
        toggleClicked();

        setLoading(false);
      }
    }
  }

  function handleFormClose() {
    toggleClicked();
  }

  const user = useSelector((state) => state.user.user);

  const purchasedProducts = user.purchasedProducts;
  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;

  return (
    <div className="ReviewForm">
      <div className="form-div">
        <div className="form-title-close">
          <div className="form-close" onClick={handleFormClose}>
            <CgClose />
          </div>
        </div>
        <form>
          <div className="room_name">
            <h3>Enter Review Information</h3>

            <label htmlFor="room_name">
              Product
              <select
                name="seller"
                onChange={(e) => handleChange(e)}
                value={obj.value}
              >
                <option></option>
                {typeof purchasedProducts !== "undefined" &&
                  purchasedProducts.length > 0 &&
                  purchasedProducts.map((product, i) => (
                    <option key={i} value={product.seller}>
                      {product.seller}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="rating">
            <label htmlFor="rating">
              Rating
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                onChange={(e) => handleChange(e)}
                value={obj.rating}
              />
            </label>
          </div>

          <div className="reviewText">
            <label htmlFor="reviewText">
              Write a short review
              <input
                type="text"
                id="reviewText"
                name="reviewText"
                maxLength="100"
                onChange={(e) => handleChange(e)}
                value={obj.reviewText}
              />
            </label>
          </div>

          <input
            id="task-add-submit"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
