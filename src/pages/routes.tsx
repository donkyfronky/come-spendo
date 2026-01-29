import { createBrowserRouter } from "react-router"
import { RootLayout } from "../layouts/RootLayout"
import { authRoutes } from "./auth/routes"
import { homeRoutes } from "./home/routes"
import { expensesRoutes } from "./expenses/routes"
import { userRoutes } from "./user/routers"


export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <div>not found</div>,
    children: [
      authRoutes,
      homeRoutes,
      expensesRoutes,
      userRoutes
    ],
  },
])