import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { DBContext } from "../../Context/context-db";
import { Button } from "../Ui/Button/Button";
import {Card} from "../Ui/Card/Card";
import classes from "./ManageUrl.module.css";

export const ManageUrl = () => {
  const { ur, setUrl } = useContext(DBContext);
  const [urlChange, setUrlChange] = useState("");
  const [errorUrl, setErrorUrl] = useState(<p></p>);

  const [showForm, setShowForm] = useState(false);

  const urlChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlChange(event.target.value);
  };

  const deleteUrlHandler = () => {
    localStorage.setItem("url", "");
    setUrl("");
    setShowForm(false);
  };

  const formChangeUrlHandler = () => {
    setShowForm((state) => !state);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (urlChange.trim() !== "") {
      setErrorUrl(<p></p>);
      setUrl(urlChange + "task");
    } else {
      setErrorUrl(<p className={classes.error}>Inserisci l'url</p>);
    }
  };

  let centerContent = <p></p>;

  if (ur === "") {
    centerContent = (
      <p className={classes.deleting}>Sto eliminando l'URL attendere</p>
    );
  } else if (showForm) {
    centerContent = (
      <form className={classes.form} onSubmit={submitHandler}>
        <p>L'url attuale e': {ur}</p>
        <label htmlFor="newUrl"> inserisci il nuovo url</label>
        <input type="text" id="newUrl" onChange={urlChangeHandler} />
        <Button className={classes.changeUrl} type="submit">
          Cambia l'url
        </Button>
        {errorUrl}
      </form>
    );
  } else {
    centerContent = <p></p>;
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
        <div className={classes.bottom}>{centerContent}</div>
      </div>
    </Card>
  );
};
