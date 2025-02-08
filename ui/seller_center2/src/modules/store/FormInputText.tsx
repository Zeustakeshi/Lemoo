
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';

interface FormInputTextProps {
    placeholder: string
name : string
}

export default function FomrInputText({name , placeholder} : FormInputTextProps) {
    const { register } = useFormContext();
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
      noValidate
      autoComplete="off"
    >
       <div>
        <TextField
        {...register(name)}
          id="outlined-size-small"
          size="small"
        placeholder={placeholder}
        
        />
      </div>
    </Box>
  );
}