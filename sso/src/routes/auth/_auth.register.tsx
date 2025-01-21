import RegisterForm from "@/components/modules/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/register")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigation = useNavigate();

    return (
        <div className="p-5 my-10  flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold text-center">
                Tạo tài khoản
            </h1>
            <p className="text-muted-foreground text-center my-5">
                Đăng ký ngay để không bỏ lỡ bất kỳ cơ hội mua sắm nào và nhận
                những ưu đãi đặc biệt!
            </p>
            <div className="mt-5">
                <RegisterForm></RegisterForm>
            </div>
            <div className="mt-5 w-full flex justify-center items-center">
                <p>Tôi đã có tài khoản? </p>{" "}
                <Button
                    onClick={() => navigation({ to: "/auth/login" })}
                    variant="link"
                >
                    Đăng nhập ngay
                </Button>
            </div>
        </div>
    );
}
