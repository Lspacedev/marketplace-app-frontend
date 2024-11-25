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

  const purchasedProducts = user.purchasedProducts;

  async function fetchReviews() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/api/public/reviews`,
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
        dispatch(setReviews(data.reviews));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Reviews">
      {user.purchasedProducts.length>0 && <AddReview />}
      <div className="reviews-div">
        {typeof reviews !== "undefined" &&
          reviews.length > 0 ?
          reviews.map((review, i) => <ReviewCard key={i} review={review} />): <div>No reviews found</div>}
      </div>
    </div>
  );
}
export default Reviews;
