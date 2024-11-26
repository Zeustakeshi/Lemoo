import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "20px" }}>Page Not Found</div>
);
const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
