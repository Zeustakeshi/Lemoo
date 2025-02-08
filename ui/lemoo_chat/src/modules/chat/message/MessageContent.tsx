import { cn } from "@/lib/utils";
import moment from "moment";

type Props = {
    isSelf: boolean;
};

const MessageContent = ({ isSelf }: Props) => {
    return (
        <div
            className={cn("bg-white  p-4 rounded-xl border border-primary ", {
                "bg-primary text-white shadow-md": isSelf,
            })}
        >
            <p>
                [ HỖ TRỢ TRUYỀN THÔNG ] - CLB LỄ TÂN ‼️THÔNG BÁO‼️ 🌸TUYỂN SINH
                VIÊN THAM GIA CHƯƠNG TRÌNH TUYÊN DƯƠNG THANH NIÊN TIÊU BIỂU
                TRÚNG TUYỂN NVQS🌸 ⏰ Thời gian: 08h30, ngày 10/02/2025 (thứ
                Hai) 🏡 Địa điểm: Hội trường Bộ chỉ huy quân sự tỉnh 👤 Số
                lượng: 20 bạn 👗 Trang phục: Áo dài truyền thống (không bắt buộc
                phải là áo dài Khoa Sư phạm) 🌟 Quyền lợi: Cộng điểm rèn luyện
                HK II năm học 2024 - 2025 📍Link đăng kí tham
                gia:https://docs.google.com/spreadsheets/d/15DH-WPfZIsN-OVkIAakg9HBGzP5gnWdoN1AvQjok6TY/edit?usp=drivesdk
                ☎️Để biết thêm thông tin vui lòng liên hệ Đ/c Võ Huỳnh Mai - Chủ
                nhiệm CLB Lễ tân - 0326062721 Trân trọng./.
            </p>
            <p
                className={cn("mt-2 text-xs text-muted-foreground", {
                    "text-white": isSelf,
                })}
            >
                {moment(new Date()).format("hh:mm")}
            </p>
        </div>
    );
};

export default MessageContent;
