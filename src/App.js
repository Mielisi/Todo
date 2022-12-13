import TaskRender from "./components/Tasks/TaskRender";
import classes from "./App.module.css";
import DBContex from "./Contex/contex-db";
import { useEffect, useState } from "react";
import AddDB from "./components/AddDB/AddDB";
import NavBar from "./components/NavBar/NavBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import ManageUrl from "./components/Settings/ManageUrl";

function App() {
  const [URL, setURL] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (localStorage.getItem("url") !== null || "" ) {
      setURL(localStorage.getItem("url"));
      setShowModal(false);
    }else{
      setTimeout(()=>{setShowModal(true)}, 500) 
    }
  }, [setURL, URL]);

  const setUrlHandler = (url) => {
    setURL(url);
    localStorage.setItem("url", url);
  };

  const hideMoalHandler = () => {
    setShowModal(false);
  };

  return (
    <DBContex.Provider
      value={{
        ur: URL,
        setUrl: setUrlHandler,
      }}
    >
      {showModal && <AddDB onClose={hideMoalHandler} />}
      {!showModal && (
        <>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>

            <Route path="/home" exact>
              <div className={classes.app}>
                <TaskRender modal={showModal} />
              </div>
            </Route>

            <Route path="/home/settings" exact>
              <div className={classes.app}>
                <Settings />
              </div>
            </Route>

            <Route path="/home/settings/gestione-url">
              <div className={classes.app}>
                <ManageUrl />
              </div>
            </Route>
          </Switch>
        </>
      )}
    </DBContex.Provider>
  );
}

export default App;
