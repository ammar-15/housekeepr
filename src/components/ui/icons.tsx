import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props,
});

export const ChevronDown = (props: IconProps) => (
  <svg {...base(props)}><path d="m6 9 6 6 6-6" /></svg>
);

export const ChevronRight = (props: IconProps) => (
  <svg {...base(props)}><path d="m9 6 6 6-6 6" /></svg>
);

export const ArrowRight = (props: IconProps) => (
  <svg {...base(props)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const ArrowUpDown = (props: IconProps) => (
  <svg {...base(props)}><path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4" /></svg>
);

export const Plus = (props: IconProps) => (
  <svg {...base(props)}><path d="M12 5v14M5 12h14" /></svg>
);

export const Minus = (props: IconProps) => (
  <svg {...base(props)}><path d="M5 12h14" /></svg>
);

export const X = (props: IconProps) => (
  <svg {...base(props)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);

export const Check = (props: IconProps) => (
  <svg {...base(props)}><path d="m5 12 5 5 9-10" /></svg>
);

export const Menu = (props: IconProps) => (
  <svg {...base(props)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);

export const Search = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Printer = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M7 9V3h10v6" />
    <rect x="3" y="9" width="18" height="8" rx="2" />
    <path d="M7 14h10v7H7z" />
  </svg>
);

export const Moon = (props: IconProps) => (
  <svg {...base(props)}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
);

export const Trash = (props: IconProps) => (
  <svg {...base(props)}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
);

export const User = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const Lock = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
