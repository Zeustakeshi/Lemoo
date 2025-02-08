import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

interface RadioButtonsProps {
  options: string[]; // Nhận mảng giá trị để hiển thị các radio buttons
}

export default function RadioButtons({ options }: RadioButtonsProps) {
  const [selectedValue, setSelectedValue] = React.useState(options[0]); // Mặc định chọn giá trị đầu tiên trong mảng

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className='flex'>
      <RadioGroup style={{display:'flex'}} name="radio-buttons" value={selectedValue} onChange={handleChange}>
        {options.map((option, index) => (
          <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </div>
  );
}
