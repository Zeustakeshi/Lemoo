import React from 'react';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface TitleTextProps {
  title: string;  // Prop để truyền tiêu đề chính
  subtitle?: string;  // Prop tùy chọn để truyền subtitle
}
const TitleText: React.FC<TitleTextProps> = ({ title, subtitle }) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <p className='text-red-700 text-[17px]'>*</p>
        <p className="text-[15px] font-bold">{title}</p>
        <HelpOutlineIcon style={{ color: 'gray' }} />
      </div>
      {subtitle && (
        <div className="mt-1">
          <p className="text-[14px] text-gray-500">{subtitle}</p>
        </div>
      )}
    </div>
  );
}
export default TitleText;
