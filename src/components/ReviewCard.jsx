import { IoStarSharp } from "react-icons/io5";

function ReviewCard({ review }) {
  function printStars(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
    return arr;
  }
  return (
    <div className="ReviewCard">
      <div className="review-text">
        <div>
          <h4>Review</h4>
          <p>{review.text}</p>
        </div>
        <div>
          <h4>Rating</h4>

          <p>
            {review.rating &&
              printStars(review.rating).map((elem, i) => (
                <IoStarSharp key={i} className="star" />
              ))}
          </p>
        </div>
        <div>
          <h4>Date</h4>

          <p>{new Date(review.createdAt).toDateString()}</p>
        </div>
      </div>
    </div>
  );
}
export default ReviewCard;
