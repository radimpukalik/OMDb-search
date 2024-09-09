import { ChangeEvent, FC, useState } from "react";
import "../styles/components/DropDownMenu.css";

interface Props {
  values: string[];
  onChange: (newValue: string) => void;
}

const DropdownMenu: FC<Props> = ({ values, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(values[0]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
        className="dropdownmenu"
      >
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropdownMenu;
