import style from './ConnectionStatus.module.css';

const ConnectionStatus = () => {
  return (
    <div className={style.ConnectionContainer}>
      <span className={style.StatusCircle}></span>
      <p> <span className={style.StatusText}>Disconnected:</span> desk_23</p>

    </div>
  );
};

export default ConnectionStatus;
