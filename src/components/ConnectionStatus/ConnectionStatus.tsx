import style from './ConnectionStatus.module.css';

const ConnectionStatus = () => {
  let connection: string = "Disconnected";
  // the isConnected is just a placeholder for now, later when api will be integrated it will be displaying real status
  let currentDesk: string = "";
  let StatusColor: string = "red";
  const isConnected = false;
  if (isConnected) {
    connection = "Connected";
    currentDesk = "desk_23";
    StatusColor = "green";
  } else {
    connection = "Disconnected";
    currentDesk = "";
    StatusColor = "red";
  }


  return (
    <div className={style.ConnectionContainer}>
      <span className={style.StatusCircle} style={{ backgroundColor: StatusColor }}></span>
      <p> <span className={style.StatusText} style={{ color: StatusColor }}>{connection}</span> {currentDesk}</p>

    </div>
  );
};

export default ConnectionStatus;
