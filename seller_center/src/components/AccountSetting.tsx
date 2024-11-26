import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import FormatSetting from './Account/FormatSetting';
import  avtar  from '../assets/images/raiden7.jpg';


function AccountSetting() {
    return (
        <div className="p-3 bg-[#EEF0F4] w-screen  overflow-y-scroll ">

            <h1 className="font-bold text-[30px]">Cài đặt </h1>

            <div className="bg-white w-full h-full rounded-xl overflow-hidden p-5">
                {/* Phần đầu thông tin cá nhân */}
                <div className="flex gap-5 ">
                    <div className="bg-[#EEF0F4] rounded-full w-[100px] h-[100px] overflow-hidden" > <img src={avtar} alt="" className='w-full h-full object-cover' /></div>
                      
                    <div>
                        <p className="font-bold text-[20px]">Việt nè <EditNoteIcon className='text-blue-700 text-[10px]' /></p>
                        <p className="mt-4">ID của nhà bán hàng: VN3489TT64 <FileCopyIcon className='text-blue-700' /> </p>
                        <p>https://www.lazada.vn/shop/2zbl54yk <FileCopyIcon className='text-blue-700' /></p>
                    </div>
                </div>
                <hr className='mt-4 mb-4' />
                {/* Phần thân các chỉ mục */}
                <div className='block mt-2'>
                    <FormatSetting />

                </div>
            </div>
        </div>
    )


}
export default AccountSetting