import { Link, useMatch } from "react-router-dom";
import "../styles/components/NavBar.css";
import NavBarFilters from "./NavBarFilters";
import SearchInput from "./SearchInput";
import NavBarMobile from "./NavBarMobile";
import { useEffect, useState } from "react";

const NavBar = () => {
  const match = useMatch("OMDb-search/search/:id");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth > 768) {
    match
      ? (document.body.style.paddingTop = "170px")
      : (document.body.style.paddingTop = "110px");
  } else {
    match
      ? (document.body.style.paddingTop = "310px")
      : (document.body.style.paddingTop = "180px");
  }

  return (
    <>
      <div className="navbar-container">
        {windowWidth > 768 ? (
          <div className="navbar-container-top">
            <Link to="/OMDb-search/">
              <button className="navbar-container-button">OMDb API</button>
            </Link>

            <SearchInput />

            <Link to="/OMDb-search/favorites">
              <button className="navbar-container-button">Favorites</button>
            </Link>
          </div>
        ) : (
          <NavBarMobile />
        )}

        {match && <NavBarFilters />}
      </div>
    </>
  );
};

export default NavBar;
