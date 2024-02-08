import { FC } from "react";
import "./MovieList.css";

interface Props {
  totalMovieResult: number;
  movieListPage: number;
  setMovieListPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pages: FC<Props> = ({ totalMovieResult, movieListPage, setMovieListPage }) => {
  const handlePageIncrement = () => {
    const lastPage = Math.ceil(totalMovieResult / 10);
    setMovieListPage((prev) => Math.min(prev + 1, lastPage));
    scrollToTop();
  };

  const handlePageDecrement = () => {
    setMovieListPage((prev) => Math.max(prev - 1, 1));
    scrollToTop();
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
      <div className="page-text">Page ({movieListPage})</div>
      <div className="page-arrows" onClick={handlePageIncrement}>
        &#62;
      </div>
    </div>
  );
};

export default Pages;
