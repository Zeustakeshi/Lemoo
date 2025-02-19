import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

interface CustomGroupRadio  {
  options: { label: string; value: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const CustomGroupRadio: React.FC<CustomGroupRadio> = ({ options, selectedValue, setSelectedValue }) => {
  return (
    <FormControl>
      <RadioGroup
        row
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomGroupRadio;
