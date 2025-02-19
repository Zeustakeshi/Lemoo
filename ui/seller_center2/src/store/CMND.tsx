import InputText from "../store/InputText";
import InputFile from "../store/InputFile";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import TextTile from "./TextTile";

type PersonalDetailsProps = {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>; // Sửa lỗi ở đây
};

const text = [
  "Tải lên mặt trước CCCD",
  "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
  "Vui lòng chuẩn bị giấy tờ tùy thân rõ ràng (hô chiếu nếu là người nước ngoài) với thông tin Họ và Tên, Ngày sinh và Ngày hết hạn rõ ràng, không có vật gì che khuất.",
];

const CMND = ({ register, setValue,errors }: PersonalDetailsProps) => {
  return (
    <div>
      <TextTile
        nameTitle="Tải lên mặt trước CCCD"
        subTitle="Kích thước giữa 330x330 và 5000x5000 px，Kích thước hình ảnh nhỏ hơn 10M."
      />
      <InputFile
        key="avatar" // Thêm key duy nhất
        label="Avatar"
        name="identityCardFrontSide"
        register={register}
        setValue={setValue}
        errors={errors}
        textarray={text}
      />
      <TextTile nameTitle="Tải lên mặt sau của CCCD" subTitle="Kích thước giữa 330x330 và 5000x5000 px，Kích thước hình ảnh nhỏ hơn 10M." />
      <InputFile
        key="identityCardBackSide" // Thêm key duy nhất
        label="Identity Card (Back Side)"
        name="identityCardBackSide"
        register={register}
        setValue={setValue}
        errors={errors}
        textarray={text}
      />
      <p className="text-[20px] font-bold font-sans">Thông Tin ID</p>
      <TextTile nameTitle="Tên trên CCCD hoặc hộ chiếu" />
      <InputText label="name" name="identityCardName" register={register} errors={errors}/>
      <TextTile nameTitle="Số chứng minh nhân dân/số hộ chiếu" />
      <InputText label="number" name="identityCardNumber" register={register} errors={errors} />


  
    </div>
  );
};

export default CMND;
