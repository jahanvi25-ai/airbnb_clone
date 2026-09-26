import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavLink({ to, children, onClick }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative block rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
        active ? "text-ink" : "text-ink-soft hover:text-ink"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-clay transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  );
}

export default function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={close}>
          Home
        </NavLink>
      </li>

      {!isLoggedIn && (
        <>
          <li>
            <NavLink to="/login" onClick={close}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" onClick={close}>
              Signup
            </NavLink>
          </li>
        </>
      )}

      {isLoggedIn && isAdmin && (
        <>
          <li>
            <NavLink to="/admin/add-home" onClick={close}>
              Add Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/admin-home-list" onClick={close}>
              Admin's List
            </NavLink>
          </li>
        </>
      )}

      {isLoggedIn && !isAdmin && (
        <>
          <li>
            <NavLink to="/store/favourite-list" onClick={close}>
              Favourite List
            </NavLink>
          </li>
          <li>
            <NavLink to="/store/bookings" onClick={close}>
              Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2" onClick={close}>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Wander<span className="text-clay">Stay</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">{links}</ul>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn && (
            <button onClick={logout} className="btn-base btn-outline">
              Logout
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="btn-base btn-outline px-3 md:hidden"
        >
          <span className="text-base leading-none">{open ? "\u2715" : "\u2630"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 py-2">{links}</ul>
          {isLoggedIn && (
            <button
              onClick={() => {
                close();
                logout();
              }}
              className="btn-base btn-outline w-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
