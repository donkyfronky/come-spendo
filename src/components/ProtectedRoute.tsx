import { actionClearErros, getUserSelector, useAppDispatch, useAppSelector } from "@/store"
import { Navigate, useLocation } from "react-router"


export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const onClearAuthErrors = () => dispatch(actionClearErros());
  const user = useAppSelector(getUserSelector);

  if (!user) {
    onClearAuthErrors();
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
}