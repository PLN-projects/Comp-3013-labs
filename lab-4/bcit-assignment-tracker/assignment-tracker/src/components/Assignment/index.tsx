import { useState } from "react";
import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

type assignmentProps = {
  name: string;
  index: number;
  assignmentsList: string[];
  setAssignmentList: (a: string[]) => void;
  completedAssignments: number;
  setCompletedAssignments: (b: number) => void
}

function deleteAssignment(e: React.MouseEvent, index: number, assignmentsList: string[], setAssignmentList: (b: string[]) => void, status: boolean, setStatus: (c: boolean) => void, completedAssignments: number, setCompletedAssignments: (b: number) => void){
  
  if(status == true){
    setStatus(false);
    setCompletedAssignments(completedAssignments - 1);
  }
  assignmentsList.splice(index, 1);
  setAssignmentList([...assignmentsList]);
}


function changeStatus(e: React.MouseEvent, status: boolean, setStatus: (c: boolean) => void, completedAssignments: number, setCompletedAssignments: (b: number) => void){
  if(status == false){
    setStatus(true);
    setCompletedAssignments(completedAssignments + 1);
  }
  else if (status == true) {
    setStatus(false);
    setCompletedAssignments(completedAssignments - 1);
  }
}

export function Assignment( {name, index, assignmentsList, setAssignmentList, completedAssignments, setCompletedAssignments}: assignmentProps ) {
  const [status, setStatus] = useState(false);

  return (
    <div className={styles.assignment}>
      <button onClick={(e) => changeStatus(e, status, setStatus, completedAssignments, setCompletedAssignments)} className={styles.checkContainer}>
        {status ? <BsFillCheckCircleFill size={20} /> : <div />}
      </button>

      {status ? <p className={styles.textCompleted}>{name}</p> : <p>{name}</p>}

      <button onClick={(e) => deleteAssignment(e, index, assignmentsList, setAssignmentList, status, setStatus, completedAssignments, setCompletedAssignments)} className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
