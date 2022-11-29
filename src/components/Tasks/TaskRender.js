import React, { useContext, useEffect, useState } from "react";
import DBContex from "../../Contex/contex-db";
import Button from "../Ui/Button/Button";
import Card from "../Ui/Card/Card";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

import classes from "./TaskRender.module.css";

const TaskRender = () => {
  const dbUrl = useContext(DBContex);
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(dbUrl.ur + ".json");

      if (!response.ok) {
        throw new Error("Qualcosa non ha funzionato");
      }

      const data = await response.json();
      const loadedTasks = [];

      for (const key in data) {
        loadedTasks.push({
          id: key,
          text: data[key].taskName,
          completed: data[key].completed,
        });
      }
      setTask(loadedTasks);

      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  },[]);

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
    fetchTasks();
  };

  let contnent = <p>Non ho trovato nessun task</p>;

  if (task.length > 0) {
    contnent = <TaskList tasks={task} reload={fetchTasks} filter={filter} />;
  }

  if (isLoading) {
    contnent = <p>Carcamento...</p>;
  }

  if (error) {
    contnent = <p>{error}</p>;
  }

  return (
    <Card className={classes.scrollable}>
      <AddTask reloadTask={fetchTasks} />
      <div className={classes.center}>
        <div className={classes.sel}>
          <p>Seleziona quali task vuoi visualizzare</p>
          <select name="taksFiltro" onChange={filterChangeHandler}>
            <option value="all">Tutte</option>
            <option value="completed">Completate</option>
            <option value="notCompleted">Non completate</option>
          </select>
          <Button onClick={fetchTasks}>Aggiorna i task</Button>
        </div>

        {contnent}
      </div>
    </Card>
  );
};

export default TaskRender;
