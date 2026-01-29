import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./ThemeToggle"
import { actionLogout, isLoggedUserSelector, useAppDispatch, useAppSelector } from "@/store"
import { useEffect, useState } from "react"
import { getMyUserProfile, type Profile } from "@/api/profile"
import { Link } from "react-router"


const navItems = [
  { label: "Home", href: "/" },
  { label: "Info", href: "#" },
  { label: 'Expense', href: '/expenses' },
  { label: 'Categories', href: '/expenses/categories' }
]

export function Navbar() {
  const [state, setState] = useState<Profile | undefined>()
  const isLoggedUser = useAppSelector(isLoggedUserSelector)

  const dispatch = useAppDispatch()
  const handleLogout = () => dispatch(actionLogout())

  useEffect(() => {
    if (isLoggedUser) {
      getMyUserProfile().then(k => setState(k))
    }
  }, [])
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="text-lg font-semibold">MyApp</div>
        {isLoggedUser && <div>Hi {state?.nickname}</div>}
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedUser ? <a
            key={'logout'}
            href='#'
            onClick={handleLogout}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Logout
          </a> : <Link
            key={'login'}
            to="/auth/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Login
          </Link>}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link to={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem key={'drop-down-logout'} asChild>
                {isLoggedUser ?
                  <a onClick={handleLogout} href={'#'}>Logout</a> :
                  <Link to={'/auth/login'}>Login</Link>
                }
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
