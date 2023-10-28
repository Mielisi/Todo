import { useContext, useState } from "react";
import {Button} from "../Ui/Button/Button";
import Card from "../Ui/Card/Card";
import AddTask from "./AddTask";
import useHttp from "../../Hooks/use-http";
import TaskList from "./TaskList";

import classes from "./TaskRender.module.css";
import {DBContext} from "../../Context/context-db";

const TaskRender = (props) => {
  const [filter, setFilter] = useState("all");
  const [task, setTask] = useState([]);

  const DBctx = useContext(DBContext);
  const fetchUrl = DBctx.ur + ".json";

  // using object destructioring to extract single variables from the useHttp

  const { sendRequest: fetchTasks, isLoading, error } = useHttp();

  //This is the function that was used to transform the data from object of objects to array of
  // objects
  const transformTask = (data) => {
    const loadedTasks = [];
    for (const key of Object.keys(data)) {
      loadedTasks.push({
        id: key,
        taskText: data[key].taskName,
        completed: data[key].completed,
      });
      setTask(loadedTasks);
    }
  };

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
    fetchTasks({ url: fetchUrl }, transformTask);
  };

  let contnent = <p>Non ho trovato nessun task</p>;

  if (task.length > 0) {
    contnent = (
      <TaskList
        tasks={task}
        reload={() => {
          fetchTasks({ url: fetchUrl }, transformTask);
        }}
        filter={filter}
      />
    );
  }

  if (isLoading) {
    contnent = <p>Carcamento...</p>;
  }

  if (error) {
    contnent = <p>{error}</p>;
  }

  return (
    <Card className={classes.scrollable}>
      <AddTask
        reloadTask={() => {
          fetchTasks({ url: fetchUrl }, transformTask);
        }}
      />
      <div className={classes.center}>
        <div className={classes.sel}>
          <p>Seleziona quali task vuoi visualizzare</p>
          <select name="taksFiltro" onChange={filterChangeHandler}>
            <option value="all">Tutte</option>
            <option value="completed">Completate</option>
            <option value="notCompleted">Non completate</option>
          </select>
          <Button
            onClick={() => {
              fetchTasks({ url: fetchUrl }, transformTask);
            }}
          >
            Aggiorna i task
          </Button>
        </div>

        {contnent}
      </div>
    </Card>
  );
};

export default TaskRender;
