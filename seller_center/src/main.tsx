import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import route tree đã được tự động tạo
import { routeTree } from "./routeTree.gen";

// Khởi tạo router
const router = createRouter({ routeTree });

// Đảm bảo tính an toàn kiểu dữ liệu cho router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render ứng dụng
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
