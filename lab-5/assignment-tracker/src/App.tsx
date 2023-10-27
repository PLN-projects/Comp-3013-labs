// App.tsx
import { useState } from "react";
import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";

function App() {
  const [assignmentsList, setAssignmentList] = useState<{ name: string; completed: boolean; date: Date }[]>(
    [{ name: "Assignment 1", completed: false, date: new Date(0)}]
  );


  return (
    <>
      <Header assignmentsList={assignmentsList} setAssignmentList={setAssignmentList} />
      <Assignments assignmentsList={assignmentsList} setAssignmentList={setAssignmentList} />
    </>
  );
}

export default App;