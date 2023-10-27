import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { DayPicker } from 'react-day-picker';
import { BsFillCalendarPlusFill } from "react-icons/bs";
import 'react-day-picker/dist/style.css';

type assignmentProps = {
  assignmentsList: { name: string; completed: boolean; date: Date }[];
  setAssignmentList: (a: { name: string; completed: boolean; date: Date }[]) => void;
};

function addAssignment(
  e: React.FormEvent<HTMLFormElement>,
  assignment: string, 
  assignmentsList: { name: string; completed: boolean; date: Date }[], 
  setAssignmentList: (a: { name: string; completed: boolean; date: Date }[]) => void, 
  selected: Date | undefined, 
  calendarDisplay: boolean, 
  setCalendarDisplay: (b: boolean) => void,
  setSelected: (c: Date | undefined) => void) {
    
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
      date: new Date(0)
    };

    // if a date was selected overwrite the old date with the new date (keep other values the same)
    if(selected) {
      selected.setHours(0,0,0,0) // set time to midnight since time doesn't matter
      newAssignment.date = selected
      setSelected(undefined); // clear the selected date from the calendar
    }

    // if the calendar was being displayed when an assignment was created, stop displaying the calendar
    if(calendarDisplay == true){
      setCalendarDisplay(false);
    }
  
  setAssignmentList([...assignmentsList, newAssignment]);
  console.log(newAssignment);
}

function displayCalendar(e: React.MouseEvent, calendarDisplay: boolean, setCalendarDisplay: (b: boolean) => void) {
    e.preventDefault();
    setCalendarDisplay(!calendarDisplay);
}

export function Header( {assignmentsList, setAssignmentList}: assignmentProps) {
  
  const [assignment, setAssignment] = useState("");
  const [selected, setSelected] = useState<Date>();
  const [calendarDisplay, setCalendarDisplay] = useState(false);

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form onSubmit={(e) => addAssignment(e, assignment, assignmentsList, setAssignmentList, selected, calendarDisplay, setCalendarDisplay, setSelected)} className={styles.newAssignmentForm}>
        <input placeholder="Add a new assignment" type="text" onChange={(e) => setAssignment(e.target.value)} />

        {/* Calendar button */}
        {assignment.trim() == "" ? <button disabled><BsFillCalendarPlusFill size={20} /></button> 
        : <button onClick={(e) => displayCalendar(e, calendarDisplay, setCalendarDisplay)}><BsFillCalendarPlusFill size={20} /></button>}

        {/* Create assignment button */}
        {assignment.trim() == "" ? <button disabled>Create <AiOutlinePlusCircle size={20} /></button> 
        : <button type="submit" >Create <AiOutlinePlusCircle size={20} /></button>}

        {/* I used inline styling as my option, so I was able to style everything except hover colors */}
        {calendarDisplay ? 
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            fromDate={new Date()}
            modifiersStyles={{
              disabled: { color: '#ff0000' },
              selected: {background: '#94CF26'},
              today: {background: '#00D1D1'}
            }}
            styles={{
              caption: { color: '#39FFFF' },
              month	: {background: '#262626',
              padding: '10px',
              borderRadius: '10px',
              position: 'absolute',
              top: '70px',
              left: '380px',
              border: '1px solid #39FFFF'},
              nav: {display: 'inline-flex'},
              nav_button_previous	: {
                padding: '12px 16px',
                marginRight: '5px'
              },
              nav_button_next: {padding: '12px 16px'},
              day: {color: '#2E2E2E'}
            }}/> 
              : <></>}
      </form>
    </header>
  );
}