// import { useState } from "react";
import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

type assignmentProps = {
  name: string;
  index: number;
  completed: boolean;
  assignmentsList: { name: string; completed: boolean }[];
  setAssignmentList: (a: { name: string; completed: boolean }[]) => void;
  completedAssignments: number;
  setCompletedAssignments: (b: number) => void;
}

function deleteAssignment(
  e: React.MouseEvent, 
  index: number, 
  assignmentsList: { name: string; completed: boolean }[], 
  setAssignmentList: (a: { name: string; completed: boolean }[]) => void, 
  completedAssignments: number, setCompletedAssignments: (b: number) => void) {

  // if the assignment in that array was completed subract one from the completed assignments number
  e.preventDefault();
  if (assignmentsList[index].completed == true) {
    setCompletedAssignments(completedAssignments - 1);
  }
  
  assignmentsList.splice(index, 1);
  setAssignmentList([...assignmentsList]);
}

function changeStatus(
  e: React.MouseEvent, 
  index: number, 
  assignmentsList: { name: string; completed: boolean }[], 
  completedAssignments: number, 
  setCompletedAssignments: (b: number) => void) {
    
  if(assignmentsList[index].completed == true){
    assignmentsList[index].completed = false;
    setCompletedAssignments(completedAssignments - 1);
  }
  else {
    assignmentsList[index].completed = true;
    setCompletedAssignments(completedAssignments + 1);
  }
}

export function Assignment( {name, completed, index, assignmentsList, setAssignmentList, completedAssignments, setCompletedAssignments}: assignmentProps) {

  return (
    <div className={styles.assignment}>
      <button onClick={(e) => changeStatus(e, index, assignmentsList, completedAssignments, setCompletedAssignments)} className={styles.checkContainer}>
        {completed ? <BsFillCheckCircleFill size={20} /> : <div />}
      </button>

      {completed ? <p className={styles.textCompleted}>{name}</p> : <p>{name}</p>}

      <button onClick={(e) => deleteAssignment(e, index, assignmentsList, setAssignmentList, completedAssignments, setCompletedAssignments)} className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}