import { Controller, FormProvider, useForm } from "react-hook-form";
import { VoucherRegular } from "../../../type/Voucher/VoucherRegular";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputField from "../InputField/InputFeild";
import DatePickerField from "../DatePicker/DatePickerField";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import DiscountMoneyValue from "./Discount/DiscountMoneyValue";
import DiscountPercentage from "./Discount/DiscountPercentage";
import { useState } from "react";
import axiosInstance from "../../Axios/axiosConfig";

const RegularVoucher = () => {
  const [voucherPercent, setVoucherPercent] = useState(false);

  const handleVoucherPercent = () => {
    setVoucherPercent(true);
  };
  const handleVoucherNotPercent = () => {
    setVoucherPercent(false);
  };
  const methods = useForm<VoucherRegular>({
    defaultValues: {
      name: "",
      periodStartTime: "",
      periodEndTime: "",
      collectStartTime: "",
      discountType: "MONEY_VALUE",
      discountValue: 0,
      minimumOrderValue: 0,
      maximumDiscountValue: 0,
      totalAvailable: 0,
      budget: 0,
      scope: "ENTIRE_STORE",
      limit: 0,
    },
  });
  const onSubmit = async (data: VoucherRegular) => {
    try {
      const res = await axiosInstance.post("/promotion/vouchers/regular", data);
      console.log("Voucher created successfully:", res.data);
    } catch (error) {
      console.error("Error creating voucher:", error);
      alert("Đã xảy ra lỗi khi tạo mã giảm giá, vui lòng thử lại!");
    }
  };
  return (
    <div>
      <FormProvider {...methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <div className="border bg-slate-100 rounded-lg min-h-[200px]  w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
                <div className="m-2">
                  <h2 className="font-medium text-xl ">Tạo Mã Giảm Giá</h2>
                </div>
                <div className="flex flex-col space-y-3">
                  <label
                    className="font-semibold text-gray-700 ml-2"
                    htmlFor="name"
                  >
                    Tên khuyến mãi
                  </label>
                  <InputField
                    name="name"
                    label="Mã giảm giá"
                    sx={{
                      fontSize: "15px",
                      maxWidth: "20rem",
                      "& .MuiInputBase-input": {
                        fontSize: "15px",
                        padding: "10px",
                      },
                    }}
                  />
                </div>
                {/* Thời gian khuyến mãi */}
                <div className="flex flex-col space-y-3">
                  <label
                    className="font-semibold text-gray-700 ml-2"
                    htmlFor="name"
                  >
                    Thời gian quy đổi
                  </label>
                  <div className="flex space-x-4">
                    <DatePickerField
                      name="periodStartTime"
                      label="Thời gian bắt đầu"
                      textFieldProps={{
                        sx: {
                          fontSize: "15px",
                          maxWidth: "20rem",
                          "& .MuiInputBase-input": {
                            fontSize: "15px",
                            padding: "10px",
                          },
                        },
                      }}
                    />
                    <DatePickerField
                      name="periodEndTime"
                      label="Thời gian kết thúc"
                      textFieldProps={{
                        sx: {
                          fontSize: "15px",
                          maxWidth: "20rem",
                          "& .MuiInputBase-input": {
                            fontSize: "15px",
                            padding: "10px",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                {/* Thời gian sưu tầm */}
                <div className="flex flex-col space-y-3">
                  <label
                    className="font-semibold text-gray-700 ml-2"
                    htmlFor="name"
                  >
                    Thời gian bắt đầu sưu tầm (Tùy chọn)
                  </label>
                  <DatePickerField
                    name="collectStartTime"
                    label="Chọn ngày và thời gian"
                    textFieldProps={{
                      sx: {
                        fontSize: "15px",
                        maxWidth: "20rem",
                        "& .MuiInputBase-input": {
                          fontSize: "15px",
                          padding: "10px",
                        },
                      },
                    }}
                  />
                </div>
                {/* Phạm vi áp dụng */}
                <div className="flex flex-col space-y-3">
                  <label
                    className="font-semibold text-gray-700 ml-2"
                    htmlFor="scope"
                  >
                    Mã giảm giá áp dụng cho
                  </label>
                  <Controller
                    name="scope"
                    control={methods.control}
                    defaultValue="ENTIRE_STORE" // Giá trị mặc định (cần thiết)
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="ENTIRE_STORE"
                          control={<Radio />}
                          label="Toàn gian hàng"
                        />
                        <FormControlLabel
                          value="SPECIFIC_PRODUCT"
                          control={<Radio />}
                          label="Sản phẩm được chọn (danh sách sản phẩm sẽ được cập nhật sau khi thiết lập điều kiện giảm giá)"
                        />
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>
              <div className="border bg-slate-100 rounded-lg p-5 w-full sm:w-11/12 lg:w-11/12 mx-auto  ">
                <div>
                  <h2 className="font-medium text-xl ">Thiết Lập Khuyến Mãi</h2>
                </div>
                {/* Thiết Lập Khuyến Mãi */}
                <div className="flex space-x-4 m-2">
                  <div className="flex flex-col ">
                    <h2 className="p-4"> Mã giảm giá cố định</h2>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        {...methods.register("discountType")}
                        onClick={handleVoucherNotPercent}
                        type="radio"
                        name="choice"
                        value="MONEY_VALUE"
                        className="peer hidden"
                      />
                      <div className="border text-gray-800 border-gray-300 rounded-md bg-white  peer-checked:border-blue-500 peer-checked:text-red-500 transition">
                        <div className="flex flex-col px-14 py-10 ">
                          <span>Số Tiền</span>
                          <span>Đơn tối thiểu</span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="p-4"> Giảm giá theo phần trăm</h2>
                    <label className="flex items-center space-x-2 cursor-pointer ">
                      <input
                        {...methods.register("discountType")}
                        onClick={handleVoucherPercent}
                        type="radio"
                        name="choice"
                        value="PERCENTAGE"
                        className="peer hidden"
                      />
                      <div className="border text-gray-800 border-gray-300 rounded-md bg-white  peer-checked:border-blue-500 peer-checked:text-red-500 transition">
                        <div className="flex flex-col px-14 py-10 ">
                          <span>Số Tiền</span>
                          <span>Đơn tối thiểu</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                {voucherPercent ? (
                  <DiscountPercentage />
                ) : (
                  <DiscountMoneyValue />
                )}
              </div>

              <div className="border bg-slate-100 rounded-lg p-5 w-full sm:w-11/12 lg:w-11/12 mx-auto flex items-center justify-center  ">
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Gửi
                </button>
              </div>
            </div>
          </form>
        </LocalizationProvider>
      </FormProvider>
    </div>
  );
};

export default RegularVoucher;
