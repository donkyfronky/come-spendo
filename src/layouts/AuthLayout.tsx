import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Outlet } from "react-router"

export function AuthLayout() {

  return (<div className="flex items-center justify-center min-h-screen bg-muted">
    <div className="w-full max-w-md p-6">
      <ProtectedRoute><Outlet /></ProtectedRoute>
    </div>
  </div>
  )
}