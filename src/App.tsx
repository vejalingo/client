import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Grid } from "@mui/material";
import SensorData from "containers/sensor";
import { StyledBox, StyledPaper } from "components/styles";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <StyledBox>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledPaper>
                <h1>(IoT) Sensors</h1>
              </StyledPaper>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <SensorData />
          </Grid>
        </StyledBox>
      </Container>
    </>
  );
};

export default App;
