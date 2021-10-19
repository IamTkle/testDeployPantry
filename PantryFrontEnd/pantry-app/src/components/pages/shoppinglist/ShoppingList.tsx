import {
  Box, Chip, Container, createStyles, Fab, makeStyles, Theme,
  Toolbar, useTheme
} from "@material-ui/core";
import { Add, DeleteSweep, DoneAll, PlaylistAdd } from "@material-ui/icons";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import PantryAppBar from "../../PantryAppBar";
import { listInfo } from "./mockEntries";
import ShoppingListTab from "./ShoppingListTab";

interface RecipeProps {
  setNavOpen: () => void;
}

interface chipData {
  key: number;
  label: string
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
      position: "sticky",
      zIndex: 10,
      // bottom: 0,
      top: 0,
      [theme.breakpoints.up("md")]: {},
    },

    tabIndicator: {
      bottom: 0,
    },

    fab: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: "#ffb74d",
      },
    },

    fab2: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(15),
      right: theme.spacing(3),
      color: theme.palette.background.default,
      backgroundColor: "#f44336",
      "&:hover": {
        backgroundColor: "#e57373",
      },
    },
    
    fab3: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(3),
      right: theme.spacing(15),
      color: theme.palette.background.default,
      backgroundColor: "#4caf50",
      "&:hover": {
        backgroundColor: "#81c784",
      },
    },

    fab4: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(11),
      right: theme.spacing(10.5),
      color: theme.palette.background.default,
      backgroundColor: "#616161",
      "&:hover": {
        backgroundColor: "#9e9e9e",
      },
    },
  })
);

const ShoppingList: React.FC<RecipeProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(0);
  const [chipData, setChipData] = React.useState<chipData[]>([

  ]);

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleChipClick = () => {

  }


  return (
    <div className={classes.pageContainer}>
      <PantryAppBar
        title={"Shopping List"}
        handleOpenMenu={setNavOpen}
        handleSearchClick={(searchTerm) => console.log(searchTerm)}
        handleSortDirectionChange={handleSortDirectionChange}
        handleSortTypeChosen={handleSortTypeChosen}
      />
      <Toolbar />

      <Box 
      sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
      }}>

          <Chip
          size="medium"
          label="All"
          clickable
          color="primary"
          onClick={handleClick}
          />

          <Chip
          size="medium"
          label="Meat"
          clickable
          color="primary"
          onClick={handleClick}
          />

          <Chip
          size="medium"
          label="Vegetables"
          clickable
          color="primary"
          onClick={handleClick}
          />

          <Chip
          size="medium"
          label="Bakery"
          clickable
          color="primary"
          onClick={handleClick}
          />

          <Chip
          size="medium"
          label="Dairy"
          clickable
          color="primary"
          onClick={handleClick}
          />

          <Chip
          size="medium"
          label="Misc"
          clickable
          color="primary"
          onClick={handleClick}
          />
      </Box>

      <Container style={{ paddingBottom: 16, maxWidth: "none" }}>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={(index) => setActiveTab(index)}
        >
          <ShoppingListTab
            activeTab={activeTab}
            index={0}
            //propEntries={browseRecipes}
            propEntries={listInfo}
            key={0}
          />
        </SwipeableViews>
        
      </Container>

      <Fab size="large" color="secondary" classes={{ root: classes.fab }}>
        <Add />
      </Fab>

      <Fab size="large" classes={{ root: classes.fab2 }} >
        <DeleteSweep />
      </Fab>
      
      <Fab size="large" classes={{ root: classes.fab3 }} >
        <DoneAll />
      </Fab>

      <Fab size="large" classes={{ root: classes.fab4 }} >
        <PlaylistAdd />
      </Fab>

    </div>
  );
};

export default ShoppingList;