import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../store";
import "../styles/components/SearchInput.css";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const setPage = useGameQueryStore((s) => s.setPage);
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
    setPage(1);
  };

  return (
    <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
      <input className="input" placeholder={"Enter to search ..."} ref={ref} />
    </form>
  );
};

export default SearchInput;
