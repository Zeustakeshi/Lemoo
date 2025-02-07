import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import img from "../../assets/images/raiden7.jpg";
import FormInfo from "./FormInfo";
import FormInput from "./FormInput";
interface FormatConfirmInfoProps {
    option: number; // Định nghĩa kiểu dữ liệu cho props
}

interface ChiNhanh {
    id: number;
    name: string;
}
const ChiNhanh: ChiNhanh[] = [
    { id: 1, name: "Hà nội" },
    { id: 2, name: "Sài gòn" },
];
interface NganHang {
    id: number;
    name: string;
    bin?: string;
    code: string;
}

const info = [
    //option 1
    {
        text1: "Tải lên mặt trước CCCD",
        text2: "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
        text3: "Vui lòng chuẩn bị giấy tờ tùy thân rõ ràng (hô chiếu nếu là người nước ngoài) với thông tin Họ và Tên, Ngày sinh và Ngày hết hạn rõ ràng, không có vật gì che khuất.",
        img: img,
    },
    {
        text1: "Tải lên mặt sau CCCD",
        text2: "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
        text3: "Vui lòng chuẩn bị giấy tờ tùy thân rõ ràng (hô chiếu nếu là người nước ngoài) với thông tin Họ và Tên, Ngày sinh và Ngày hết hạn rõ ràng, không có vật gì che khuất.",
        img: img,
    },
    {
        text1: "Giấy đăng ký mã số thuế",
        text2: "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
        text3: "1.Vui lòng nhập số CCCD đăng ký gian hàng theo đường link  https://tracuunnt.gdt.gov.vn/tcnnt/mstdn.jsp để tra cứu MST cá nhân/ hộ kinh doanh/doanh nghiệp. Sau đó vui lòng nhập MST vào ô *Mã số thuế(Lưu ý: Thông tin đăng ký MST ( Tên người nộp thuế, số CMT/Thẻ căn cưới) phải trùng khớp với thông tin đã đăng ký gian hàng)2. Chụp hình ảnh trang tra cứu thông tin người nộp thuế thể hiện đầy đủ thông tin CCCD cùng Thông tin kết quả chi tiết và tải lên ( Xem hình minh họa)",
        img: img,
    },
    {
        text1: "Tải lên thông tin Ngân Hàng",
        text2: "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
        text3: "Vui lòng tải lên ảnh thông tin tài khoản Ngân hàng của bạn với Tên tài khoản ngân hàng, Số tài khoản ngân hàng, Tên ngân hàng rõ ràng, không bị che khuất thông tin được liệt kê ở trên. Hãy đảm bảo rằng tên tài khoản ngân hàng của bạn giống với tên trên CCCD của bạn (Tên công ty trong trường hợp người bán là công ty).",
        img: img,
    },

    // option 2
    {
        text1: "Giấy chứng nhận đăng ký kinh doanh Tải lên",
        text2: "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
        text3: `Hãy đảm bảo rằng Giấy phép kinh doanh của bạn rõ ràng và không bị che khuất
  Thông tin chính được bao gồm trong tải lên:
  1) Tên pháp lý của công ty,
  2) Số đăng ký kinh doanh,
  3) Tên người đại diện theo pháp luật`,
        img: img,
    },
];

