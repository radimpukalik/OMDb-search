import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../store";
import "../styles/Header.css";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ref.current) {
      if (ref.current.value.length !== 0) {
        setSearchText(ref.current.value);
        navigate(`/OMDb-search/search/${ref.current.value}`);
      } else {
        navigate("/OMDb-search/");
      }
    }
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="header-top-part-input"
        placeholder={"Enter to search ..."}
        ref={ref}
      />
    </form>
  );
};

export default SearchInput;
