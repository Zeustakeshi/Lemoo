
import FormInfo from "./FormInfo";

interface InfoItem {
    name: string;
    subname1: string;
    subname2: string;
    color: string;
}

const info: InfoItem[] = [
    { name: 'Deal Hời', subname1: 'Tạo khuyến mãi Mua kèm giảm mạnh', subname2: 'Increase Basket Size', color: '#99FFFF' },
    { name: 'Deal Chớp Nhoáng Gian Hàng', subname1: 'Tạo ưu đãi giới hạn thời gian trong cửa hàng của bạn', subname2: 'Increase Conversion', color: '#33FF66' },
    { name: 'Mã giảm giá', subname1: 'Tăng lượng truy cập và doanh số', subname2: 'Increase Conversion', color: '#33FF66' },
];

const listInfo: InfoItem[]= [
    { name: 'Combo Linh Hoạt', subname1: 'Mua nhiêu, giảm sâu', subname2: 'Increase Basket Size', color: '#00FF00' },
    { name: 'Mã giảm giá cho người mua mới', subname1: 'Thu hút khách hàng tiềm năng', subname2: 'Increase Conversion', color: '#99FFFF' },
    { name: 'Mã giảm giá theo dõi gian hàng', subname1: 'Tạo mã giảm giá để tăng số lượng người theo dõi cửa hàng bạn', subname2: 'Repeat Order', color: '#99FFFF' },
    { name: 'Miễn Phí Vận Chuyển', subname1: 'Tạo khuyến mãi Miễn phí vận chuyển để nổi bật hơn so với các gian hàng khác', subname2: 'Increase Conversion', color: '#99FFFF' },
    { name: 'Mã giảm giá khác', subname1: 'Phục vụ mục đich Live Stream hoặc chia sẻ tới các kênh khác', subname2: 'Increase Conversion', color: '#99FFFF' },
    { name: 'Giá bán sỉ', subname1: 'Đặt các mức giá cho số lượng mua khác nhau', subname2: 'Increase Basket Size', color: '#99FFFF' },
    { name: 'Giá Chào Sàn', subname1: 'Thiết lập Giá Chào Sàn cho các sản phẩm mới đề gia tăng doanh thu cho gian hàng', subname2: 'Increase Conversion', color: '#99FFFF' },
      
]
export default function Promotion() {
    return (
        <div className="bg-[rgb(238,240,244)] w-full h-full p-4">
            <div className="bg-white p-4 w-full h-full ">
                <p className="font-bold text-[20px]">Bộ công cụ</p>
                <div className="flex flex-col w-full  bg-[#dcecff] rounded-xl p-3 gap-2">
                    <p>Công cụ đề xuất</p>
                    <div className="flex justify-between items-center">
                        {info.map((item, index) => (
                            <FormInfo key={index} item={item} />
                        ))}
                    </div>

                </div>
                <div className="flex mt-3">
                    <ul className="list-none flex gap-3 justify-center items-center">
                        <li className="p-1 rounded-lg bg-blue-500 ">Công cụ phổ biến</li>
                        <li className="p-1 rounded-lg bg-gray-200 ">Cải thiện tỷ lệ chuyển đổi của gian hàng</li>
                        <li className="p-1 rounded-lg bg-gray-200 ">Cải thiện giá trị giỏ hàng</li>
                        <li className="p-1 rounded-lg bg-gray-200 ">Khác</li>
                    </ul>
                </div>
              <div className="flex flex-wrap w-full h-max items-center justify-between p-3 gap-3 mt-2">
              {listInfo.map((item,index) =>(
                    <FormInfo key={index} item={item} />
              ))}
              </div>
            </div>
        </div>
    )
}
