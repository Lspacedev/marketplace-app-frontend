import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";
import { useSelector, useDispatch } from "react-redux";
import { setReviews } from "../app/reviewsSlice";
function Reviews() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
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
      <AddReview />
      <div className="reviews-div">
        {typeof reviews !== "undefined" &&
          reviews.length > 0 &&
          reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
      </div>
    </div>
  );
}
export default Reviews;
