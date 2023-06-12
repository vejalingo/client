import { styled } from "@mui/material/styles";
import { List, Button, Paper, Box } from "@mui/material";

export const StyledButton = styled(Button)(() => ({
  color: "#fff",
  margin: "4px",
}));

export const StyledList = styled(List)(() => ({
  width: "100%",
  backgroundColor: "#676a902e",
}));

export const StyledListSubheader = styled(List)(() => ({
  backgroundColor: "#676a902e",
  color: '#fff'
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#fff',
  boxShadow: 'none',
  borderRadius: 0,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderBottomRightRadius: '44px',
  borderBottomLeftRadius: '44px',
}));