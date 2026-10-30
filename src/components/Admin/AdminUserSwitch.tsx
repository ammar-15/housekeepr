import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { staffLabel } from "../../lib/rooms";
import { Check, ChevronDown } from "../ui/icons";

const ROLE_GROUPS = [
  { heading: "Manager", roles: [{ code: "Admin", to: "/AdminDashboard" }] },
  {
    heading: "Housekeepers",
    roles: [1, 2, 3].map((n) => ({ code: `HSK${n}`, to: `/HSK${n}dashboard` })),
  },
  {
    heading: "Supervisors",
    roles: [1, 2, 3].map((n) => ({ code: `SUP${n}`, to: `/SUP${n}dashboard` })),
  },
];

const initialsFor = (code: string) =>
  code === "Admin" ? "AD" : `${code[0]}${code.replace(/\D/g, "")}`;

const AdminUserSwitch = ({ current = "Admin" }: { current?: string }) => {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDropdownVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownVisible]);

  const handleSwitch = (to: string) => {
    setIsDropdownVisible(false);
    navigate(to);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownVisible((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isDropdownVisible}
        className="user-switch-button flex items-center gap-2.5 rounded-md py-1 pl-1 pr-2 text-left hover:bg-white/10"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-pearl/10 font-mono text-[10px] font-semibold ring-1 ring-pearl/25">
          {initialsFor(current)}
        </span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-[10px] uppercase tracking-[0.12em] text-pearl/50">
            Viewing as
          </span>
          <span className="block text-sm">{staffLabel(current)}</span>
        </span>
        <ChevronDown className="text-pearl/60" />
      </button>

      {isDropdownVisible && (
        <div
          role="menu"
          className="absolute left-0 top-full z-40 mt-2 w-60 animate-modal-in rounded-lg border border-line bg-white p-1.5 text-chocolate shadow-lg"
        >
          {ROLE_GROUPS.map((group) => (
            <div key={group.heading} className="pb-1 last:pb-0">
              <p className="px-2.5 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-chocolate/45">
                {group.heading}
              </p>
              {group.roles.map((role) => (
                <button
                  key={role.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSwitch(role.to)}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm hover:bg-mistysky/60"
                >
                  <span>{staffLabel(role.code)}</span>
                  {role.code === current ? (
                    <Check className="text-clay" />
                  ) : (
                    <span className="font-mono text-[11px] text-chocolate/35">
                      {role.code !== "Admin" && role.code}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUserSwitch;
