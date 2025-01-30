import { useState } from "react";
import InputField from "../../InputField/InputFeild";

const DiscountMoneyValue = () => {
  const [buget, setBuget] = useState(false);
  const handleBugetLimit = () => setBuget(true);
  const handleBugetNotLimit = () => setBuget(false);

  return (
    <div className=" w-full sm:w-11/12 lg:w-11/12 flex flex-col space-y-5 p-5">
      {/* Giá trị đơn hàng được áp dụng */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <InputField
            name="minimumOrderValue"
            label="Nếu giá trị đơn hàng đạt tới"
            sx={{
              fontSize: "15px",
              maxWidth: "20rem",
              "& .MuiInputBase-input": {
                fontSize: "15px",
                padding: "10px",
              },
            }}
          />
          <InputField
            name="discountValue"
            label="Giảm giá"
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
      </div>
      {/* Số lượt sử dụng */}
      <div className="flex flex-col space-y-3">
        <InputField
          name="totalAvailable"
          label="Số lượt sử dụng cho mỗi khách"
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
      {/* Ngân sách giảm giá*/}
      <div className="flex flex-col space-y-3">
        <label className="font-semibold text-gray-700 ml-2">
          Ngân sách giảm giá
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              onClick={handleBugetLimit}
              type="radio"
              name="choice"
              value="true"
              className="peer "
            />
            <div className="  text-gray-700  transition">
              Ngân sách giới hạn
              <span className="m-2 px-3 py-1 rounded-lg bg-green-200 text-green-700 text-sm">
                Gợi ý
              </span>
            </div>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              onClick={handleBugetNotLimit}
              type="radio"
              name="choice"
              value="false"
              className="peer "
            />
            <div className=" text-gray-700  transition">
              Ngân sách không giới hạn
            </div>
          </label>
        </div>
        {buget && (
          <div className="p-5">
            <InputField
              name="budget"
              label="Ngân sách voucher"
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
        )}
      </div>
    </div>
  );
};

export default DiscountMoneyValue;
