import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";
function Orders() {
  const user = useSelector((state) => state.user.user);

  const orders = user?.purchasedProducts;
  console.log(orders);
  return (
    <div className="Orders">
      <div className="orders-div">
        {orders && orders.length > 0 ? (
          orders.map((order, i) => <OrderCard key={i} order={order} />)
        ) : (
          <div>No items purchased</div>
        )}
      </div>
    </div>
  );
}
export default Orders;
