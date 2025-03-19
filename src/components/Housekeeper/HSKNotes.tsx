import { useState, useEffect } from "react";
import HSKNavbar from "./HSKNavbar";
import NoteContainer from "../NoteContainer";

const HSKNotes = () => {
    const [assignedtoHSK, setAssignedtoHSK] = useState<string>("");

  
    useEffect(() => {
        const lastHSK = sessionStorage.getItem("lastHSK");
        if (lastHSK) {
          setAssignedtoHSK(lastHSK);
        } else {
          setAssignedtoHSK("HSK1"); 
        }
    
        console.log("lastHSK:", lastHSK);
    }, []);
  
    return (
      <div className="notes-main flex flex-col m-0 py-20 px-10">
      <HSKNavbar assignedtoHSK={assignedtoHSK} />
      <NoteContainer />
      </div>
    );
  };
  
  export default HSKNotes; 
  