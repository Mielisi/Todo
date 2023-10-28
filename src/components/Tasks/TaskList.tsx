import React, { useContext } from "react";
import DBContex from "../../Context/context-db";
import useHttp from "../../Hooks/use-http";
import Task from "./Task";

const TaskList = (props) => {
  const dbUrl = useContext(DBContex);

  const { sendRequest: updateTask } = useHttp();
  const { sendRequest: removeTask } = useHttp();

  const updateDt = async (id, check) => {
    const url = dbUrl.ur + "/" + id + ".json";

    updateTask({
      url,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:{ completed: !check },
    });
  };

  const removeItemHandler = async (id) => {
    const url = dbUrl.ur + "/" + id + ".json";

    removeTask({
      url,
      method:"DELETE"
    })

    setTimeout(()=>props.reload(), 450) 

  };

  let contnet = <li></li>;

  if (props.filter === "all") {
    contnet = props.tasks.map((task) => (
      <li key={task.id}>
        <Task
          id={task.id}
          taskText={task.taskText}
          completed={task.completed}
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
              taskText={task.taskText}
              completed={task.completed}
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
              taskText={task.taskText}
              completed={task.completed}
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
