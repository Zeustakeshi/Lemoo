
import TextTile from './TextTile'
import InputText from './InputText'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputFile from './InputFile';


type DetailValue={
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    errors: FieldErrors<any>; // Sửa lỗi ở đây
}

const text = [
    "Tải lên mặt trước CCCD",
    "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
    "Vui lòng chuẩn bị giấy tờ tùy thân rõ ràng (hô chiếu nếu là người nước ngoài) với thông tin Họ và Tên, Ngày sinh và Ngày hết hạn rõ ràng, không có vật gì che khuất.",
  ];

const TaxIdentificationNumber = ({register,setValue, errors}: DetailValue) => {
  return (
    <div className='flex flex-col bg-white p-4 rounded-xl' >
      <p className='text-[20px] font-bold' >Tax Identification Number (TIN)</p>
      <TextTile nameTitle='Mã số thuế (thiếc)' />
      <InputText label="number" name="TIN" register={register} errors={errors} />
      <TextTile nameTitle='Giấy đăng ký mã số thuế' subTitle='Giấy đăng ký mã số thuế' />
      <InputFile
        key="taxRegistrationDocument" // Thêm key duy nhất
        label="taxRegistrationDocument"
        name="taxRegistrationDocument"
        register={register}
        setValue={setValue}
        errors={errors}
        textarray={text}
      />
    </div>
  )
}

export default TaxIdentificationNumber
