import ReviewCard from "../components/ReviewCard";
import AddReview from "../components/AddReview";
import { useSelector, useDispatch } from "react-redux";
import { setReviews } from "../app/reviewsSlice";
import { useEffect } from "react";
function Reviews() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReviews();
  }, []);
  const reviews = useSelector((state) => state.reviews.reviews);

  async function fetchReviews() {
    try {
      const response = await fetch(`http://localhost:3000/api/public/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log({ data });
      if (response.ok === true) {
        dispatch(setReviews(data.reviews));
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log({ reviews });
  return (
    <div className="Reviews">
      {user && user.purchasedProducts && user.purchasedProducts.length > 0 && (
        <AddReview />
      )}
      <div className="reviews-div">
        {typeof reviews !== "undefined" && reviews.length > 0 ? (
          reviews.map((review, i) => <ReviewCard key={i} review={review} />)
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            No reviews found
          </div>
        )}
      </div>
    </div>
  );
}
export default Reviews;
