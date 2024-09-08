import Pagination from "@mui/material/Pagination";
import { FC } from "react";
import useGameQueryStore from "../store";
import "../styles/MovieList.css";

interface Props {
  maxPage: number;
}

const PageNavigator: FC<Props> = ({ maxPage }) => {
  const page = useGameQueryStore((s) => s.gameQuery.page);
  const setPage = useGameQueryStore((s) => s.setPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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

  if (!maxPage || maxPage === 1) return null;

  return (
    <div className="page-container">
      <Pagination
        count={maxPage}
        page={page}
        onChange={handleChange}
        color="primary" // This will apply a color to the selected page
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white", // Color for the page numbers
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "blue", // Background color for the selected page
            color: "white", // Text color for the selected page
          },
        }}
      />
    </div>
  );
};

export default PageNavigator;
