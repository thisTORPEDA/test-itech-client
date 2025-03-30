import { createBrowserRouter, RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainContent } from "../shared/components/MainContent.tsx";
import { ProtectedRoute } from "../shared/components/ProtectedRoute.tsx";
import { PageLoader } from "../shared/components/PageLoader.tsx";

const RegisterPage = lazy(() => import("../pages/register/"));
const LoginPage = lazy(() => import("../pages/login/"));
const FruitsPage = lazy(() => import("../pages/fruits/"));

const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainContent />,
    children: [
      {
        path: "/register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <FruitsPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <h1>Страница не найдена</h1>
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
