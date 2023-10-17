import { useState } from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

type assignmentProps = {
  assignmentsList: string[];
  setAssignmentList: (b: string[]) => void;
}

export function Assignments( {assignmentsList, setAssignmentList}: assignmentProps ) {

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
          <Assignment name={currentAssignment} 
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
