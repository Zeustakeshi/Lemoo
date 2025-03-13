import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { updateCustomer } from "@/store/customer/customerSclice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const addressSchema = z.object({
  recipientName: z.string().min(1, "Tên người nhận không được để trống"),
  recipientPhone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.object({
    province: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
    district: z.string().min(1, "Quận/Huyện không được để trống"),
    ward: z.string().min(1, "Phường/Xã không được để trống"),
    detail: z.string().min(1, "Chi tiết địa chỉ không được để trống"),
    fullAddress: z.string().optional(),
  }),
  type: z.enum(["RESIDENTIAL", "COMPANY"]),
});
type AddressFormInputs = z.infer<typeof addressSchema>;

const AddressCustomer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressFormInputs) => {
    try {
      const response = await api.post("/shipping/my-address", data);
      dispatch(updateCustomer(response));
      navigation({ to: "/order" });
      toast.success("Đã thêm địa chỉ thành công");
    } catch (error) {
      console.error("Error submitting address:", error);
      toast.error("Có lỗi xảy ra khi thêm địa chỉ");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Nhập Thông Tin Địa Chỉ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên Người Nhận</label>
          <input
            {...register("recipientName")}
            className="w-full p-2 border rounded"
          />
          {errors.recipientName && (
            <p className="text-red-500 text-sm">
              {errors.recipientName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Số Điện Thoại</label>
          <input
            {...register("recipientPhone")}
            className="w-full p-2 border rounded"
          />
          {errors.recipientPhone && (
            <p className="text-red-500 text-sm">
              {errors.recipientPhone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Tỉnh/Thành phố</label>
          <input
            {...register("address.province")}
            className="w-full p-2 border rounded"
          />
          {errors.address?.province && (
            <p className="text-red-500 text-sm">
              {errors.address.province.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Quận/Huyện</label>
          <input
            {...register("address.district")}
            className="w-full p-2 border rounded"
          />
          {errors.address?.district && (
            <p className="text-red-500 text-sm">
              {errors.address.district.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Phường/Xã</label>
          <input
            {...register("address.ward")}
            className="w-full p-2 border rounded"
          />
          {errors.address?.ward && (
            <p className="text-red-500 text-sm">
              {errors.address.ward.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Chi Tiết Địa Chỉ</label>
          <input
            {...register("address.detail")}
            className="w-full p-2 border rounded"
          />
          {errors.address?.detail && (
            <p className="text-red-500 text-sm">
              {errors.address.detail.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Loại Địa Chỉ</label>
          <select {...register("type")} className="w-full p-2 border rounded">
            <option value="RESIDENTIAL">Nhà Ở</option>
            <option value="COMPANY">Công Ty</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default AddressCustomer;
