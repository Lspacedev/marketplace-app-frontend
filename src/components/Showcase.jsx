import SearchProducts from "./SearchProducts";
function ShowCase() {
  return (
    <div className="ShowCase">
      <div className="showcase-img">
        <img src="images/showcase.jpg" />
      </div>

      <h3>Find affordable, quality products.</h3>
      <SearchProducts />
    </div>
  );
}
export default ShowCase;
