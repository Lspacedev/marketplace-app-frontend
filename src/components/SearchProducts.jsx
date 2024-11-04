import { useSearchParams, useNavigate } from "react-router-dom";
// import {
//   setSearchTerm,
//   setCheckInOut,
//   setGuests,
// } from "../../app/accomodationsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function SearchProducts() {
  const [searchInput, setSearchInput] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  // const dispatch = useDispatch();
  const navigation = useNavigate();

  function handleSearchChange(e) {
    e.preventDefault();
    if (e.target.value.length === 0) {
      //dispatch(submitSearch(""));
      //dispatch(setSearchResults([]));
    }

    setSearchInput(e.target.value);
  }

  function handleSearchSubmit(e) {
    // console.log(e);
    // e.preventDefault();
    // //setSearchParams({ search: searchInput });
    // dispatch(setSearchTerm({ title: searchInput }));
    // if (checkInOut.checkIn !== "" && checkInOut.checkOut !== "") {
    //   dispatch(setCheckInOut(checkInOut));
    // }
    // dispatch(setGuests({ num: guests }));
    // navigation("/results");
  }

  return (
    <div className="SearchProducts">
      <input type="text" placeholder="Hotel" onChange={handleSearchChange} />

      <input type="submit" onClick={handleSearchSubmit} />
    </div>
  );
}
export default SearchProducts;
