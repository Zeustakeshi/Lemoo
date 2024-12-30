import { Add } from "@mui/icons-material";
import { useState } from "react";

type FileInputProps = {
  onFileUpload: (file: File[]) => void;
  maxFiles?: number;
};

export const FileInput: React.FC<FileInputProps> = ({
  onFileUpload,
  maxFiles = 8,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const totalFiles = files.length + selectedFiles.length;
    // Kiểm tra giới hạn số file
    if (totalFiles > maxFiles) {
      alert(`Bạn chỉ được tải lên tối đa ${maxFiles} ảnh.`);
      return;
    }
    // Cập nhật danh sách file và preview
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    setPreviews(newFiles.map((file) => URL.createObjectURL(file)));

    // Truyền danh sách file lên parent
    onFileUpload(newFiles);
  };
  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
    onFileUpload(newFiles);
  };
  return (
    <div className="flex space-x-4">
      {/* Nút chọn file */}
      <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400">
        <span>
          <Add className="text-gray-500 hover:text-blue-400" />
        </span>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Hiển thị preview ảnh */}
      <div className="grid grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-lg border"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center "
              onClick={() => removeFile(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Thông báo số lượng file */}
      <p className="text-gray-500 text-sm">
        Đã chọn {files.length}/{maxFiles} ảnh
      </p>
    </div>
  );
};
