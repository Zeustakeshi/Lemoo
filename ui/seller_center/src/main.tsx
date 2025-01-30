import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./Context/UserContext.tsx";
import Loading from "./components/LazyLoading/Loading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </UserProvider>
  </React.StrictMode>
);
