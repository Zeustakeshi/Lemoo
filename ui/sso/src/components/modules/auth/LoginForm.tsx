import { login } from "@/api/auth.api";
import ButtonLoginWithGoogle from "@/components/button/ButtonLoginWithGoogle";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { saveToken } from "@/lib/tokenStore";
import { loginSchema, LoginType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {};

const LoginForm = ({}: Props) => {
    const { callback_url }: any = useSearch({
        strict: false,
    });

    const form = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const navigation = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: LoginType) => await login(data),
    });

    const handleLogin = async (value: LoginType) => {
        try {
            const data: any = await mutateAsync(value);
            await saveToken(data.accessToken);
            await saveToken(data.refreshToken);
            if (!callback_url) {
                navigation({
                    to: "/",
                });
            } else {
                window.location.href = callback_url;
            }
        } catch (error: any) {
            console.log(error);
            toast.error(JSON.stringify(error));
        }
    };

    return (
        <Form {...form}>
            <form
                className="min-w-[500px] "
                onSubmit={form.handleSubmit(handleLogin)}
            >
                <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel className="text-lg">
                                Tên tài khoản
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="px-6 py-5 text-xl"
                                    placeholder="Nhập email hoặc số điện thoại"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    className="px-6 py-5 text-xl"
                                    type="password"
                                    placeholder="••••••••••••••••••••••••"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                <div className="flex w-full justify-end my-2">
                    <Button type="button" variant="link">
                        Quên mật khẩu?
                    </Button>
                </div>

                <Button
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    {isPending ? "Đang xử lý" : " Đăng nhập"}
                </Button>
                <ButtonLoginWithGoogle className="mt-5 w-full"></ButtonLoginWithGoogle>
            </form>
        </Form>
    );
};

export default LoginForm;
