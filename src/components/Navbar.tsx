import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminUserSwitch from "./Admin/AdminUserSwitch";
import { Menu, X } from "./ui/icons";

export interface NavItem {
  label: string;
  to: string;
  onClick?: () => void;
}

interface NavbarProps {
  role: string;
  items: NavItem[];
}

const Navbar = ({ role, items }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar sticky top-0 z-30 bg-chocolate text-pearl print:hidden">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="text-xl tracking-tight">Housekeepr</span>
          <span className="h-6 w-px bg-pearl/15" aria-hidden />
          <AdminUserSwitch current={role} />
        </div>

        <nav className="hidden h-full items-stretch gap-6 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={item.onClick}
              className={({ isActive }) =>
                `relative flex items-center text-sm transition-colors ${
                  isActive
                    ? "text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-clay"
                    : "text-pearl/65 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-pearl/80 hover:bg-white/10 hover:text-white md:hidden"
        >
          {isOpen ? <X width={20} height={20} /> : <Menu width={20} height={20} />}
        </button>
      </div>

      {isOpen && (
        <nav className="flex flex-col border-t border-pearl/10 px-4 py-2 md:hidden">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className={({ isActive }) =>
                `border-l-2 py-2.5 pl-3 text-sm ${
                  isActive ? "border-clay text-white" : "border-transparent text-pearl/65"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
