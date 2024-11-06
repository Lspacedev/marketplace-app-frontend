function ProductCard({ handleNavigate, product }) {
  return (
    <div className="ProductCard">
      <div className="img" onClick={() => handleNavigate(product._id)}>
        <img src={product.images[0]} alt="product" />
      </div>
      <div className="product-info">
        <div>{product.name}</div>
        <p>R{product.price}</p>
        <p>{product.location}</p>
      </div>
    </div>
  );
}

export default ProductCard;
