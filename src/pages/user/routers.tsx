import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Outlet } from "react-router";
import { UserHomepage } from "./UserHomepage";


export const userRoutes = {
    path: "/user",
    element: <ProtectedRoute><Outlet /></ProtectedRoute>,
    children: [
        { index: true, element: <UserHomepage /> },
    ],
}