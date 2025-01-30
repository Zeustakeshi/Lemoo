import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Bạn đã có tài khoản chưa?
      </h1>
      <nav className="flex space-x-4 mb-6">
        <Link
          to="/auth/login"
          className="text-blue-600 hover:underline font-medium"
        >
          <span className="border px-4 py-2 border-blue-700 rounded-2xl">
            Đăng Nhập
          </span>
        </Link>
        <Link
          to="/auth/register"
          className="text-blue-600 hover:underline font-medium"
        >
          <span className="border px-4 py-2 border-blue-700 rounded-2xl">
            Đăng Ký
          </span>
        </Link>
      </nav>
      <div
        className="w-full max-w-xl shadow-lg rounded-md"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
