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
  {
    path: "/comments",
    isPublic: true,
    component: lazy(async () => import("../pages/comments")),
  },
  {
    path: "/users",
    isPublic: true,
    component: lazy(async () => import("../pages/users")),
  },
  {
    path: "/profile",
    isPublic: true,
    component: lazy(async () => import("../pages/profile")),
  },
  {
    path: "/userProfile/:userId",
    isPublic: true,
    component: lazy(async () => import("../pages/userProfile")),
  },
  {
    path: "/userActivities",
    isPublic: true,
    component: lazy(async () => import("../pages/userAvtivityLogs")),
  },
];

export default routes;
