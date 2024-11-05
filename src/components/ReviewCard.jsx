function ReviewCard({ review }) {
  return (
    <div className="ReviewCard">
      <div className="review-text">
        <p>{review.text}</p>
        <p>{review.rating}</p>
        <p>{review.createdAt}</p>
      </div>
    </div>
  );
}
export default ReviewCard;
