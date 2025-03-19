import { useState, useEffect } from "react";
import SUPNavbar from "./SUPNavbar";
import NoteContainer from "../NoteContainer";

const SUPNotes = () => {
  const [assignedtoSUP, setAssignedtoSUP] = useState<string>("");
  useEffect(() => {
    const lastSUP = sessionStorage.getItem("lastSUP");
    if (lastSUP) {
      setAssignedtoSUP(lastSUP);
    } else {
      setAssignedtoSUP("SUP1"); 
    }

    console.log("lastSUP:", lastSUP);
}, []);
  
    return (
        <div className="notes-main flex flex-col m-0 py-11p px-10">
      <SUPNavbar assignedtoSUP={assignedtoSUP} />
      <NoteContainer />
      </div>
    );
  };
  
  export default SUPNotes; 
  