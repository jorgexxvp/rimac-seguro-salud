import { RouterProvider } from "react-router";
import { allRoutes } from "./routes/AllRoutes";

export const App = () => {
  return <RouterProvider router={allRoutes} />;
};
