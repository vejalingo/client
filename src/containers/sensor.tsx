import React, { useState } from "react";
import { Divider, Grid, Stack, Switch, Typography } from "@mui/material";
import SensorItem from "components/sensorItem";
import { StyledButton } from "components/styles";
import useWebSocket, { WebSocketMessage } from "hooks/useWebSocket";
import { copy } from "constants/";

const SensorData: React.FC = () => {
  const [showConnected, setShowConnected] = useState(false);
  const [sensorData, sendMessage, connectWebSocket, disconnectWebSocket] =
    useWebSocket();

  const toggleSensor = (id: string, connected: boolean) => {
    const message: WebSocketMessage = {
      command: connected ? "disconnect" : "connect",
      id,
    };
    sendMessage(message);
  };

  const toggleFilter = () => {
    setShowConnected((prevShowConnected) => !prevShowConnected);
  };

  const filteredSensorData = showConnected
    ? sensorData.filter((sensor) => sensor.connected)
    : sensorData;

  return (
    <>
      <Grid container>
        <Grid item md={12} sm={3} p={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{copy.allSensors}</Typography>
            <Switch checked={showConnected} onChange={toggleFilter} />
            <Typography>{copy.connectedSensors}</Typography>
          </Stack>
          <Divider variant="middle" />
        </Grid>
      </Grid>

      {filteredSensorData?.map(({ id, name, connected, unit, value }) => (
        <SensorItem
          key={id}
          id={id}
          name={name}
          connected={connected}
          unit={unit}
          value={value}
          onToggleSensor={toggleSensor}
        />
      ))}

      <Grid container>
        <Grid item md={12} sm={3} p={10}>
          <Divider variant="middle" sx={{ margin: 10 }} />
          <StyledButton variant="outlined" onClick={connectWebSocket}>
            {copy.connectWs}
          </StyledButton>
          <StyledButton variant="outlined" onClick={disconnectWebSocket}>
            {copy.disconnectWS}
          </StyledButton>
        </Grid>
      </Grid>
    </>
  );
};

export default SensorData;
