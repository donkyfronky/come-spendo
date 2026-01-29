
import { ExpensesPage } from "./ExpensePage"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { ExpenseCategory } from "./ExpenseCategory"
import { Outlet } from "react-router"


export const expensesRoutes = {
  path: "expenses",
  element: <ProtectedRoute><Outlet /></ProtectedRoute>,
  errorElement: <div>Failed to load expenses</div>,
  children: [
    {
      index: true,
      //  loader: expensesLoader,
      element: <ExpensesPage />,
    },
    {
      path: "categories",
      //  loader: expensesLoader,
      element: <ExpenseCategory />,
    },
    {
      path: ":expenseId",
      //loader: expenseLoader,
      element: <ExpensesPage />,
    }
  ],
}