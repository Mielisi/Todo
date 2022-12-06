import React, { useContext, useState } from "react";
import Card from "../Ui/Card/Card";

import classes from "./AddTask.module.css";
import Button from "../Ui/Button/Button";
import DBContex from "../../Contex/contex-db";
import useHttp from "../../Hooks/use-http";

const AddTask = (props) => {
  const url = useContext(DBContex);
  const [task, setTask] = useState({
    taskName: "",
    completed: false,
  });
  const [taskIsTouched, setTaskIsTouched] = useState(false);

  const { sendRequest: sendTask, isLoading } = useHttp();

  let formIsValid = taskIsTouched && task.taskName.trim() === "";

  const setTaskHandler = (event) => {
    setTask({ taskName: event.target.value, completed: task.completed });
  };

  const setTouchedHandler = () => {
    setTaskIsTouched(true);
  };

  const uploadTaskHandler = async () => {
    sendTask({
      url: url.ur + ".json",
      method: "POST",
      body: task,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTimeout(() => props.reloadTask(), 750);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (task.taskName.trim() === "") {
      return;
    }
    setTaskIsTouched(false);
    setTask({
      taskName: "",
      completed: task.completed,
    });

    uploadTaskHandler();
  };

  return (
    <Card className={classes.addTask}>
      <form
        onSubmit={submitHandler}
        className={formIsValid ? classes.invalid : ""}
      >
        {!isLoading ? (
          <>
            <p> Inserisci il titolo del task che vuoi inserire</p>
            <input
              type="text"
              id="tasktx"
              onChange={setTaskHandler}
              onBlur={setTouchedHandler}
              value={task.taskName}
            />
            <Button type="submit" disabled={formIsValid}>
              Inserisci il task
            </Button>
          </>
        ) : (
          <p>Sto caricando le informazioni</p>
        )}
        {formIsValid ? (
          <p className={classes.pInvalid}>Inserire un titolo del task</p>
        ) : (
          <p className={classes.pValid}>Inserire un titolo del task</p>
        )}
      </form>
    </Card>
  );
};

export default AddTask;
