import InputField from "../../InputField/InputFeild";

const DiscountPercentage = () => {
  return (
    <div className=" w-full sm:w-11/12 lg:w-11/12 flex flex-col space-y-8 p-5">
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
      {/* Giá trị tối đa cho mỗi đơn hàng */}
      <div className="flex flex-col space-y-3">
        <InputField
          name="maximumDiscountValue"
          label="Giá trị tối đa cho mỗi đơn hàng"
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
      {/* Số lượng mã giảm giá && Số lượt sử dụng cho mỗi khách */}
      <div>
        <div className="flex items-center space-x-4">
          <InputField
            name="totalAvailable"
            label="Số lượng mã giảm giá"
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
            name="limit"
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
      </div>
    </div>
  );
};

export default DiscountPercentage;
