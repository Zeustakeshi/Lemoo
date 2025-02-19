import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import TextTile from "./TextTile";
import InputFile from "./InputFile";
import InputText from "./InputText";

type DetailProp = {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
};

const text = [
  "Tải lên mặt trước CCCD",
  "Giấy tờ đính kèm phải có đủ các mặt, theo định dạng PNG, JPEG, PDF.",
  "Vui lòng chuẩn bị giấy tờ tùy thân rõ ràng (hộ chiếu nếu là người nước ngoài) với thông tin Họ và Tên, Ngày sinh và Ngày hết hạn rõ ràng, không có vật gì che khuất.",
];

const Bank = ({ register, setValue, errors }: DetailProp) => {
  const [banks, setBanks] = useState<{ name: string; code: string; bin: string }[]>([]);
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("https://api.vietqr.io/v2/banks");
        if (!response.ok) throw new Error("Failed to fetch banks");

        const data = await response.json();
        setBanks(data?.data || []); // Giả sử API trả về object có property data chứa array
      } catch (error) {
        console.error("Lỗi dữ liệu khi lấy từ ngân hàng:", error);
        setBanks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  const handleSelectBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBank = banks.find((bank) => bank.name === e.target.value);
    if (selectedBank) {
      setValue("bankName", selectedBank.name);
      setValue("bankCode", selectedBank.code);
      setValue("bankBin", selectedBank.bin);
    }
    setBankName(e.target.value);
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-xl">
      <p className="text-[20px] font-bold font-sans">Chứng từ ngân hàng</p>
      <TextTile nameTitle="Tải lên thông tin Ngân Hàng" subTitle="Kích thước giữa 330x330 và 5000x5000 px，Kích thước hình ảnh nhỏ hơn 10M." />
      <InputFile key="bankDocument" label="bankDocument" name="bankDocument" register={register} setValue={setValue} errors={errors} textarray={text} />

      <p className="text-[20px] font-bold font-sans">Thông Tin ngân hàng</p>
      <TextTile nameTitle="Chủ tài khoản (Tiếng Việt KHÔNG DẤU)" />
      <InputText label="Vui lòng điền tiếng Việt không dấu" name="bankAccountName" register={register} errors={errors} />
      <TextTile nameTitle="Số tài khoản" />
      <InputText label="VD: 0123456789" name="bankAccountNumber" register={register} errors={errors} />
      <TextTile nameTitle="Ngân hàng" />
      <input
        type="text"
        list="bank-list"
        value={bankName}
        onChange={handleSelectBank}
        className="w-96 p-2 border border-gray-300 rounded-md"
      />
      {loading ? (
        <p>Đang tải danh sách ngân hàng...</p>
      ) : (
        <datalist id="bank-list">
          {banks.map((bank) => (
            <option key={bank.code} value={bank.name} />
          ))}
        </datalist>
      )}
    </div>
  );
};

export default Bank;
