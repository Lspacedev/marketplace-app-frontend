import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";
function Orders() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="Orders">
      <div className="orders-div">
        {user && user.purchasedProducts && user.purchasedProducts.length > 0 ? (
          user.purchasedProducts.map((order, i) => (
            <OrderCard key={i} order={order} />
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            No items purchased
          </div>
        )}
      </div>
    </div>
  );
}
export default Orders;
