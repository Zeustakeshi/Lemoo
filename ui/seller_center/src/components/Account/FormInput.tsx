// FormInput.tsx
import React, { forwardRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

type Props = {
  size?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Nhận onChange từ prop
} & React.ComponentPropsWithoutRef<"input">;

const FormInput = forwardRef<HTMLInputElement, Props>(({ size = 100, onChange, ...props }, ref) => {
  const [img, setImg] = useState<File | null>(null);

  // Sử dụng prop onChange
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImg(file);

    if (onChange) {
      onChange(e); // Gọi onChange từ prop
    }
  };

  const handleDelete = () => {
    setImg(null);
  
    // Tạo sự kiện giả lập
    if (onChange) {
      const syntheticEvent = {
        target: { value: null, files: null },
        type: "change",
      } as unknown as React.ChangeEvent<HTMLInputElement>; // Ép kiểu sang `unknown` trước khi ép sang `ChangeEvent`
  
      // Gọi onChange với sự kiện giả lập
      onChange(syntheticEvent);
    }
  };
  

  return (
    <div className="flex bg-white relative flex-col justify-center items-center rounded-xl" style={{ width: size, height: size }}>
      {img && (
        <div className="w-full h-full absolute inset-0 bg-white flex flex-col justify-center items-center z-20">
          <div className="w-[60%] h-[50%] flex justify-center items-center">
            <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-9 flex justify-between items-center border-2 opacity-0 hover:opacity-100 hover:bg-slate-500">
            <div className="w-[50%] hover:text-white flex justify-center items-center" onClick={handleDelete}>
              <DeleteIcon style={{ fontSize: "30px" }} />
            </div>
            <div className="w-[50%] hover:text-white flex justify-center items-center">
              <FileDownloadIcon style={{ fontSize: "30px" }} />
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        className="absolute inset-0 z-10 opacity-0"
        ref={ref}
        {...props}
        onChange={handleImg} // Gọi hàm handleImg
      />

      {!img && <AddIcon className="text-gray-500" style={{ fontSize: "50px" }} />}
      {size > 100 && !img && (
        <p className="text-xs text-center">Kéo hoặc Nhấn Vào Đây để Tải Lên</p>
      )}
    </div>
  );
});

export default FormInput;