function FortmatConfirmInfo({ option }: FormatConfirmInfoProps) {
    const [typeSubTitile, setTypeSubTitle] = useState(0);
    const [listSearchChiNhanh, setListSearchChiNhanh] = useState<ChiNhanh[]>(
        []
    );

    const [NganHang, setNganHang] = useState<NganHang[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get("https://api.vietqr.io/v2/banks");
            console.log(data);
            setNganHang(data.data.data);
        };
        fetchData();
    }, []);

    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            // Cập nhật giá trị của trường với tệp hợp lệ
            setValue("identityCardFrontSide", file);
        } else {
            // Nếu không có tệp, có thể set giá trị mặc định là null
            setValue("identityCardFrontSide", null);
        }

        // Làm gì đó với file nếu cần
        console.log(file);
    };

    const formData = watch("identityCardFrontSide");

    React.useEffect(() => {
        console.log("Form data updated:=>>>>>>>", formData); // Log dữ liệu mỗi khi có sự thay đổi
    }, [formData]); // Sẽ chạy khi formData thay đổi

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-xl">
                <p className="font-bold text-[20px]">Nhập tên cửa hàng</p>
                <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Nhập tên cửa hàng"
                    className="w-[500px] p-2  border-2 border-gray-400 rounded-xl"
                />
                {errors.name?.message && (
                    <span className="text-red-600">
                        {String(errors.name.message)}
                    </span>
                )}
            </div>

            {option == 0 ? (
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-xl ">
                        <p className="font-bold text-[20px]">
                            Xác nhận thông tin cá nhân
                        </p>
                        <p className="text-gray-400">Loại giấy tờ </p>

                        {/* Loại giấy tờ */}
                        <div className="flex gap-1 items-center ">
                            <input
                                type="radio"
                                value={0}
                                checked={typeSubTitile == 0}
                                onChange={() => setTypeSubTitle(0)}
                                className=" h-5 w-5 accent-blue-500 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">
                                Chứng minh nhân dân
                            </span>
                            <input
                                type="radio"
                                value={1}
                                checked={typeSubTitile == 1}
                                onChange={() => setTypeSubTitle(1)}
                                className=" h-5 w-5 accent-blue-500 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">Hộ chiếu</span>
                        </div>
                        {/* Nội dung mỗi loại */}
                        <div className="flex flex-col gap-4  ">
                            {/* tải mặt trước cuả căn cước  */}
                            <div className="flex flex-col gap-1">
                                <p>Tải lên mặt trước CCCD</p>
                                <p className="text-gray-400">
                                    Kích thước giữa 330x330 và 5000x5000
                                    px，Kích thước hình ảnh nhỏ hơn 10M.
                                </p>
                            </div>
                            {typeSubTitile == 0 ? (
                                <>
                                    <FormInfo info={info[0]}>
                                        <FormInput
                                            {...register(
                                                "identityCardFrontSide",
                                                { required: true }
                                            )}
                                            onChange={handleImg}
                                        />
                                    </FormInfo>
                                    <div className="flex flex-col gap-1">
                                        <p>Tải lên mặt sau của CCCD</p>
                                        <p className="text-gray-400">
                                            Kích thước giữa 330x330 và 5000x5000
                                            px，Kích thước hình ảnh nhỏ hơn 10M.
                                        </p>
                                    </div>
                                    <FormInfo info={info[1]}>
                                        <FormInput
                                            {...register(
                                                "identityCardBackSide",
                                                { required: true }
                                            )}
                                            onChange={handleImg}
                                        />
                                    </FormInfo>
                                </>
                            ) : (
                                <>
                                    {/* <FormInfo info={info[0]}>
                    <FormInput
                      {...register("identityCardFrontSide", {
                        required: true,
                      })}
                      onChange={handleImg} // Đảm bảo truyền đúng hàm onChange
                    />
                  </FormInfo> */}
                                </>
                            )}
                            {/* tải mặt sau cuả căn cước  */}
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-bold">
                                    Thông Tin ID
                                </p>
                                <p className="mt-2">
                                    Tên trên CCCD hoặc hộ chiếu
                                </p>
                                <input
                                    {...register("identityCardName", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="Nhập giống hệt ảnh đã tải lên"
                                    className="w-[500px] p-2  border-2 border-gray-400 rounded-xl"
                                />
                                {errors.identityCardName?.message && (
                                    <span className="text-red-600">
                                        {String(
                                            errors.identityCardName.message
                                        )}
                                        Hãy nhập tên cccd
                                    </span>
                                )}
                                <p className="mt-2">
                                    Số chứng minh nhân dân/số hộ chiếu
                                </p>
                                <input
                                    {...register("identityCardNumber", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="xxxxxxxxxxx"
                                    className="w-[500px] p-2  border-2 border-gray-400 rounded-xl"
                                />
                                {errors.identityCardNumber && (
                                    <span className="text-red-600">
                                        {String(
                                            errors.identityCardNumber.message
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-xl ">
                            <p className="font-bold text-[20px]">
                                Thông tin kinh doanh
                            </p>
                            <p className="text-gray-400">
                                Hình thức kinh doanh
                            </p>
                            {/* Loại giấy tờ */}
                            <div className="flex gap-1 items-center ">
                                <input
                                    type="radio"
                                    value={0}
                                    checked={typeSubTitile == 0}
                                    onChange={() => setTypeSubTitle(0)}
                                    className=" h-5 w-5 accent-blue-500 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">Company</span>
                                <input
                                    type="radio"
                                    value={1}
                                    checked={typeSubTitile == 1}
                                    onChange={() => setTypeSubTitle(1)}
                                    className=" h-5 w-5 accent-blue-500 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">
                                    Business Household
                                </span>
                            </div>
                            {/* Nội dung mỗi loại */}
                            <div className="flex flex-col gap-4  ">
                                {/* tải mặt trước cuả căn cước  */}
                                <div className="flex flex-col gap-1">
                                    <p>
                                        Giấy chứng nhận đăng ký kinh doanh tải
                                        lên
                                    </p>
                                    <p className="text-gray-400">
                                        Kích thước giữa 330x330 và 5000x5000
                                        px，Kích thước hình ảnh nhỏ hơn 10M.
                                    </p>
                                </div>
                                {typeSubTitile == 0 ? (
                                    <>
                                        <FormInfo info={info[4]}>
                                            <FormInput
                                                {...register("bankDocument", {
                                                    required: true,
                                                })}
                                            />
                                        </FormInfo>
                                    </>
                                ) : (
                                    <>
                                        <FormInfo info={info[4]}>
                                            <FormInput
                                                {...register("bankDocument", {
                                                    required: true,
                                                })}
                                            />
                                        </FormInfo>
                                    </>
                                )}
                                {/* tải mặt sau cuả căn cước  */}
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl font-bold">
                                        Thông Tin ID
                                    </p>
                                    <p className="mt-2">
                                        Tên trên CCCD hoặc hộ chiếu
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Nhập giống hệt ảnh đã tải lên"
                                        className="w-[500px] p-2  border-2 border-gray-400 rounded-xl"
                                    />
                                    <p className="mt-2">
                                        Số chứng minh nhân dân/số hộ chiếu
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="xxxxxxxxxxx"
                                        className="w-[500px] p-2  border-2 border-gray-400 rounded-xl "
                                        {...register("identityCardNumber", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-xl  ">
                <p className="font-bold text-xl">
                    Tax Identification Number (TIN)
                </p>
                <div>
                    <p>Mã số thuế (thiếc) </p>
                    <input
                        {...register("TIN", { required: true })}
                        type="text"
                        placeholder="HãyHãy nhập 9 đến 15 ký tự"
                        className="w-[500px] p-2  border-2 border-gray-400 rounded-xl"
                    />
                    {errors.TIN && (
                        <p className="text-red-600">
                            {String(errors.TIN.message)}
                        </p>
                    )}
                </div>
                <div>
                    <p>Giấy đăng ký mã số thuế</p>
                    <p className="text-gray-400">
                        Kích thước giữa 330x330 và 5000x5000 px，Kích thước hình
                        ảnh nhỏ hơn 10M.
                    </p>
                </div>
                <FormInfo info={info[2]}>
                    <FormInput
                        {...register("taxRegistrationDocument", {
                            required: true,
                        })}
                    />
                </FormInfo>
            </div>
            <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-xl  ">
                <p className="font-bold text-xl">Chứng từ ngân hàng</p>
                <div>
                    <p>Giấy đăng ký mã số thuế</p>
                    <p className="text-gray-400">
                        Kích thước giữa 330x330 và 5000x5000 px，Kích thước hình
                        ảnh nhỏ hơn 10M.
                    </p>
                </div>

                <FormInfo info={info[3]}>
                    <FormInput
                        {...register("bankDocument", { required: true })}
                    />
                </FormInfo>
                <p className="font-bold text-xl">Chứng từ ngân hàng</p>
                <div>
                    <p className="mt-2">Chủ tài khoản (Tiếng Việt KHÔNG DẤU)</p>
                    <input
                        {...register("bankAccountName", { required: true })}
                        type="text"
                        placeholder="Vui lòng điền tiến Việt, Không dấu"
                        className="w-[500px] p-2  border-2 border-gray-400 rounded-xl"
                    />
                    {errors.bankAccountName?.message && (
                        <p className="text-red-500">
                            {String(errors.bankAccountName.message)}
                        </p>
                    )}
                </div>
                <div>
                    <p className="mt-2">Số tài khoản</p>
                    <input
                        {...register("bankAccountNumber", { required: true })}
                        type="text"
                        placeholder="VD: 0123456789"
                        className="w-[500px] p-2  border-2 border-gray-400 rounded-xl"
                    />
                    {errors.bankAccountNumber && (
                        <p className="text-red-500">
                            {String(errors.bankAccountNumber.message)}Nhập số
                            tài khoản{" "}
                        </p>
                    )}
                </div>

                {/* API Ngân hàng */}
                <div className="relative max-h-[100px]">
                    <FormControl className="w-[500px]">
                        <InputLabel variant="standard" htmlFor="bankName">
                            Ngân hàng
                        </InputLabel>
                        <NativeSelect
                            {...register("bankName", {
                                required: "Vui lòng chọn ngân hàng",
                                onChange: (e) => {
                                    // Lấy thông tin bổ sung từ `option` đã chọn
                                    const selectedOption = NganHang.find(
                                        (bank) => bank.name === e.target.value
                                    );
                                    if (selectedOption) {
                                        setValue("bankBin", selectedOption.bin); // Gán bin
                                        setValue(
                                            "bankCode",
                                            selectedOption.code
                                        ); // Gán code
                                    }
                                },
                            })}
                            defaultValue=""
                            inputProps={{
                                id: "bankName",
                            }}
                        >
                            <option value="" disabled></option>
                            {NganHang.map((bank) => (
                                <option key={bank.id} value={bank.name}>
                                    {bank.name}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>

                    {/* Hidden inputs để lưu bin và code */}
                    <input type="hidden" {...register("bankBin")} />
                    <input type="hidden" {...register("bankCode")} />
                </div>
                <div className="relative">
                    <p className="mt-2">Chi nhánh</p>
                    <input
                        type="text"
                        placeholder="xxxxxxxxxxx"
                        className="w-[500px] p-2  border-2 border-gray-400 rounded-xl "
                        {...register("bankBranch")}
                    />
                    {listSearchChiNhanh.length > 0 && (
                        <div className="w-[500px] bg-white flex flex-col absolute top-[-29%] left-0 border-2 border-black rounded-lg   ">
                            {listSearchChiNhanh.length > 0 ? (
                                listSearchChiNhanh.map((bank, index) => (
                                    <p
                                        key={index}
                                        className="hover:bg-gray-200 p-2"
                                    >
                                        {bank.name}
                                    </p>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default FortmatConfirmInfo;
