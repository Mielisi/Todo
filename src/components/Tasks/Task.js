import React, { useEffect, useState } from "react";
import Card from "../Ui/Card/Card";

import classes from "./Task.module.css";

const Task = (props) => {
  const [checked, setChecked] = useState();

  const completed = props.completed

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  let pClasses = `${classes.taskText}`;

  if (checked) {
    pClasses = `${classes.taskText} ${classes.completed}`;
  }

  const changeHandler = (event) => {
    setChecked(event.target.checked);
    props.updateData(event.target.value, checked);
  };

  return (
    <Card className={classes.container}>
      <div className={classes.top}>
        <input
          type="checkbox"
          className={classes.check}
          id="check"
          value={props.id}
          checked={checked}
          onChange={changeHandler}
        />
        <div className={classes.scroll}>
          <p className={pClasses}> {props.taskText}</p>
        </div>
      </div>
      <button onClick={props.removeTask.bind(null, props.id)}>
        Rimuovi il task
      </button>
    </Card>
  );
};

export default Task;
