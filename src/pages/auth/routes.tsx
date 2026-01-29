import { LoginPage } from "./LoginPage"


export const authRoutes = {
  path: "auth",
  //  element: <RootLayout />,
  children: [
    { path: "login", element: <LoginPage /> },
  ],
}