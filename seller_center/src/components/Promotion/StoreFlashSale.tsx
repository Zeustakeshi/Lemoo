
import img1 from '../../assets/images/14.png'
import img2 from '../../assets/images/2.png'
import img3 from '../../assets/images/15.png'
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import WarningIcon from '@mui/icons-material/Warning';

export default function StoreFlashSale() {
    return (
        <div className='bg-gray-200 h-full flex flex-col gap-3 p-4'>
            <p className='font-bold '>Regular Voucher</p>
            <div className='flex gap-2 bg-white w-full p-2 rounded-lg'>
                <NoteAltIcon className='text-blue-600' />
                <p className='text-gray-400'>Thanks for using promotion tools! Feel free to leave your <a href="#" className='text-blue-600'>feed back</a> here!</p>
            </div>

            <div className='w-full p-2 bg-yellow-100 flex items-center gap-2'>
                <WarningIcon className='text-yellow-400'/>
                <p className='max-w-[50%]'>
                    Tiêu chí của người bán để có thể tạo Ra mắt Cửa hàng Flash Sale
                   <p className='text-gray-500'> Đánh giá người bán &gt; 75% và Tỷ lệ hủy &lt; 5%</p>
                </p>

            </div>
            <div className='flex flex-col items-center gap-4 bg-white rounded-lg p-3  ' >
                <p className='font-bold text-[20px]'>Deal Chớp Nhoáng gian hàng</p>
                <p className='text-gray-400 text-[12px]'>Gia tăng đơn hàng bằng cách thiết lập thời gian giảm giá cho sản phẩm</p>
                <div className='flex w-full justify-between items-center bg-white p-4 rounded-lg'>
                    <div className='flex justify-between items-center w-20% gap-4 '>
                        <div className='w-16 h-16 rounded-full  '>
                            <img src={img1} alt="" className='w-full h-full' />
                        </div>
                        <p className='max-w-52'>Chi tiết lượng truy cập đặc biệt cho gian hàng và sản phẩm</p>
                    </div>
                    <div className='flex justify-between items-center w-20% gap-4 '>
                        <div className='w-16 h-16 rounded-full'>
                            <img src={img2} alt="" className='w-full h-full' />
                        </div>
                        <p className='max-w-52'>Sản phẩm bán chạy nhất</p>
                    </div>
                    <div className='flex justify-between items-center w-20% gap-4 '>
                        <div className='w-16 h-16 rounded-full'>
                            <img src={img3} alt="" className='w-full h-full' />
                        </div>
                        <p className='max-w-52'>Sự phát triển đơn hàng mới</p>
                    </div>
                </div>
                <div>
                    <button className='bg-blue-600 pt-1 pb-1 pl-4 pr-4 rounded-lg text-white'>
                        + Tạo khuyến mãi
                    </button>
                </div>
            </div>


        </div>
    )
}
