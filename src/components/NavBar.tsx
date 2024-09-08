import { Link } from "react-router-dom";
import "../styles/Header.css";
import SearchInput from "./SearchInput";
import DropdownMenu from "./DropDownMenu";
import useGameQueryStore from "../store";
import { QueryTypes } from "../store";
import YearInput from "./YearInput";
import MovieHeading from "./MovieHeading";

const NavBar = () => {
  const setType = useGameQueryStore((s) => s.setType);

  const onChange = (changedValue: string) => {
    setType(changedValue as QueryTypes);
  };

  return (
    <>
      <div className="header-container">
        <div className="header-container-test-top ">
          <Link to="/OMDb-search/" className="no-style-link">
            <div className="header-top-part-name no-style-link">OMDb API</div>
          </Link>

          <SearchInput />

          <Link to="/OMDb-search/favorites" className="no-style-link">
            <div className="header-top-part-favorite">Favorites</div>
          </Link>
        </div>

        <div className="header-container-test-bottom">
          <MovieHeading />
        </div>

        <div className="header-container-test-bottom">
          <DropdownMenu values={["movie", "series"]} onChange={onChange} />
          <YearInput />
        </div>
      </div>
    </>
  );
};

export default NavBar;
