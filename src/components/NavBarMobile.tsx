import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import "../styles/components/NavBarMobile.css";

const NavBarMobile = () => {
  return (
    <div className="navbar-mobile-container-top">
      <div className="navbar-mobile-container-top-top">
        <Link to="/OMDb-search/">
          <button className="navbar-container-button">OMDb API</button>
        </Link>

        <Link to="/OMDb-search/favorites">
          <button className="navbar-container-button">Favorites</button>
        </Link>
      </div>

      <div className="navbar-mobile-container-top-bottom">
        <SearchInput />
      </div>
    </div>
  );
};

export default NavBarMobile;
