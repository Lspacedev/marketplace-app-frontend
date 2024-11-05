function ProductCard({ handleNavigate, product }) {
  return (
    <div className="ProductCard">
      <div className="img" onClick={() => handleNavigate(product._id)}>
        <img src={product.images[0]} alt="product" />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
