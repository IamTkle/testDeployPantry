import { Theme } from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/styles";
import React from "react";

interface RecipeProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      marginLeft: theme.spacing(30),
      paddingTop: theme.spacing(2),
      height: "auto",
      minHeight: "100vh",
      backgroundColor: "#f1f9f3",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
  })
);

const Recipe: React.FC<RecipeProps> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return <div className={classes.pageContainer}></div>;
};

export default Recipe;
