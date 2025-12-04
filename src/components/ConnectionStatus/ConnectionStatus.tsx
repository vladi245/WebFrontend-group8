import { useState, useEffect } from 'react';
import style from './ConnectionStatus.module.css';
import Status from './Status';
import { apiFetch } from '../../services/api';

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [deskId, setDeskId] = useState<string | null>(null);
  const [currentHeight, setCurrentHeight] = useState<number | null>(null);

  const checkConnection = async (userDeskId: string) => {
    try {
      const res = await apiFetch(`/api/desks/connection/status?deskId=${encodeURIComponent(userDeskId)}`);
      const data = await res.json();

      setIsConnected(data.connected === true);
      if (data.connected && data.currentHeight) {
        setCurrentHeight(data.currentHeight);
      }
    } catch (e) {
      console.error('Failed to check connection status', e);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    // Get user from localStorage and check for current_desk_id
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.current_desk_id) {
          setDeskId(user.current_desk_id);
          // Check connection immediately
          checkConnection(user.current_desk_id);

          // Poll every 5 seconds
          const interval = setInterval(() => {
            checkConnection(user.current_desk_id);
          }, 5000);

          return () => clearInterval(interval);
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  const connection = isConnected ? "Connected:" : "Disconnected";
  const currentDesk = deskId || "";
  const statusColor = isConnected ? "green" : "red";

  return (
    <div className={style.ConnectionContainer}>
      <Status statusColor={statusColor} connectionLabel={connection} currentDeskLabel={currentDesk} />
    </div>
  );
};

export default ConnectionStatus;
