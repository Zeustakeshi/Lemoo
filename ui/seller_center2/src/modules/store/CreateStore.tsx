import React from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RadioButtons from "./FormRadio";
import TitleText from "./TitleText";
import FormInputImg from "./FormInputImg";
import FormInputText from "./FormInputText";
import FomrInputText from "./FormInputText";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormField ={
  name: string,
  phone : string
}
const CreateStore: React.FC = () => {
 
const methods = useForm<FormField>();


const onSubmit : SubmitHandler<FormField> =(data) =>{
  console.log(data);
}

  return (
    <FormProvider {...methods} >
    <form onSubmit={methods.handleSubmit(onSubmit)}>
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">
        Xác minh Thông tin Chủ gian hàng để nhận Thanh Toán!
      </h1>
      <div className="text-green-600">
        <VerifiedUserIcon />
        <span>Thông tin tài khoản của bạn được bảo mật</span>
      </div>
      <div className="w-full h-32 bg-white rounded-xl p-2 ">
        <TitleText title="Chọn loại" />
        <RadioButtons options={["a", "b"]} /> {/* Truyền mảng giá trị vào */}
      </div>

      <div className="w-full h-full bg-white rounded-xl p-2">
        <h1 className="text-xl font-bold">Xác nhận thông tin cá nhân</h1>
        <div className="flex items-center">
          <TitleText title="loại giấy tờ" />
        </div>
        <RadioButtons options={["chứng minh nhân dân", "hộ chiếu"]} />

        <div>
          <TitleText
            title="Tải lên mặt trước CCCD"
            subtitle="Kích thước giữa 330x330 và 5000x5000 px，Kích thước hình ảnh nhỏ hơn 10M."
          />
        </div>

        <FormInputImg text1="Tải lên mặt trước CCCD" text2="Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF." text3="Vui lòng chuẩn bị giấy tờ tùy thân rõ ràng (hô chiếu nếu là người nước ngoài) với thông tin Họ và Tên, Ngày sinh và Ngày hết hạn rõ ràng, không có vật gì che khuất." />
      
        <p className="text-xl font-bold">Thông tin ID</p>
        <TitleText title="Tên trên CCCD hoặc hộ chiếu"/>
        <FormInputText name="name" placeholder="Nhập giống hệt ảnh đã tải lên"/>
       
        <TitleText title="Số chứng minh nhân dân/số hộ chiếu"/>
        <FormInputText name="phone" placeholder="079xxxxxxxxxx00"/>

      </div>

      <div className="w-full h-full bg-white rounded-xl p-2">
          <p className="text-xl font-bold">Chứng từ ngân hàng</p>
          <TitleText title="Tải lên thông tin Ngân Hàng" subtitle="Kích thước giữa 330x330 và 5000x5000 px，Kích thước hình ảnh nhỏ hơn 10M."/>
          <FormInputImg text1="Tải lên thông tin Ngân Hàng" text2="Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF." text3="Vui lòng tải lên ảnh thông tin tài khoản Ngân hàng của bạn với Tên tài khoản ngân hàng, Số tài khoản ngân hàng, Tên ngân hàng rõ ràng, không bị che khuất thông tin được liệt kê ở trên. Hãy đảm bảo rằng tên tài khoản ngân hàng của bạn giống với tên trên CCCD của bạn (Tên công ty trong trường hợp người bán là công ty)." />
       
        <p>Thông tin ngân hàng</p>
        <TitleText title="Chủ tài khoản (Tiếng Việt KHÔNG DẤU)" />
        {/* <FomrInputText  placeholder="Vui lòng điển tiếng Việt không dấu" /> */}
      
        <TitleText title="Số tài khoản" />
        {/* <FomrInputText placeholder="VD: 0123456789" /> */}

        <TitleText title="Ngân hàng" />
        {/* <FomrInputText placeholder="VD: 0123456789" /> */}
      </div>
    </div>


    <button type="submit">Submit</button>
    </form>
    </FormProvider >
  );
};


export default CreateStore;
