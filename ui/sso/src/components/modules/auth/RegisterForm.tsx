import { createAccount } from "@/api/auth.api";
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
import { createAccountSchema, CreateAccountType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

type Props = {};

const RegisterForm = ({}: Props) => {
    const form = useForm<CreateAccountType>({
        resolver: zodResolver(createAccountSchema),
    });

    const { callback_url }: any = useSearch({
        strict: false,
    });

    const navigation = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-account"],
        mutationFn: async (data: CreateAccountType) =>
            await createAccount(data),
    });

    const handleLogin = async (value: CreateAccountType) => {
        try {
            const data: any = await mutateAsync(value);
            if (!data?.code) return;
            navigation({
                to: `/auth/otp/new-account`,
                search: {
                    code: data.code,
                    callback_url,
                },
            });
        } catch (error: any) {
            console.log(error);
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
                    name="username"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel className="text-lg">
                                Tên tài khoản
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="px-6 py-5 text-xl"
                                    placeholder="Tên của bạn là gì?"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                <div className="flex justify-between items-center gap-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-5 flex-1">
                                <FormLabel className="text-lg">
                                    Địa chỉ email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        className="px-6 py-5 text-xl"
                                        placeholder="Nhập địa chỉ email"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="mb-5 flex-1">
                                <FormLabel className="text-lg">
                                    Số điện thoại
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        className="px-6 py-5 text-xl"
                                        placeholder="Nhập số điện thoại "
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                </div>

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

                <Button
                    disabled={isPending}
                    size="lg"
                    type="submit"
                    className="w-full mt-5"
                >
                    {isPending ? "Đang tạo tài khoản" : "Đang tạo tài khoản"}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
