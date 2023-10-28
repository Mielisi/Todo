import { ChangeEvent, useContext, useState } from "react";
import { DBContext } from "../../Context/context-db";
import { Button } from "../Ui/Button/Button";
import Card from "../Ui/Card/Card";
import classes from "./AddDB.module.css";
import { addDBProps } from "../../types/addDB/addDB";

export const AddDB = ({ onClose }: addDBProps) => {
  const DBctx = useContext(DBContext);
  const [url, setUrl] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const urlIsInvalid = url.trim() === "" && isTouched;

  const urlInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const submitHandler = () => {
    if (urlIsInvalid) return;
    console.log("from addDB", url);
    const completedUrl = url + "task";
    DBctx.setUrl(completedUrl);

    onClose();
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return (
    <div className={classes.modal}>
      <Card className={classes.content}>
        <div className={urlIsInvalid ? classes.invalid : classes.valid}>
          <label htmlFor="url">
            Inserire l'url del DB (preferibilmente FireBase)
          </label>
          <div className={classes.input}>
            <input
              type="text"
              id="url"
              onChange={urlInputHandler}
              onBlur={blurHandler}
            />
          </div>
          <Button
            type="button"
            onClick={submitHandler}
            disabled={url.trim() === ""}
          >
            Inserisci il link
          </Button>
          {urlIsInvalid ? <p>Inserire un url valido</p> : <p></p>}
        </div>
      </Card>
    </div>
  );
};

