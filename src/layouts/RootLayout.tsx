import { Navbar } from "@/components/Navbar"
import PageLoader from "@/components/PageLoader"
import { actionRetrieveUser, getUserSelector, isLoadingUserSelector, useAppDispatch, useAppSelector } from "@/store"
import { useEffect } from "react"
import { Outlet } from "react-router"

export function RootLayout() {
  const dispatch = useAppDispatch()
  const loggedUser = useAppSelector(getUserSelector)
  const isLoadingUser = useAppSelector(isLoadingUserSelector)

  useEffect(() => {
    if (!loggedUser) {
      dispatch(actionRetrieveUser())
    }
  }, []);
  return isLoadingUser ? <PageLoader /> : (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-14">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}