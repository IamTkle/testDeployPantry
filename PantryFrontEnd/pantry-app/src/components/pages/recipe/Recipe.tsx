import { Container, Fab, Tab, Tabs, Theme, Toolbar } from "@material-ui/core";
import { Add, Favorite, List } from "@material-ui/icons";
import { makeStyles, createStyles, useTheme } from "@material-ui/styles";
import React from "react";
import PantryAppBar from "../../PantryAppBar";
import RecipeEntry from "./RecipeEntry";

interface RecipeProps {
  setNavOpen: () => void;
}

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

    tabBar: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      width: "100%",
    },

    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  })
);

const Recipe: React.FC<RecipeProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.pageContainer}>
      <PantryAppBar
        title={"Recipes"}
        handleOpenMenu={setNavOpen}
        handleSearchClick={(searchTerm) => console.log(searchTerm)}
        handleSortDirectionChange={handleSortDirectionChange}
        handleSortTypeChosen={handleSortTypeChosen}
      />
      <Toolbar />
      <Tabs
        value={activeTab}
        variant="fullWidth"
        onChange={handleTabChange}
        classes={{ root: classes.tabBar }}
      >
        <Tab wrapped label="browse" value={0} icon={<List />} />
        <Tab wrapped label="favorites" value={1} icon={<Favorite />} />
      </Tabs>
      <Container>
        <RecipeEntry
          ingredients={["bols in yo jaws"]}
          name="My Recipe"
          recipeID="3432P"
        />
      </Container>
      <Fab size="large" color="secondary" className={classes.fab}>
        <Add />
      </Fab>
    </div>
  );
};

export default Recipe;
