import img1 from '../../assets/images/regular vouvher.png'
import img2 from '../../assets/images/2.png'
import img3 from '../../assets/images/3.png'



import NoteAltIcon from '@mui/icons-material/NoteAlt';
export default function RegularVoucher() {
  return (
    <div className='bg-gray-200 h-full flex flex-col gap-3 p-4'>
      <p className='font-bold '>Regular Voucher</p>
      <div className='flex gap-2 bg-white w-full p-2 rounded-lg'>
      <NoteAltIcon className='text-blue-600' />
        <p className='text-gray-400'>Thanks for using promotion tools! Feel free to leave your <a href="#" className='text-blue-600'>feed back</a> here!</p></div>
      <div className='flex w-full justify-between items-center bg-white p-4 rounded-lg'>
        <div className='flex justify-between items-center w-20% gap-4 '>
          <div className='w-16 h-16 rounded-full '>
            <img src={img1} alt="" className='w-full h-full' />
          </div>
          <p className='max-w-52'>Cải thiện tỷ lệ chuyển đổi</p>
        </div>
        <div className='flex justify-between items-center w-20% gap-4 '>
          <div className='w-16 h-16 rounded-full'>
          <img src={img2} alt="" className='w-full h-full' />
          </div>
          <p className='max-w-52'>Kích thích doanh thu</p>
        </div>
        <div className='flex justify-between items-center w-20% gap-4 '>
          <div className='w-16 h-16 rounded-full'>
          <img src={img3} alt="" className='w-full h-full' />
          </div>
          <p className='max-w-52'>Tăng giá trị đơn hàng</p>
        </div>
        <div>
          <button className='bg-blue-500 pt-1 pb-1 pl-3 pr-3 text-white rounded-md'>+ Create Now</button>
        </div>
      </div>
    </div>
  )
}
