import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage"));
const MediaList = lazy(() => import("../pages/MediaList"));
const MediaDetail = lazy(() => import("../pages/MediaDetail"));
const MediaSearch = lazy(() => import("../pages/MediaSearch"));

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
  {
    path: "/search",
    element: <MediaSearch />,
  },
];
export default routes;
