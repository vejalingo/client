import React from "react";
import { Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GradeIcon from "@mui/icons-material/Grade";
import { StyledButton, StyledList, StyledListSubheader } from "./styles";

interface SensorItemProps {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string | null;
  onToggleSensor: (id: string, connected: boolean) => void;
}

const SensorItem: React.FC<SensorItemProps> = ({
  id,
  name,
  connected,
  unit,
  value,
  onToggleSensor,
}) => {
  const actionText = connected ? "Disconnect" : "Connect";
  const connectionStatus = connected ? "success" : "warning";
  const connectionText = connected ? "Connected" : "Disconnected";

  return (
    <Grid item md={4} xs={12}>
      <StyledList subheader={<StyledListSubheader>{name}</StyledListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon color={connectionStatus} />
          </ListItemIcon>
          <ListItemText primary={connectionText} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <AcUnitIcon />
          </ListItemIcon>
          <ListItemText secondary={unit} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText secondary={value || "-"} />
        </ListItem>

        <StyledButton
          variant="text"
          onClick={() => onToggleSensor(id, connected)}
        >
          {actionText}
        </StyledButton>
      </StyledList>
    </Grid>
  );
};

export default SensorItem;
