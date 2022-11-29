import TaskRender from "./components/Tasks/TaskRender";
import classes from "./App.module.css";
import DBContex from "./Contex/contex-db";
import { useState } from "react";
import AddDB from "./components/AddDB/AddDB";

function App() {
  const [URL, setURL] = useState("");
  const [showModal, setShowModal]= useState(true)

  const setUrlHandler = (url) => {
    setURL(url);
  };

  const hideMoalHandler = () =>{
    setShowModal(false)
  }

  return (
    <DBContex.Provider
      value={{
        ur: URL,
        setUrl: setUrlHandler,
      }}
    >
     {showModal ? <AddDB onClose={hideMoalHandler}/> : ""}
      <div className={classes.app}>
        <TaskRender />
      </div>
    </DBContex.Provider>
  );
}

export default App;
