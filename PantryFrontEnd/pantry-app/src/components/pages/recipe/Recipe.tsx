import {
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import {
  Add,
  AddBox,
  Block,
  Edit,
  Favorite,
  List as ListIcon,
} from "@material-ui/icons";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import PantryAppBar from "../../PantryAppBar";
import { Recipe } from "../shoppinglist/mockEntries";
import { browseRecipes as importedBR, likedRecipes } from "./mockEntries";
import { StyledActionButton } from "./RecipeEntry";
import RecipeTab from "./RecipeTab";

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
      bottom: theme.spacing(11),
      right: theme.spacing(2),
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    saveEditButton: {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.primary.dark,
      margin: theme.spacing(2),
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    editButton: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },

    removeButton: {
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.light,
      },
    },

    addButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      width: "auto",
      marginBlock: theme.spacing(5),
      marginInline: theme.spacing(5),
    },
  })
);

const RecipePage: React.FC<RecipeProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const [browseRecipes, setBrowseRecipes] = React.useState(importedBR);

  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  const [editDialogOpen, setEditDialog] = React.useState(false);

  const [currRecipe, setCurrRecipe] = React.useState<Recipe>();

  const handleOpenEdit = (recipe: Recipe) => {
    setCurrRecipe(recipe);
    setEditDialog(true);
  };

  const handleRemove = (recipe: Recipe) => {
    setBrowseRecipes((recipes) =>
      recipes.filter((cur) => cur.name !== recipe.name)
    );
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

      {currRecipe && (
        <Dialog
          fullScreen={fullScreen}
          open={editDialogOpen}
          maxWidth="sm"
          onClose={() => setEditDialog(false)}
          fullWidth
        >
          <DialogTitle>
            {currRecipe.name}
            <IconButton>
              <Edit />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <List>
              {currRecipe.ingredients.map((ig, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemText primary={ig} />
                    <ButtonGroup
                      variant="contained"
                      fullWidth
                      size="large"
                      style={{ width: "40%" }}
                    >
                      <StyledActionButton
                        classes={{ root: classes.editButton }}
                      >
                        <Edit />
                      </StyledActionButton>
                      <StyledActionButton
                        classes={{ root: classes.removeButton }}
                      >
                        <Block />
                      </StyledActionButton>
                    </ButtonGroup>
                  </ListItem>
                );
              })}
              <MenuItem style={{}} className={classes.addButton}>
                {/* <IconButton color="primary" size="medium"> */}
                <AddBox />
                {/* </IconButton> */}
              </MenuItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.saveEditButton}
              variant="contained"
              onClick={() => setEditDialog(false)}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Tabs
        value={activeTab}
        variant="fullWidth"
        onChange={handleTabChange}
        classes={{ root: classes.tabBar, indicator: classes.tabIndicator }}
      >
        <Tab wrapped label="browse" value={0} icon={<ListIcon />} />
        <Tab wrapped label="favorites" value={1} icon={<Favorite />} />
      </Tabs>
      <Container style={{ paddingBottom: 16, maxWidth: "none" }}>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={(index) => setActiveTab(index)}
        >
          <RecipeTab
            activeTab={activeTab}
            index={0}
            propEntries={browseRecipes}
            key={0}
            handleOpenEdit={handleOpenEdit}
            handleAdd={() => {}}
            handleRemove={handleRemove}
          />

          <RecipeTab
            activeTab={activeTab}
            index={1}
            propEntries={likedRecipes}
            key={1}
            handleOpenEdit={handleOpenEdit}
            handleAdd={() => {}}
            handleRemove={handleRemove}
          />
        </SwipeableViews>
      </Container>
      <Fab size="large" color="secondary" classes={{ root: classes.fab }}>
        <Add />
      </Fab>
    </div>
  );
};

export default RecipePage;
