import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FormInput from './FormInput';
function FileSeller(){
    return(
        <div className=" bg-[#EEF0F4] flex flex-1 flex-col h-screen p-5 gap-10">
            <p className="font-black text-2xl">Hồ sơ người bán</p>
            {/* waring  */}
            <div className="w-full h-max bg-[#fff6e5] p-3 rounded-xl">
                    <p><WarningAmberIcon style={{color:'yellow'}} /> Nhà bán hàng mới vui lòng hoàn thành thông tin tại mục <a href="ConfirmInfo" className='text-blue-600'>Nhiệm vụ dành cho Nhà Bán Hàng mới trên trang chủ   </a> </p>
            </div>
            {/* Information*/}
            <div className='flex flex-1 flex-col gap-5 bg-white rounded-lg p-5'>
                <p>ID của nhà bán hàng </p>
                <p>VN3489TT64</p>
                <p>Họ và tên</p>
                <p>Email liên hệ</p>
                <p className='text-gray-500'>nguyentuanviet12k1@gmail.com</p>
                <p>Số điện thoại liên hệ</p>
                <p className='text-gray-500'>+84 0868274624</p>
                <p>Tên hiển thị</p>
                
            </div>

            <FormInput size={100}/>
        </div>
    )
}

export default FileSeller