import LoginForm from "@/components/modules/auth/LoginForm";
import { Button } from "@/components/ui/button";
import {
    createFileRoute,
    useNavigate,
    useSearch,
} from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/login")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigation = useNavigate();
    const { callback_url }: any = useSearch({
        strict: false,
    });
    return (
        <div className="p-5 my-10  flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold text-center">
                Chào mừng quay lại
            </h1>
            <p className="text-muted-foreground text-center my-5">
                Hãy tận hưởng trải nghiệm mua sắm đỉnh cao với những ưu đãi đặc
                biệt.
            </p>
            <div className="mt-5">
                <LoginForm></LoginForm>
            </div>
            <div className="mt-5 w-full flex justify-center items-center">
                <p>Tôi chưa có tài khoản? </p>{" "}
                <Button
                    onClick={() =>
                        navigation({
                            to: "/auth/register",
                            search: { callback_url },
                        })
                    }
                    variant="link"
                >
                    Tạo tài khoản
                </Button>
            </div>
        </div>
    );
}
