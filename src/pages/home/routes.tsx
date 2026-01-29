import { HomePage } from "./HomePage";


export const homeRoutes = {
  path: "/",
  children: [
    { index: true, element: <HomePage /> },
  ],
}