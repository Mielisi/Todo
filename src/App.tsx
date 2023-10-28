import TaskRender from "./components/Tasks/TaskRender";
import classes from "./App.module.css";
import {AddDB} from "./components/AddDB/AddDB";
import {NavBar} from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import {ManageUrl} from "./components/Settings/ManageUrl";
import { Providers } from "./Providers";
import { useContext } from "react";
import { DBContext } from "./Context/context-db";

function App() {

  const {setIsModalOpened,isModalOpened} = useContext(DBContext)

  return (
    <Providers>
      {isModalOpened && <AddDB onClose={setIsModalOpened} />}
      {!isModalOpened && (
        <>
          <NavBar />
          <Route path="/"></Route>

          <Route path="/home">
            <div className={classes.app}>
              <TaskRender modal={isModalOpened} />
            </div>
          </Route>

          <Route path="/home/settings">
            <div className={classes.app}>
              <Settings />
            </div>
          </Route>

          <Route path="/home/settings/gestione-url">
            <div className={classes.app}>
              <ManageUrl />
            </div>
          </Route>
        </>
      )}
    </Providers>
  );
}

export default App;
