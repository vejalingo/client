import { useCallback, useEffect, useRef, useState } from "react";
import { WebSocketUrl } from "constants/";

export interface Sensor {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string | null;
}

export interface WebSocketMessage {
  command: string;
  id: string;
}

const useWebSocket = (): [
  Sensor[],
  (message: WebSocketMessage) => void,
  () => void,
  () => void
] => {
  const [sensorData, setSensorData] = useState<Sensor[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    ws.current = new WebSocket(WebSocketUrl);
    ws.current.onmessage = (event: MessageEvent) => {
      const sensorData = JSON.parse(event.data);
      setSensorData((prevData) => {
        const updatedData = prevData.map((sensor) => {
          if (sensor.id === sensorData.id) {
            return sensorData;
          }
          return sensor;
        });

        const isNewSensor = !updatedData.some(
          (sensor) => sensor.id === sensorData.id
        );
        if (isNewSensor) {
          updatedData.push(sensorData);
        }

        return updatedData;
      });
    };
  }, []);

  const disconnectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }
  }, []);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [connectWebSocket, disconnectWebSocket]);

  return [sensorData, sendMessage, connectWebSocket, disconnectWebSocket];
};

export default useWebSocket;
