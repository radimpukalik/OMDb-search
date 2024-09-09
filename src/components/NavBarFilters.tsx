import DropdownMenu from "./DropDownMenu";
import YearInput from "./YearInput";
import useGameQueryStore, { QueryTypes } from "../store";

const NavBarFilters = () => {
  const setType = useGameQueryStore((s) => s.setType);
  const setPage = useGameQueryStore((s) => s.setPage);

  const onChange = (changedValue: string) => {
    setType(changedValue as QueryTypes);
    setPage(1);
  };

  return (
    <div className="navbar-container-bottom">
      <div className="navbar-filter-container">
        <p>Filter by type:</p>
        <DropdownMenu values={["movie", "series"]} onChange={onChange} />
      </div>
      <div className="navbar-filter-container">
        <p>Filter by year:</p>
        <YearInput />
      </div>
    </div>
  );
};

export default NavBarFilters;
