import Navbar from "../Navbar";

interface HSKNavbarProps {
  assignedtoHSK: string;
}

const HSKNavbar = ({ assignedtoHSK }: HSKNavbarProps) => (
  <Navbar
    role={assignedtoHSK}
    items={[
      { label: "My rooms", to: `/${assignedtoHSK}dashboard` },
      {
        label: "Notes",
        to: "/HSKNotes",
        onClick: () => sessionStorage.setItem("lastHSK", assignedtoHSK),
      },
    ]}
  />
);

export default HSKNavbar;
