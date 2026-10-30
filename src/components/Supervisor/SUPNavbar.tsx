import Navbar from "../Navbar";

interface SUPNavbarProps {
  assignedtoSUP: string;
}

const SUPNavbar = ({ assignedtoSUP }: SUPNavbarProps) => (
  <Navbar
    role={assignedtoSUP}
    items={[
      { label: "Rooms", to: `/${assignedtoSUP}dashboard` },
      {
        label: "Notes",
        to: "/SUPNotes",
        onClick: () => sessionStorage.setItem("lastSUP", assignedtoSUP),
      },
    ]}
  />
);

export default SUPNavbar;
