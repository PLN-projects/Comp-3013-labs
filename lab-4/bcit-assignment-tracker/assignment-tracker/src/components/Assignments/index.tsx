import { useState } from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

type assignmentProps = {
  assignmentsList: { name: string; completed: boolean }[];
  setAssignmentList: (a: { name: string; completed: boolean }[]) => void;
};


export function Assignments( {assignmentsList, setAssignmentList}: assignmentProps ) {

  // this numbers state will need to be shared with assignments where deletion and statut changes occur
  const [completedAssignments, setCompletedAssignments] = useState(0);

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignmentsList.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completedAssignments} of {assignmentsList.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assignmentsList.map((currentAssignment, index) => 
          <Assignment name={currentAssignment.name} 
          completed={currentAssignment.completed}
          key={index} index={index}
          assignmentsList={assignmentsList}
          setAssignmentList={setAssignmentList}
          completedAssignments={completedAssignments} setCompletedAssignments={setCompletedAssignments}
          />
        )}
        
      </div>
    </section>
  );
}
