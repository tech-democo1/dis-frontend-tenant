import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "pages/dashboard/index.tsx"),
    route("employerList", "pages/employerList/index.tsx"),
    route("employer", "pages/employerProfile/index.tsx"),
  ]),
] satisfies RouteConfig;
