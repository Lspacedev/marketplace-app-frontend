import { useSearchParams, useNavigate } from "react-router-dom";
import {
  setSearchTerm,
  setSubmitSearch,
  setSearchResults,
} from "../app/publicSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

function SearchProducts() {
  const [searchInput, setSearchInput] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function handleSearchChange(e) {
    e.preventDefault();
    if (e.target.value.length === 0) {
      dispatch(setSubmitSearch(""));
      dispatch(setSearchResults([]));
    }

    setSearchInput(e.target.value);
  }

  function handleSearchSubmit(e) {
    // console.log(e);
    e.preventDefault();
    setSearchParams({ search: searchInput });
    dispatch(setSearchTerm({ title: searchInput }));
  }

  return (
    <div className="SearchProducts">
      <input
        type="text"
        placeholder="Search products"
        onChange={handleSearchChange}
      />

      <button className="search-btn" onClick={handleSearchSubmit}>
        <CgSearch className="icon" />
      </button>
    </div>
  );
}
export default SearchProducts;
