import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { schema } from "../schema/StoreCreate";

import { FormUsers } from "../schema/StoreCreate";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useEffect, useState } from "react";
import Bank from "./Bank";
import Corporate from "./Corporate";
import Individual from "./Individual";
import InputText from "./InputText";
import TaxIdentificationNumber from "./TaxIdentificationNumber";
import TypeBusiness from "./TypeBusiness";

import { useRouter } from "@tanstack/react-router";
import FormData from "form-data";
import toast from "react-hot-toast";
import { createIndividualStore } from "../api/store.api";

const UserForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<FormUsers>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "Cozy Nest",
            identityCardName: "Cozy Nest Admin",
            identityCardNumber: "345678901",
            TIN: "765432109",
            bankAccountName: "Cozy Nest Admin",
            bankAccountNumber: "2345678901",
            bankName: "BIDV",
        },
    });

    useEffect(() => {
        if (!isValid && errors) {
            if (errors.name) {
                toast.error("Tên cửa hàng không hợp lệ!");
            }
            if (errors.identityCardName) {
                toast.error("Tên trên CMND/CCCD không hợp lệ!");
            }
            if (errors.identityCardNumber) {
                toast.error("Số CMND/CCCD không hợp lệ!");
            }
            if (errors.identityCardFrontSide) {
                toast.error("Vui lòng tải lên mặt trước của CMND/CCCD!");
            }
            if (errors.identityCardBackSide) {
                toast.error("Vui lòng tải lên mặt sau của CMND/CCCD!");
            }
            if (errors.TIN) {
                toast.error("Mã số thuế không hợp lệ!");
            }
            if (errors.taxRegistrationDocument) {
                toast.error("Vui lòng tải lên tài liệu đăng ký thuế!");
            }
            if (errors.bankDocument) {
                toast.error("Vui lòng tải lên tài liệu ngân hàng!");
            }
            if (errors.bankAccountName) {
                toast.error("Tên tài khoản ngân hàng không hợp lệ!");
            }
            if (errors.bankAccountNumber) {
                toast.error("Số tài khoản ngân hàng không hợp lệ!");
            }
            if (errors.bankName) {
                toast.error("Tên ngân hàng không hợp lệ!");
            }
            if (errors.bankCode) {
                toast.error("Mã ngân hàng không hợp lệ!");
            }
            if (errors.bankBin) {
                toast.error("Mã BIN ngân hàng không hợp lệ!");
            }
        }
    }, [errors, isValid]);

    const onSubmit: SubmitHandler<FormUsers> = async (data) => {
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("identityCardName", data.identityCardName);
        formdata.append("identityCardNumber", data.identityCardNumber);
        formdata.append("identityCardFrontSide", data.identityCardFrontSide);
        formdata.append("identityCardBackSide", data.identityCardBackSide);
        formdata.append("TIN", data.TIN);
        formdata.append(
            "taxRegistrationDocument",
            data.taxRegistrationDocument
        );
        formdata.append("bankDocument", data.bankDocument);
        formdata.append("bankAccountName", data.bankAccountName);
        formdata.append("bankAccountNumber", data.bankAccountNumber);
        formdata.append("bankName", data.bankName);
        formdata.append("bankCode", data.bankCode);
        formdata.append("bankBin", data.bankBin);

        try {
            await createIndividualStore(formdata);
            toast.success("Tạo cửa hàng thành công");
            router.navigate({
                to: "/",
            });
        } catch (error: any) {
            toast.error(JSON.stringify(error));
        }
    };

    const [selectedTypeBusiness, setSelectedTypeBusiness] =
        useState<string>("Individual");
    const [selectedTypeValidate, setSelectedTypeValidate] =
        useState<string>("CMND");

    return (
        <div className="flex flex-col gap-2">
            <p className="font-sans font-bold text-[22px]">
                Xác minh Thông tin Chủ gian hàng để nhận Thanh Toán!
            </p>
            <div className="flex gap-1 text-green-600">
                <VerifiedUserIcon />
                <p className="font-sans">
                    Thông tin tài khoản của bạn được bảo mật
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <InputText
                    label="Nhập tên cửa hàng"
                    name="name"
                    register={register}
                    errors={errors}
                />
                <TypeBusiness
                    selectedType={selectedTypeBusiness}
                    setSelectedType={setSelectedTypeBusiness}
                />
                {selectedTypeBusiness === "Individual" ? (
                    <Individual
                        selectedType={selectedTypeValidate}
                        setSelectedType={setSelectedTypeValidate}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
                ) : (
                    <Corporate />
                )}
                {/* <CMND register={register} setValue={setValue} /> */}
                <TaxIdentificationNumber
                    register={register}
                    setValue={setValue}
                    errors={errors}
                />
                <Bank register={register} setValue={setValue} errors={errors} />
                <button
                    type="submit"
                    className="bg-blue-500 p-2 rounded-md w-max "
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
