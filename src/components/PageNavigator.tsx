import Pagination from "@mui/material/Pagination";
import { FC } from "react";
import useGameQueryStore from "../store";
import "../styles/components/PageNavigator.css";

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
        sx={{
          "& .MuiPaginationItem-root": {
            color: "var(--text-main)", // Default text color for pagination numbers
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#FFC107", // Yellow background for the selected page
            color: "black", // Black text for the selected page
            border: "2px solid transparent", // Match the navbar button border style
          },
          "& .MuiPaginationItem-page": {
            "&:hover": {
              backgroundColor: "#FFA000", // Darker yellow on hover
              borderColor: "#FFA000", // Border color on hover
              color: "black", // Keep the text black
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0.5rem rgba(255, 193, 7, 0.5)", // Focus shadow similar to navbar
            },
          },
        }}
      />
    </div>
  );
};

export default PageNavigator;
