import {
  AppBar,
  makeStyles,
  TextField,
  Theme,
  useTheme,
} from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "auto",
      height: "100vh",
      backgroundColor: theme.palette.text.secondary,
      padding: "2rem",
    },
    searchField: {
      left: 0,
      width: 500,
      "&:focus": {
        width: 2000,
      },
      borderWidth: 10,
    },
  })
);

interface InventoryProps {
  openNavbar: () => void;
  closeNavbar: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ openNavbar, closeNavbar }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.container} onClick={() => closeNavbar()}>
      <AppBar
        color="transparent"
        style={{ padding: 10, display: "flex", justifyContent: "center" }}
      >
        {/* <Toolbar> */}
        <form style={{ left: 0 }}>
          <TextField
            placeholder="Search"
            color="primary"
            label="Search"
            variant="outlined"
            className={classes.searchField}
          />
        </form>
        {/* </Toolbar> */}
      </AppBar>
    </div>
  );
};

export default Inventory;
