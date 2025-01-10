import Nav from "../components/Nav";
import ShowCase from "../components/Showcase";
import Categories from "../components/Categories";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBoxOpen } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

function Landing() {
  const { item_id } = useParams();
  const navigation = useNavigate();
  const user = useSelector((state) => state.user.user);
  const publicProducts = useSelector((state) => state.public.publicProducts);
  function closeCart() {
    const search = document.querySelector(".Cart");
    search.classList.toggle("active");
  }
  const token = localStorage.getItem("token");
  console.log(publicProducts);
  return (
    <div className="Landing">
      <Nav />
      <ShowCase />
      {typeof item_id === "undefined" && (
        <Categories heading="Categories">
          <Card title="Tech" />
          <Card title="Clothing" />
          <Card title="Outdoors" />
        </Categories>
      )}

      {/* <Categories heading="Popular"></Categories> */}
      <Outlet />
      <Footer />
      <div className="Cart">
        <div className="closebtn" onClick={closeCart}>
          <CgClose />
        </div>

        {user && user.cart && user.cart.length > 0 ? (
          user.cart.map(
            (item, i) =>
              publicProducts &&
              publicProducts.length > 0 && (
                <div key={i} className="item">
                  <div className="name">
                    <FaBoxOpen />
                    <div>
                      {
                        publicProducts.filter(
                          (product) => product._id === item
                        )[0].name
                      }
                    </div>
                  </div>
                  <div
                    className="view"
                    onClick={() =>
                      navigation(
                        `/marketplace/${
                          publicProducts.filter(
                            (product) => product._id === item
                          )[0]._id
                        }`
                      )
                    }
                  >
                    View
                  </div>
                </div>
              )
          )
        ) : (
          <div style={{ textAlign: "center" }}>Cart is empty</div>
        )}
      </div>
    </div>
  );
}
export default Landing;
