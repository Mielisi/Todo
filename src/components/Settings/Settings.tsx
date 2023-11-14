import {Card} from "../Ui/Card/Card";

import classes from "./Settings.module.css";

const Settings = () => {
  const history = {
    push: (url: string) => {},
  };

  const urlSettingHandler = () => {
    history.push("/home/settings/gestione-url");
  };

  return (
    <Card className={classes.settings}>
      <ul className={classes.settingsList}>
        <li className={classes.settingsItem}>
          <p>Modifica/Elimina l'URL del DB</p>

          <button onClick={urlSettingHandler}>Gestisci l'URL</button>
        </li>
      </ul>
    </Card>
  );
};

export default Settings;
