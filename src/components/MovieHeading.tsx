import { useMatch } from "react-router-dom";
import useGameQueryStore from "../store";
import "../styles/components/MovieHeading.css";

const MovieHeading = () => {
  const match = useMatch("/OMDb-search/search/:search");
  const type = useGameQueryStore((s) => s.gameQuery.type);
  const search = useGameQueryStore((s) => s.gameQuery.searchText);
  const year = useGameQueryStore((s) => s.gameQuery.year);

  const isSearchPage = !!match;

  const heading = `Showing results
    ${year ? ` from ${year}` : ""}
    ${search ? ` for "${search}"` : ""}
    ${type ? ` of type ${type}` : ""}`;

  return (
    <>{isSearchPage && <h2 className="heading-container">{heading}</h2>}</>
  );
};

export default MovieHeading;
