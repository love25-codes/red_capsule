import { Link, NavLink } from "react-router-dom";
import {
  LogIn,
  LayoutDashboard,
  History,
  BookOpen,
  Plus
} from "lucide-react";

const linkClass = ({ isActive }) =>
  `relative flex items-center gap-2 text-sm font-medium tracking-wide px-4 h-[72px] transition-all duration-500 group ${
    isActive
      ? "text-white bg-gradient-to-t from-red-950/40 via-red-950/10 to-transparent"
      : "text-neutral-400 hover:text-white hover:bg-white/5"
  }`;

export default function Navbar({ user, logout, setOpen }) {
  const navItems = [
    { to: "/", label: "Learn", icon: BookOpen },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/create", label: "Create", icon: Plus },
    { to: "/timeline", label: "Timeline", icon: History },
  ];

  return (
    <header
      className="sticky top-0 z-40 bg-black border-b border-white/10 backdrop-blur-md"
      data-testid="navbar"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between">

        {/* Logo and Brand Name */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group py-4"
          data-testid="nav-logo"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_15px_#DC2626] group-hover:scale-110 transition-transform" />

          <span className="text-white text-2xl tracking-tight font-serif italic">
            <span className="font-light">Red</span>
            <span className="text-red-600 font-light ml-1.5">
              Capsule
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center h-full">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 transition-colors duration-300 ${
                      isActive
                        ? "text-red-500"
                        : "group-hover:text-white"
                    }`}
                  />

                  <span className="relative z-10">{label}</span>

                  {isActive && (
                    <>
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />

                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-red-400 blur-sm" />
                    </>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-4">

          {user ? (
            <div className="flex items-center gap-4">

              <span className="text-zinc-400 text-xs font-bold uppercase hidden sm:block">
                Hi, {user.name?.split(" ")[0]}
              </span>

              <button
                onClick={logout}
                className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-red-600 rounded-full hover:bg-red-500 transition-all active:scale-95"
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95"
              data-testid="nav-login"
            >
              <LogIn className="w-4 h-4" />
              Log In
            </button>
          )}

        </div>
      </div>
    </header>
  );
}