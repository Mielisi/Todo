import React, { useContext } from "react";
import DBContex from "../../Contex/contex-db";
import Task from "./Task";

const TaskList = (props) => {
  const dbUrl = useContext(DBContex);
  const updateDt = async (id, check) => {
    const url = dbUrl.ur +"/"+ id + ".json";
    console.log(url)
    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ completed: !check }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("e' successo un errore imprevisto");
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeItemHandler = async (id) => {
    const url = dbUrl.ur +"/"+ id + ".json";
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("e' successo un errore imprevisto");

      props.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  let contnet = <li></li>;

  if (props.filter === "all") {
    contnet = props.tasks.map((task) => (
      <li key={task.id}>
        <Task
          id={task.id}
          taskText={task.text}
          completed={task.completed}
          task={props.task}
          updateData={updateDt}
          removeTask={removeItemHandler}
        />
      </li>
    ));
  } else if (props.filter === "completed") {
    contnet = props.tasks.map(
      (task) =>
        task.completed && (
          <li key={task.id}>
            <Task
              id={task.id}
              taskText={task.text}
              completed={task.completed}
              task={props.task}
              updateData={updateDt}
              removeTask={removeItemHandler}
            />
          </li>
        )
    );
  } else if (props.filter === "notCompleted") {
    contnet = props.tasks.map(
      (task) =>
        !task.completed && (
          <li key={task.id}>
            <Task
              id={task.id}
              taskText={task.text}
              completed={task.completed}
              task={props.task}
              updateData={updateDt}
              removeTask={removeItemHandler}
            />
          </li>
        )
    );
  }

  return <ul>{contnet}</ul>;
};

export default TaskList;
