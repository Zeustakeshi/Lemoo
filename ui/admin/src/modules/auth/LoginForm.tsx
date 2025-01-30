import { login } from "@/api/auth.api";
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
import { loginSchema, LoginType } from "@/schemas/auth.schema";
import { login as loginThunk } from "@/store/auth/auth.thunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

const LoginForm = ({}: Props) => {
    const form = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: LoginType) => login(data),
    });

    const dispatch = useDispatch();

    const handleLogin = async (value: LoginType) => {
        try {
            const token = await mutateAsync(value);
            dispatch(loginThunk(token));
        } catch (error: any) {
            toast.error(JSON.stringify(error));
        }
    };

    return (
        <Form {...form}>
            <form
                className="space-y-2"
                onSubmit={form.handleSubmit(handleLogin)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa chỉ email</FormLabel>
                            <FormControl {...field}>
                                <Input
                                    placeholder="Nhập địa chỉ email"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl {...field}>
                                <Input
                                    placeholder="••••••••••••"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} className="!mt-5 w-full">
                    {isPending ? "Đang xử lý" : "Đang nhập"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
