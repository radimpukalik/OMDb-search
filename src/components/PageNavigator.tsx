import { FC } from "react";
import useGameQueryStore from "../store";
import "../styles/MovieList.css";

interface Props {
  page: number;
  minPage: number;
  maxPage: number;
}

const PageNavigator: FC<Props> = ({ page, minPage, maxPage }) => {
  const pageIncrement = useGameQueryStore((s) => s.pageIncrement);
  const pageDecrement = useGameQueryStore((s) => s.pageDecrement);

  const handlePageIncrement = () => {
    if (page < maxPage) {
      pageIncrement();
      scrollToTop();
    }
  };

  const handlePageDecrement = () => {
    if (page > minPage) {
      pageDecrement();
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="page-container">
      <div className="page-arrows" onClick={handlePageDecrement}>
        &#60;
      </div>
      <div className="page-text">Page ({page})</div>
      <div className="page-arrows" onClick={handlePageIncrement}>
        &#62;
      </div>
    </div>
  );
};

export default PageNavigator;
