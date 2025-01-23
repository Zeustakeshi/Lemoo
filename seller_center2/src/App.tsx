import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";
import { redirectToSSO } from "./helpers/utils/redirectToSSO";
import { getRefreshToken } from "./helpers/utils/getRefreshToken";
import { getUserInfo } from "./api/auth/user.api";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  useEffect(() => {
    const checkAuth = async () => {
      const authToken = getRefreshToken();
      if (!authToken) {
        redirectToSSO();
        console.log("docucment", document.cookie);
        return;
      }
      try {
        const userInfo = await getUserInfo();
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      } catch {
        console.error("Invalid token, redirecting to SSO");
        redirectToSSO();
      }
    };
    checkAuth();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
