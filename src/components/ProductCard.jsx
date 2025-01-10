import { useEffect, useState } from "react";
function ProductCard({
  handleNavigate,
  addToCart,
  removeFromCart,
  product,
  cart,
}) {
  console.log(cart);
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    if (cart && cart.filter((item) => item === product._id).length > 0) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cart]);
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
      {product.status === "SOLD" ? (
        <button>Sold</button>
      ) : (
        <button
          onClick={() =>
            isAdded
              ? removeFromCart(product._id)
              : addToCart(product._id, product.sellerId)
          }
        >
          {isAdded ? "Remove from cart" : "Add to Cart"}
        </button>
      )}
    </div>
  );
}

export default ProductCard;
