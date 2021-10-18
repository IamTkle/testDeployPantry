import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Container,
  createStyles,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  styled,
  Theme,
  useTheme
} from "@material-ui/core";
import {
  Clear,
  Done, Favorite,
  FavoriteBorderOutlined,
  MenuBook,
  Info,
} from "@material-ui/icons";
import React from "react";

// const useStyles = makeStyles((theme:Theme) => createStyles({

// }))

const StyledActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  color: theme.palette.background.default,
  backgroundColor: theme.palette.background.default,
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

    listItemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0,
        paddingInline: 0,
      },
    },

    entryInfoContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 0,
      },
    },

    entryAvatar: {
      aspectRatio: "1.35",
      minWidth: theme.spacing(10),
      height: "100%",
      outline: `3px solid ${theme.palette.secondary.main}`,
      margin: `${theme.spacing(2)}px 0px`,
    },

    actionButtonGroup: {
      [theme.breakpoints.up("md")]: {
        width: "30%",
      },
    },

    infoButton: {
      color: "#69abce",
      "&:hover": {
        color: "#69abce",
        opacity: 0.7,
      },
    },

    menuButton: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.7,
      },
      [theme.breakpoints.down("xs")]: {
        borderRadius: 0,
      },
    },

    addButton: {
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        opacity: 0.7,
      },
    },

    removeButton: {
      backgroundColor: theme.palette.error.main,

      "&:hover": {
        backgroundColor: theme.palette.error.main,
        opacity: 0.7,
      },
      [theme.breakpoints.down("xs")]: {
        borderRadius: 0,
      },
    },
  })
);

interface ShoppingListEntryProps {
  // recipeID: string;
  // name: string;
  // ingredients: string[];
  // img?: string;
  // fav: boolean;
  recipeID: string;
  name: string;
  category: string;
  intake: string;
  price: number;
  img?: string;
}

const ShoppingListEntry: React.FC<ShoppingListEntryProps> = ({
  // ingredients,
  // name,
  // recipeID,
  // img,
  // fav = false,
  recipeID,
  name,
  category,
  intake,
  price,
  img,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  //const ingredientsString = getIngredientsString(ingredients);

  //const [isFavorite, setIsFavorite] = React.useState(fav);
  const infoString = category + '\n' + intake;

  return (
    <Card elevation={3} classes={{ root: classes.cardContainer }}>
      <ListItem classes={{ root: classes.listItemContainer }}>
        <Container classes={{ root: classes.entryInfoContainer }}>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              src={img}
              classes={{ root: classes.entryAvatar }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {name}
                {/* <IconButton
                  onClick={() => setIsFavorite((prev) => !prev)}
                  size="small"
                >
                  {isFavorite ? (
                    <Favorite className={classes.favoritedButton} />
                  ) : (
                    <FavoriteBorderOutlined
                      style={{ color: theme.palette.text.secondary }}
                    />
                  )}
                </IconButton> */}
                <IconButton size="small">
                  <Info className={classes.infoButton} />
                </IconButton>
              </Container>
            }
            //secondary={<Container>{ingredientsString}</Container>}
            secondary={<Container>{infoString}</Container>}
          />
        </Container>

        <ButtonGroup
          variant="contained"
          size="large"
          fullWidth
          className={classes.actionButtonGroup}
        >
          <StyledActionButton className={classes.menuButton}>
            <MenuBook />
          </StyledActionButton>
          <StyledActionButton className={classes.removeButton}>
            <Clear />
          </StyledActionButton>
          <StyledActionButton className={classes.addButton}>
            <Done />
          </StyledActionButton>
        </ButtonGroup>
      </ListItem>
    </Card>
  );
};

const getIngredientsString = (ingredients: string[]) => {
  var igstr = "";

  var itersCount = 5;

  var plusOthers = true;

  if (ingredients.length <= 5) {
    itersCount = ingredients.length;
    plusOthers = false;
  }

  for (let i = 0; i < itersCount; i++) {
    igstr += ingredients[i];
    if (i + 1 < itersCount) igstr += ", ";
  }

  if (plusOthers) {
    igstr += `+ ${ingredients.length - 5} more`;
  }

  return igstr;
};

export default ShoppingListEntry;
