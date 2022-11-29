import React, { useContext, useState } from "react";
import Card from "../Ui/Card/Card";

import classes from "./AddTask.module.css";
import Button from "../Ui/Button/Button";
import DBContex from "../../Contex/contex-db";

const AddTask = (props) => {

  const url = useContext(DBContex)
  const [task, setTask] = useState({
    taskName: "",
    completed: false
  });
  const [taskIsTouched, setTaskIsTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  let formIsValid = taskIsTouched && task.taskName.trim() === "";

  const setTaskHandler = (event) => {
    setTask({taskName: event.target.value , completed: task.completed});
  };

  const setTouchedHandler = () => {
    setTaskIsTouched(true);
  };

  const uploadTaskHandler = async () => {
    try{
      const response = await fetch(
        url.ur + ".json",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.reloadTask()

    }catch(error){

    }
      
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (task.taskName.trim() === "") {
      setIsLoading(false);
      return;
    }
    setTaskIsTouched(false);
    setTask({
      taskName: "",
      completed: task.completed
    });

    uploadTaskHandler()
    
    setIsLoading(false);
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
