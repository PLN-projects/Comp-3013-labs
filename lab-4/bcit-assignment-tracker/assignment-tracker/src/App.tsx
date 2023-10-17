import { useState } from "react";
import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";

function App() {
  const [assignmentsList, setAssignmentList] = useState<string[]>(["Assignment 1"]);
    
  return (
    <>
      <Header assignmentsList={assignmentsList} setAssignmentList={setAssignmentList} />
      <Assignments assignmentsList={assignmentsList} setAssignmentList={setAssignmentList} />
    </>
  );
}

export default App;
