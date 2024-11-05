import { useState } from "react";
import { useSelector } from "react-redux";

function ReviewForm({ toggleClicked }) {
  const [obj, setObj] = useState({
    seller: "",
    rating: "",
    reviewText: "",
  });

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
      //   try {
      //     const response = await fetch(
      //       `http://localhost:3000/api/public/reviews/${item_id}`,
      //       {
      //         method: "GET",
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );
      //     const data = await response.json();
      //     if (response.ok === true) {
      //       dispatch(setPublicProduct(data));
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      toggleClicked();
    }
  }

  function handleFormClose() {
    toggleClicked();
  }

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    fetchReviews();
  }, []);

  const purchasedProducts = user.purchasedProducts;

  return (
    <div className="ReviewForm">
      <div className="form-div">
        <div className="form-title-close">
          <div className="form-close" onClick={handleFormClose}>
            x
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
                value={obj.seller}
              >
                <option></option>
                {typeof purchasedProducts !== "undefined" &&
                  purchasedProducts.length > 0 &&
                  purchasedProducts.map((product, i) => (
                    <option key={i} value={product._id}>
                      {product._id}
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
                onChange={(e) => handleChange(e)}
                value={obj.rating}
              />
            </label>
          </div>

          <div className="reviewText">
            <label htmlFor="reviewText">
              Write a short review
              <input
                id="reviewText"
                name="reviewText"
                onChange={(e) => handleChange(e)}
                value={obj.reviewText}
              />
            </label>
          </div>

          <input
            id="task-add-submit"
            type="submit"
            value="submit"
            onClick={handleSubmit}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
