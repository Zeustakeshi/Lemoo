import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { updateCustomer } from "@/store/customer/customerSclice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { customerInfo } from "@/lib/customerInfo";

// Định nghĩa schema mới khớp với định dạng mong muốn
const addressSchema = z.object({
  recipientName: z.string().min(1, "Tên người nhận không được để trống"),
  recipientPhone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.object({
    province: z.object({
      code: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
      name: z.string(),
    }),
    district: z.object({
      code: z.string().min(1, "Quận/Huyện không được để trống"),
      name: z.string(),
    }),
    ward: z.object({
      code: z.string().min(1, "Phường/Xã không được để trống"),
      name: z.string(),
    }),
    detail: z.string().min(1, "Chi tiết địa chỉ không được để trống"),
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
    control,
    formState: { errors },
    setValue,
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: {
        province: { code: "", name: "" },
        district: { code: "", name: "" },
        ward: { code: "", name: "" },
      },
    },
  });

  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>(
    []
  );
  const [districts, setDistricts] = useState<{ code: string; name: string }[]>(
    []
  );
  const [wards, setWards] = useState<{ code: string; name: string }[]>([]);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await api.get("/shipping/provinces");
        console.log(response);
        setProvinces(response); // Giả định response.data là [{ code, name }, ...]
      } catch (error) {
        toast.error("Không thể tải danh sách tỉnh/thành phố");
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts based on selected province
  const fetchDistricts = async (provinceCode: string) => {
    try {
      const response = await api.get("/shipping/districts", {
        params: { provinceCode }, // Sử dụng params thay vì body cho GET request
      });
      setDistricts(response); // Giả định response.data là [{ code, name }, ...]
      setWards([]); // Reset wards
      setValue("address.district", { code: "", name: "" }); // Reset district
      setValue("address.ward", { code: "", name: "" }); // Reset ward
    } catch (error) {
      toast.error("Không thể tải danh sách quận/huyện");
    }
  };

  // Fetch wards based on selected district
  const fetchWards = async (districtCode: string) => {
    try {
      const response = await api.get("/shipping/wards", {
        params: { districtCode }, // Sử dụng params thay vì body cho GET request
      });
      setWards(response); // Giả định response.data là [{ code, name }, ...]
      setValue("address.ward", { code: "", name: "" }); // Reset ward
    } catch (error) {
      toast.error("Không thể tải danh sách phường/xã");
    }
  };

  const onSubmit = async (data: AddressFormInputs) => {
    try {
      await api.post("/shipping/my-address", data);
      console.log("Dữ liệu đăng ký địa chỉ:", data);
      const customerAdress = await customerInfo();
      dispatch(updateCustomer(customerAdress));
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
          <Label>Tên Người Nhận</Label>
          <Input
            {...register("recipientName")}
            placeholder="Nhập tên người nhận"
          />
          {errors.recipientName && (
            <p className="text-red-500 text-sm">
              {errors.recipientName.message}
            </p>
          )}
        </div>

        <div>
          <Label>Số Điện Thoại</Label>
          <Input
            {...register("recipientPhone")}
            placeholder="Nhập số điện thoại"
          />
          {errors.recipientPhone && (
            <p className="text-red-500 text-sm">
              {errors.recipientPhone.message}
            </p>
          )}
        </div>

        <div>
          <Label>Tỉnh/Thành phố</Label>
          <Controller
            name="address.province"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  const selectedProvince = provinces.find(
                    (p) => p.code === value
                  );
                  field.onChange({
                    code: value,
                    name: selectedProvince?.name || "",
                  });
                  fetchDistricts(value);
                }}
                value={field.value.code}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {provinces?.map((province) => (
                    <SelectItem key={province.code} value={province.code}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.address?.province?.code && (
            <p className="text-red-500 text-sm">
              {errors.address.province.code.message}
            </p>
          )}
        </div>

        <div>
          <Label>Quận/Huyện</Label>
          <Controller
            name="address.district"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  const selectedDistrict = districts.find(
                    (d) => d.code === value
                  );
                  field.onChange({
                    code: value,
                    name: selectedDistrict?.name || "",
                  });
                  fetchWards(value);
                }}
                value={field.value.code}
                disabled={!districts.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.code} value={district.code}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.address?.district?.code && (
            <p className="text-red-500 text-sm">
              {errors.address.district.code.message}
            </p>
          )}
        </div>

        <div>
          <Label>Phường/Xã</Label>
          <Controller
            name="address.ward"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  const selectedWard = wards.find((w) => w.code === value);
                  field.onChange({
                    code: value,
                    name: selectedWard?.name || "",
                  });
                }}
                value={field.value.code}
                disabled={!wards.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phường/xã" />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem key={ward.code} value={ward.code}>
                      {ward.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.address?.ward?.code && (
            <p className="text-red-500 text-sm">
              {errors.address.ward.code.message}
            </p>
          )}
        </div>

        <div>
          <Label>Chi Tiết Địa Chỉ</Label>
          <Input
            {...register("address.detail")}
            placeholder="Nhập chi tiết địa chỉ"
          />
          {errors.address?.detail && (
            <p className="text-red-500 text-sm">
              {errors.address.detail.message}
            </p>
          )}
        </div>

        <div>
          <Label>Loại Địa Chỉ</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại địa chỉ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RESIDENTIAL">Nhà Ở</SelectItem>
                  <SelectItem value="COMPANY">Công Ty</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Gửi
        </Button>
      </form>
    </div>
  );
};

export default AddressCustomer;
