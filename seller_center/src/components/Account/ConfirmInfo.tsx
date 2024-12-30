import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FortmatConfirmInfo from './FortmatConfirmInfo';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { CreateStoreSchema } from '../../schema/CreateStoreSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


function ConfirmInfo() {
  
  const [selectedOption, setSelectedOption] = useState(0);
  const [open, setOpen] = React.useState(false);
  
  
  const handleClick = () => {
    setOpen(true);
  };
  
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setOpen(false);
  };
  
  type FormData = z.infer<typeof CreateStoreSchema>
  const methods = useForm<FormData>({
        resolver: zodResolver(CreateStoreSchema), // Kết nối Zod schema
      });   // Step1 : Get all forms methods

      
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        handleClick();
    }


 

    return (
        <FormProvider {...methods} >
            {/* Step 2: Wrap your form in FormProvider */}
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {/* Step 3: Use the methods */}
                <div className="flex flex-1 flex-col gap-5 bg-[#EEF0F4] p-5 h-full">
                    <p className="font-bold text-xl">Xác minh Thông tin Chủ gian hàng để nhận Thanh Toán!</p>
                    <p className='text-green-500'> <CheckBoxIcon style={{ color: 'green' }} /> Thông tin tài khoản của bạn được bảo mật</p>
                    {/* type info */}
                    <div className='w-full p-5 bg-white rounded-xl'>
                        {/* Tùy chọn 1 */}
                        <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                            <input
                                type="radio"
                                value={0}
                                checked={selectedOption === 0}
                                onChange={() => setSelectedOption(0)}
                                className=" h-5 w-5 accent-blue-500 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">Individual - Vietnam Citizen ID (passport if foreigner) needed</span>
                        </label>

                        {/* Tùy chọn 2 */}
                        <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                            <input
                                type="radio"
                                value={2}
                                checked={selectedOption === 1}
                                onChange={() => setSelectedOption(1)}
                                className=" h-5 w-5 accent-blue-500 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-gray-700">Corporate - Enterprise Business Registration Certificate needed</span>
                        </label>
                    </div>

                    {/* fill information */}

                    <FortmatConfirmInfo option={selectedOption} />
                    <div className='bg-white rounded-xl p-4 text-right '>
                        <input type="submit" className='bg-blue-500 p-2 rounded-md text-white' />
                    </div>
                </div>
            </form>
            <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Thông tin đã được xác nhận
                    </Alert>
                </Snackbar>
            </div>
        </FormProvider>

    )
}

export default ConfirmInfo