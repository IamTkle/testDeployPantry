import {
  AppBar,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  useTheme,
  createStyles,
  Hidden,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import QRCode from "qrcode.react";
import React from "react";

interface QRProps {
  setNavOpen: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    qrContainer: {
      backgroundColor: theme.palette.primary.light,
      position: "fixed",
      width: "100%",
      height: "100%",
      // minHeight: "100vh",
      left: theme.spacing(30),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        left: 0,
      },
    },

    qrCode: {
      position: "relative",
      [theme.breakpoints.up("md")]: {
        right: theme.spacing(15),
      },
      borderRadius: "2rem",
      borderColor: theme.palette.primary.dark,
      borderStyle: "solid",
      borderWidth: "3px",
    },
    appBar: {
      backgroundColor: "white",
      position: "fixed",
      borderBottom: `3px solid ${theme.palette.primary.dark}`,
      [theme.breakpoints.up("md")]: {
        left: theme.spacing(30),
        width: "100%",
        visibility: "hidden",
      },
    },
  })
);

const fetchAccountID: () => string = () => {
  // const resp = fetch("")

  return "cum69cum69cum69cum69cum69cum69";
};

const QR: React.FC<QRProps> = ({ setNavOpen }) => {
  React.useEffect(() => setNavOpen(), [setNavOpen]);

  const [accountID] = React.useState(() => fetchAccountID());

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <AppBar classes={{ root: classes.appBar }}>
        <Toolbar>
          <IconButton color="primary" onClick={setNavOpen} size="medium">
            <ArrowBackIos />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Hidden mdUp>
        <Toolbar />
      </Hidden> */}
      <div className={classes.qrContainer}>
        <QRCode
          includeMargin
          value={accountID}
          className={classes.qrCode}
          level="H"
          size={theme.spacing(40)}
        />
      </div>
    </>
  );
};

export default QR;
