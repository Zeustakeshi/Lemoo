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
import { createAccountSchema, CreateAccountType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {};

const RegisterForm = ({}: Props) => {
    const form = useForm<CreateAccountType>({
        resolver: zodResolver(createAccountSchema),
    });

    console.log(form.formState.errors);

    const handleCreateAccount = async (value: CreateAccountType) => {
        console.log({ value });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleCreateAccount)}
                action=""
                className="space-y-2"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên người dùng</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Mọi người có thể gọi bạn gì?"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex w-full gap-2 justify-center items-center">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Địa chỉ email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Địa chỉ email?"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="Số điện thoại của bạn?"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu đăng nhập</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••••••••"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="!mt-5 w-full" type="submit">
                    Tạo tài khoản
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
