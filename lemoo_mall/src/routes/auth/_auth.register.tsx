import RegisterForm from "@/components/modules/auth/RegisterForm";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/register")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="">
            <h1 className="text-xl font-semibold text-center mb-3">
                Tạo tài khoản
            </h1>
            <p className="text-center text-sm text-muted-foreground mb-5">
                Tạo tài khoản ngay và để có trải nghiệm mua sắm tuyệt vời tại
                Lemoo
            </p>
            <RegisterForm></RegisterForm>
            <div className="mt-5 flex justify-center items-center gap-3 flex-col">
                <p>
                    Tôi đã là thành viên{" "}
                    <span className="font-semibold text-primary">Lemoo</span>.
                </p>
                <Link className="text-primary font-semibold" to="/auth/login">
                    Đăng nhập ngay
                </Link>
            </div>
        </div>
    );
}
