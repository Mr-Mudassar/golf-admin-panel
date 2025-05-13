import { lazy } from "react";
import type { Route } from "../utils/types";

const routes: Route[] = [
  {
    path: "/",
    isPublic: true,
    component: lazy(async () => import("../pages/dashboard")),
  },
  {
    path: "/posts",
    isPublic: true,
    component: lazy(async () => import("../pages/posts")),
  },
];

export default routes;
