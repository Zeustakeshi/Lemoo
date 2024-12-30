import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';


const ListTile = [{
    title: "Thông tin doanh nghiệp",
    bg_color: "bg-[#66CCFF]",
    detail: [{
        icon: <PermContactCalendarIcon />,
        item: "Hồ sơ người bán ",
        content: "Thông tin cá nhân của bạn"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Thông tin doanh nghiệp",
        content: "Quản lý hồ sơ người bán"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Cài đặt tài khoản",
        content: "Quản lý tài khoản đăng nhập"
    }]
}, {
    title: "Tài chính",
    bg_color: "bg-[#FBE4E4]",
    detail: [{
        icon: <PermContactCalendarIcon />,
        item: "Tài khoản ngân hàng ",
        content: "Quản lý tài khoản ngân hàng"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Hoa hồng",
        content: "Quản lý phí hoa hồng"
    },
    ]
}, {
    title: "Logistic",
    bg_color: "bg-[#EDE7FF]",
    detail: [{
        icon: <PermContactCalendarIcon />,
        item: "Số hóa đơn",
        content: "Quản lý số hóa đơn"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Kho hàng",
        content: "Của bạn địa chỉ giao hàng"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Chế độ nghỉ lễ",
        content: "Quản lý chế độ nghỉ lễ"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Dịch vụ giao hàng",
        content: "Quản lý dịch vụ giao hàng"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Nhà vận chuyển",
        content: "Quản lý nhà vận chuyển"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Giờ làm việc",
        content: "Quản lý Giờ Hoạt Động"
    },
    ]
}, {
    title: "Quản lý người dùng",
    bg_color: "bg-[#00BFA7]",
    detail: [{
        icon: <PermContactCalendarIcon />,
        item: "Quản lý người dùng",
        content: "Quản lý đăng nhập của các tài khoản vận hành gian hàng"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Quản lý vai trò",
        content: "Quản lý Email/điện thoại/mật khẩu đăng nhập"
    }
    ]
}, {
    title: "Trò chuyện",
    bg_color: "bg-[#66CCFF]",
    detail: [{
        icon: <PermContactCalendarIcon />,
        item: "Trả lời nhanh",
        content: "Quản lý trả lời nhanh"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Trả lời tự động",
        content: "Quản lý trả lời tự động"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Thông báo",
        content: "Quản lý từ khóa trả lời tự động"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Thẻ Từ Khóa Trò Chuyện",
        content: "Quản lý từ khóa trả lời tự động"
    },
    {
        icon: <PermContactCalendarIcon />,
        item: "Quản lý trợ lý",
        content: "Quản lý Trợ Lý Quản Lý"
    }
    ]
},
{
    title: "Hệ thống",
    bg_color: "bg-[#FBE4E4]",
    detail: [{
        icon: <PermContactCalendarIcon />,
        item: "Thiết lập thông báo",
        content: "Nhận thông báo theo tùy chỉnh của bạn"
    }
    ]
}]


function FormatSetting() {
    return (
        <>
            {ListTile.map((items, index) => (
                <a className='block mt-5' key={index} href='FileSeller' >
                    <h1 className='text-[20px] font-bold '>{items.title}</h1>
                    <div className='flex flex-wrap gap-[20px] mt-2 justify-start'>
                        {/* Phần lặp lại */}

                        {items.detail?.map((item, index) => (
                            <div key={index} className='  hover:bg-[#eae9e9] hover:shadow-lg cursor-pointer p-4 flex gap-6 items-center w-[31%] h-[120px] bg-[#EEF0F4] rounded-2xl m-1'>
                                <div className={`flex w-[60px] h-[60px] ${items.bg_color} items-center justify-center rounded-lg`} >
                                    {item.icon}
                                </div>
                                <div >
                                    <p className='font-bold mb-3'>{item.item}</p>
                                    <p className='text-gr'>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </a>
            ))}
        </>
    )
}
export default FormatSetting