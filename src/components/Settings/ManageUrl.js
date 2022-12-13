import React, { useContext, useState } from "react";
import DBContex from "../../Contex/contex-db";
import Button from "../Ui/Button/Button";
import Card from "../Ui/Card/Card";
import classes from "./ManageUrl.module.css";

const ManageUrl = () => {
  const dbContex = useContext(DBContex);
  const [urlChange, setUrlChange] = useState("");
  const [errorUrl, setErrorUrl] = useState(<p></p>);

  const [showForm, setShowForm] = useState(false);

  const urlChangeHandler = (event) => {
    setUrlChange(event.target.value);
  };

  const deleteUrlHandler = () => {
    localStorage.setItem("url", "");
    dbContex.setUrl("");
    setShowForm(false);
  };

  const formChangeUrlHandler = () => {
    setShowForm((state) => !state);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (urlChange.trim() !== "") {
      setErrorUrl(<p></p>);
      dbContex.setUrl(urlChange + "task");
    } else {
      setErrorUrl(<p className={classes.error}>Inserirsic l'url</p>);
    }
  };

  let centerContnent = <p></p>;

  if (dbContex.ur === "") {
    centerContnent = <p className={classes.deleting}>Sto eliminando l'URL attendere</p>;
    
  } else if (showForm) {
    centerContnent = (
      <form className={classes.form} onSubmit={submitHandler}>
        <p>L'url attuale e': {dbContex.ur}</p>
        <label htmlFor="newUrl"> inserisci il nuovo url</label>
        <input type="text" id="newUrl" onChange={urlChangeHandler} />
        <Button className={classes.changeUrl} type="submit">
          Cambia l'url
        </Button>
        {errorUrl}
      </form>
    );
  }else{
    centerContnent = <p></p>
  }
  
  return (
    <Card className={classes.cardUrl}>
      <div className={classes.layoutDiv}>
        <div className={classes.top}>
          <div className={classes.supportDiv}>
            <Button onClick={deleteUrlHandler}>Elimina l'url</Button>
          </div>
          <div className={classes.supportEditDiv}>
            <Button className={classes.button} onClick={formChangeUrlHandler}>
              Modifica l'URL
            </Button>
          </div>
        </div>
        <div className={classes.bottom}>
          {centerContnent}
        </div>
      </div>
    </Card>
  );
};

export default ManageUrl;
