import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { Layout as LayoutGeneral } from "../common/layout/Login";
import { Layout } from "../common/layout/Portal";
import {
  ROUTE_LOGIN,
  ROUTE_PORTAL,
  ROUTE_SUMMARY,
} from "../toolbox/constants/route";

import { PrivatePlanRoute, PrivateRoute } from "./PrivateRoute";
import { Login, Portal, Summary } from "../views";

export const allRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        index
        element={
          <LayoutGeneral>
            <Login />
          </LayoutGeneral>
        }
      />
      <Route
        path={ROUTE_PORTAL}
        element={
          <PrivateRoute>
            <Layout path={ROUTE_LOGIN}>
              <Portal />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTE_SUMMARY}
        element={
          <PrivatePlanRoute>
            <Layout path={ROUTE_PORTAL}>
              <Summary />
            </Layout>
          </PrivatePlanRoute>
        }
      />
    </Route>,
  ),
);
