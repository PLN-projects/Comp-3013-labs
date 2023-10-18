import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";

type assignmentProps = {
  assignmentsList: { name: string; completed: boolean }[];
  setAssignmentList: (a: { name: string; completed: boolean }[]) => void;
};

function addAssignment(
  e: React.FormEvent<HTMLFormElement>,
  assignment: string, 
  assignmentsList: { name: string; completed: boolean }[], 
  setAssignmentList: (a: { name: string; completed: boolean }[]) => void ) {
    
  e.preventDefault();

  // Validate for duplicate assignments
  for (let counter = 0; counter < assignmentsList.length; counter++) {
    if (assignment.toLowerCase().trim() === assignmentsList[counter].name.toLowerCase().trim()) {
      alert(`${assignment.trim()} Already exists, no duplicates allowed`);
      return;
    }
  }
  
  // create a new assignment to add the the array
  const newAssignment = {
    name: assignment.trim(),
    completed: false, // initialize status for to false
  };
  
  setAssignmentList([...assignmentsList, newAssignment]);
  console.log(assignmentsList);
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