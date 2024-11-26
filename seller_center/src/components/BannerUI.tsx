
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import img from '../assets/images/raiden7.jpg'
import React, { useState } from 'react';

function BannerUI() {
    const [img, setImg] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result); // Cập nhật src của img
            };
            reader.readAsDataURL(file); // Đọc tệp dưới dạng URL
        }
    };
    return (
        <div className="bg-[#EEF0F4] w-screen h-screen p-5 overflow-hidden" >
            {/* tiêu đề */}
            <h2 className="text-xl font-bold">Store Campaign Banner</h2>

            <div className="flex mt-3 gap-5 h-full  ">

                {/* Nội dung bên trái */}
                <div className="w-[70%] h-[100%] bg-white p-5 rounded-2xl">
                    {/* Trên <hr/> */}
                    <div className="w-full h-10 bg-[#ddecff] rounded-[3px] flex items-center p-8 gap-3 mb-5">
                        <ErrorOutlineIcon className='text-blue-600' /> Campaign banner size : 690 px * 204 px
                    </div>
                    <hr className='border-blue-800 mb-5' />
                    {/* Dưới <hr/> */}
                    <div className='w-full h-[300px] border border-indigo-600 relative'>
                    {img && <img src={img} className='w-full h-full object-cover' alt="Uploaded" />}   {/* khi input(file) thay đổi thì cần thay đổi src img  */}
                        <div className=" flex flex-col items-center justify-center absolute inset-0  bg-[rgba(0,0,0,0.58)] w-full h-full opacity-0 hover:opacity-100 transition duration-300 " >

                            <div className='w-[200px] h-[70px] bg-white relative'>
                            <input 
                        type="file" 
                        className='w-full h-full opacity-0 z-10 top-0 left-0 absolute' 
                        onChange={handleFileChange} // Gọi hàm khi tệp thay đổi
                    /> {/* nơi chọn ảnh từ file */}
                                <p className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 '>Upload File</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white flex-1 p-5 rounded-2xl">2 </div>
            </div>
        </div>
    )

}
export default BannerUI