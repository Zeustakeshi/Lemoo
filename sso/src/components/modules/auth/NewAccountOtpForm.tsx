import { verifyCreateAccountOtp } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { saveToken } from "@/lib/tokenStore";
import { otpSchema, OtpType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

type Props = {};

const NewAccountOtpForm = ({}: Props) => {
    const { callback_url, code }: any = useSearch({
        strict: false,
    });

    const form = useForm<OtpType>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            code: code,
        },
    });

    const navigation = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["verify-new-account"],
        mutationFn: async (data: OtpType) => verifyCreateAccountOtp(data),
    });

    const handleVerifyOtp = async (value: OtpType) => {
        try {
            const data: any = await mutateAsync(value);
            saveToken(data.accessToken);
            saveToken(data.refreshToken);
            if (!callback_url) {
                navigation({
                    to: "/",
                });
            } else {
                window.location.href = callback_url;
            }
        } catch (error: any) {
            console.log("verify error failed");
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleVerifyOtp)}
                className="flex flex-col items-center"
            >
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem className="flex flex-col justify-center items-center">
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup className="flex justify-center w-full mb-2">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription className="max-w-[400px] text-center text-xs">
                                Mã xác thực đã được gửi qua địa chỉ email của
                                bạn hãy kiểm tra và xác nhận để hoàn thành quá
                                trình tạo tài khoản
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={isPending}
                    type="submit"
                    className="my-5 w-full"
                >
                    {isPending ? "Đang xử lý" : "Xác nhận"}
                </Button>
            </form>
        </Form>
    );
};

export default NewAccountOtpForm;
