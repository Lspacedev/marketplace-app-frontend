import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function OrderCard({ order }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProduct();
  }, [order]);

  const token = localStorage.getItem("token");

  async function fetchProduct() {
    console.log({ order });
    try {
      const response = await fetch(
        `http://localhost:3000/api/public/products/${order.productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok === true) {
        setProduct(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;

  return (
    <div className="OrderCard">
      <div className="img">
        <img src={product && product.images[0]} alt="product" />
      </div>
      <div className="product-info">
        <div>{product && product.name}</div>
        <p>R{product && product.price}</p>
        <p>{product && product.location}</p>
        <h4>{product && product.status}</h4>
      </div>
    </div>
  );
}
export default OrderCard;
