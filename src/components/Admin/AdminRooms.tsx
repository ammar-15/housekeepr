import { useState } from "react";
import AdminNavbar from "./AdminNavbar.tsx";
import ClearRooms from "./ClearRooms.tsx";
import StatsHeader from "../StatsHeader.tsx";
import RoomList from "../RoomList.tsx";
import { PageHeader, PageShell, SyncStatus } from "../ui/Page.tsx";
import { buttonOutline } from "../ui/form.ts";
import { Moon, Printer } from "../ui/icons.tsx";
import { isInspected, needsCleaning, useRooms } from "../../lib/rooms.ts";

const AdminRooms = () => {
  const { rooms, loaded, syncedAt } = useRooms();
  const [showClearModal, setShowClearModal] = useState(false);

  const stats = {
    "Total rooms": rooms.length,
    Outstanding: rooms.filter(needsCleaning).length,
    Inspected: rooms.filter(isInspected).length,
  };

  return (
    <PageShell nav={<AdminNavbar />}>
      <PageHeader
        title="Rooms"
        meta={<SyncStatus syncedAt={syncedAt} />}
        actions={
          <>
            <div className="flex gap-2 print:hidden">
              <button type="button" className={buttonOutline} onClick={() => window.print()}>
                <Printer className="text-chocolate/60" />
                Print
              </button>
              <button
                type="button"
                className={`${buttonOutline} hover:border-lightred hover:bg-lightred/40`}
                onClick={() => setShowClearModal(true)}
              >
                <Moon className="text-chocolate/60" />
                End day
              </button>
            </div>
            <StatsHeader stats={stats} />
          </>
        }
      />
      <RoomList
        rooms={rooms}
        loaded={loaded}
        emptyLabel="The board is empty"
        emptyHint="Start the day from the dashboard to load check-outs and stayovers."
      />
      {showClearModal && <ClearRooms onClose={() => setShowClearModal(false)} />}
    </PageShell>
  );
};

export default AdminRooms;
