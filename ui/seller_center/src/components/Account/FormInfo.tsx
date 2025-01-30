import img from '../../assets/images/cccd.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
// Import Swiper styles

// @ts-ignore
import 'swiper/css' ;
// @ts-ignore
import 'swiper/css/pagination';


type Props = {
    info: {
      text1: string,
      text2: string,
      text3: string
    },
    children: React.ReactNode
}


function FormInfo({ info, children  }:Props) {

  return (
    <div>
      <div className="flex justify-between w-full bg-gray-200 p-3 h-[300px] rounded-xl "  >
        <div className="w-[30%]   flex flex-col gap-1">
            <p>{info.text1}</p>
          {children}
        </div>
        <div className="w-[30%] h-[200px]  flex flex-col gap-1">
          <p className="text-blue-500">{info.text2}</p>
          <Swiper
           pagination={true}
           modules={[Pagination]}
            slidesPerView={1}
            className="relative w-[300px] h-full "
          >
            <SwiperSlide className="w-full" ><img src={img} alt="" className="w-full h-full object-cover" /></SwiperSlide>
            <SwiperSlide className="w-full" ><img src={img} alt="" className="w-full h-full object-cover" /></SwiperSlide>
            <SwiperSlide className="w-full" ><img src={img} alt="" className="w-full h-full object-cover" /></SwiperSlide>
          </Swiper>
        </div>

        <div className="w-[30%] flex flex-col gap-1">
          <p>{info.text3}</p>
        </div>
      </div>
    </div>
  )
}

export default FormInfo