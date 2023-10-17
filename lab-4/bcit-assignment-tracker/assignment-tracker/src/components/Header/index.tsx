import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";

type assignmentProps = {
  assignmentsList: string[];
  setAssignmentList: (b: string[]) => void;
}

function addAssignment (e: React.FormEvent<HTMLFormElement>, assignment: string, assignmentsList: string[], setAssignmentList: (b: string[]) => void) {
  e.preventDefault();
  for(let counter = 0; counter < assignmentsList.length; counter++) {
    if(assignment.toLowerCase().trim() == assignmentsList[counter].toLowerCase().trim()) {
      alert(`${assignment.trim()} Already exists, no duplicates allowed`);
      return;
    }
  }
  setAssignmentList([...assignmentsList, assignment.trim()]);
}

export function Header( {assignmentsList, setAssignmentList}: assignmentProps) {
  
  const [assignment, setAssignment] = useState("");

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form onSubmit={(e) => addAssignment(e, assignment, assignmentsList, setAssignmentList)} className={styles.newAssignmentForm}>
        <input placeholder="Add a new assignment" type="text" onChange={(e) => setAssignment(e.target.value)} />
        {assignment.trim() == "" ? <button disabled>Create <AiOutlinePlusCircle size={20} /></button> 
        : <button type="submit" >Create <AiOutlinePlusCircle size={20} /></button>}
      </form>
    </header>
  );
}