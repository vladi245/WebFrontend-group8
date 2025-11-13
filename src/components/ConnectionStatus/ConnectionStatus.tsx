import style from './ConnectionStatus.module.css';
import Status from './Status';
const ConnectionStatus = () => {
  let connection: string = "Disconnected";
  // the isConnected is just a placeholder for now, later when api will be integrated it will be displaying real status
  let currentDesk: string = "";
  let StatusColor: string = "red";
  const isConnected = false;
  if (isConnected) {
    connection = "Connected: ";
    currentDesk = "desk_23";
    StatusColor = "green";
  } else {
    connection = "Disconnected:";
    currentDesk = "";
    StatusColor = "red";
  }


  return (
    <div className={style.ConnectionContainer}>
      <Status statusColor={StatusColor} connectionLabel={connection} currentDeskLabel={currentDesk} />
    </div>
  );
};

export default ConnectionStatus;
