import Nav from "../components/Nav";
import ShowCase from "../components/Showcase";
import Categories from "../components/Categories";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div className="Landing">
      <Nav />
      <ShowCase />
      <Categories heading="Categories">
        <Card title="Tech" />
      </Categories>

      <Categories heading="Popular"></Categories>

      <Footer />
    </div>
  );
}
export default Landing;
