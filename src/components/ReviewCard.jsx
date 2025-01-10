function ReviewCard({ review }) {
  return (
    <div className="ReviewCard">
      <div className="review-text">
        <div>
          <h4>Review</h4>
          <p>{review.text}</p>
        </div>
        <div>
          <h4>Rating</h4>
          <p>{review.rating}</p>
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
