import { Link } from "react-router-dom";
import "../styles/Header.css";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <>
      <div className="header-container">
        <Link to="/OMDb-search/" className="no-style-link">
          <div className="header-top-part-name no-style-link">OMDb API</div>
        </Link>

        <SearchInput />

        <Link to="/OMDb-search/favorites" className="no-style-link">
          <div className="header-top-part-favorite">Favorites</div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
