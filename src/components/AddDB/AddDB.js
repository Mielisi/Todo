import React, { useContext, useState } from "react";
import DBContex from "../../Contex/contex-db";
import Button from "../Ui/Button/Button";
import Card from "../Ui/Card/Card";
import classes from "./AddDB.module.css";

const AddDB = (props) => {
  const context = useContext(DBContex);
  const [url, setUrl] = useState("");
  const [isTouched, setIsTouched] = useState(false)

  const urlIsInvalid = url.trim() === "" && isTouched

  const urlInpurtHandler = (event) => {
    setUrl(event.target.value);
  };

  const submitHandler = () => {
    if(urlIsInvalid) return
    console.log("fron addDB",url)
    const completedUrl = url+"task"
    context.setUrl(completedUrl);
    
    props.onClose()
  };

  const blurHandler = () =>{
    setIsTouched(true)
  }
  
  return (
    <div className={classes.modal}>
      <Card className={classes.contnet}>
        <div className={urlIsInvalid ? classes.invalid : classes.valid}>
          <label htmlFor="url">Inserire l'url del DB (Preferibbilmente FireBase)</label>
          <div className={classes.input}>
            <input type="text" id="url" onChange={urlInpurtHandler} onBlur={blurHandler}/>
          </div>
          <Button type="button" onClick={submitHandler} disabled={url.trim() === ""}>Inserisci il link</Button>
          {urlIsInvalid ? <p>Inserire un url valido</p> : <p></p>}
        </div>

      </Card>
    </div>
  );
};

export default AddDB;
