// src/routes/home.tsx
import { createLazyFileRoute } from "@tanstack/react-router";

const HomePage = () => {
  return (
    <div className="p-2">
      <h3> Home!!!!</h3>
    </div>
  );
};
// Định nghĩa route cho HomePage
export const homeRoute = createLazyFileRoute("/")({
  component: HomePage,
});

export default HomePage; // Xuất component HomePage
