import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

type assignmentProps = {
  name: string;
  index: number;
  completed: boolean;
  assignmentsList: { name: string; completed: boolean; date: Date }[];
  setAssignmentList: (a: { name: string; completed: boolean; date: Date }[]) => void;
  completedAssignments: number;
  setCompletedAssignments: (b: number) => void;
  date: Date;
}

function deleteAssignment(
  e: React.MouseEvent, 
  index: number, 
  assignmentsList: { name: string; completed: boolean; date: Date }[], 
  setAssignmentList: (a: { name: string; completed: boolean; date: Date }[]) => void, 
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

export function Assignment( {name, completed, index, assignmentsList, setAssignmentList, completedAssignments, setCompletedAssignments, date}: assignmentProps) {
  

  // checking date difference
  let dateString = "";
  const today = new Date;
  today.setHours(0,0,0,0) // set hours on date to zero since time doesn't matter and causes problems
  // convert both dates into unix times so they can be subtracted
  const timeDifference = date.getTime() - today.getTime();
  // the days is the difference divided by millaseconds, hours, minutes, hours in a day
  const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
  if(date > today){
    if (daysDifference == 1) {
      dateString =`Due: Tomorrow`;
    }
    else {
      dateString =`Due: ${daysDifference} days`;
    }
  }

  return (
    <div className={styles.assignment}>
      <button onClick={(e) => changeStatus(e, index, assignmentsList, completedAssignments, setCompletedAssignments)} className={styles.checkContainer}>
        {completed ? <BsFillCheckCircleFill size={20} /> : <div />}
      </button>

      {completed ? <p className={styles.textCompleted}>{name}</p> : <p>{name}</p>}

      {/* if dateString is empty no date was entered, if due date was entered ask what the days difference was if it was 1 use due soon styles */}
      {dateString != "" ? daysDifference == 1 ? <span className={styles.dueSoon}>{dateString}</span> : <span className={styles.dueDate}>{dateString}</span> 
      : <span className={styles.dueDate}>Due: N/A</span>}

      <button onClick={(e) => deleteAssignment(e, index, assignmentsList, setAssignmentList, completedAssignments, setCompletedAssignments)} className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}