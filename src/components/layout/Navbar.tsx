import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Store,
  ClipboardList,
  Sparkles,
  LogOut,
  User,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import useTheme from "@/hooks/useTheme";

const Navbar = () => {
  const { user, initialLoading, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-lg font-semibold tracking-tight"
        >
          <span className="flex size-7 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          StoreFront
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" className="rounded-full" asChild>
            <Link to="/products">Products</Link>
          </Button>

          {!initialLoading && user?.role === "buyer" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative rounded-full"
              >
                <Link to="/cart" aria-label="Cart">
                  <ShoppingCart />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                      {cartCount > 99 ? "99+" : cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                asChild
              >
                <Link to="/orders">My Orders</Link>
              </Button>
            </>
          )}

          {!initialLoading && user?.role === "seller" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                asChild
              >
                <Link to="/seller/dashboard">
                  <Store /> Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                asChild
              >
                <Link to="/seller/orders">
                  <ClipboardList /> Orders
                </Link>
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>

          {!initialLoading && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Account menu"
                >
                  {user ? (
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                        {user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {user ? (
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut /> Log out
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login">
                        <LogIn /> Log in
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register">
                        <UserPlus /> Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
