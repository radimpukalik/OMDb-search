import { ChangeEvent, FC, useState } from "react";

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
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
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
