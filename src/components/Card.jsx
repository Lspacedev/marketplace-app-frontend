import { useSearchParams } from "react-router-dom";

import { setSearchTerm } from "../app/publicSlice";
import { useDispatch } from "react-redux";
function Card({ title, url }) {
  const dispatch = useDispatch();
  //const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function searchCard() {
    setSearchParams({ search: title });
    dispatch(setSearchTerm({ title }));

    // navigation("/results");
  }
  return (
    <div className="Card" onClick={searchCard}>
      <div className="img">{/* <img src={url} /> */}</div>
      <div className="title">{title}</div>
    </div>
  );
}
export default Card;
