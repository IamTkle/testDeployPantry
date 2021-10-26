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
  useTheme,
  Box,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  AddCircle,
  Clear,
  Done, Info, MenuBook, RemoveCircle
} from "@material-ui/icons";
import React from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { ShoppingListEntry as shopListEntry, shoppingListAPIitem } from "./mockEntries";

// const useStyles = makeStyles((theme:Theme) => createStyles({

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

    disabledDec: {
      "&.Mui-disabled": {
        backgroundColor: theme.palette.text.secondary,
      },
    },

    incDecGroup: {
      backgroundColor: theme.palette.primary.light,
    },

    buttonCounter: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: theme.palette.text.primary,
      opacity: 1,
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

    collapseRoot: {
      backgroundColor: theme.palette.primary.light,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },

    collapseRootHidden: {
      paddingTop: 0,
      paddingBottom: 0,
    },

  })
);

interface ShoppingListEntryProps {
  //name: string;
  // category: string;
  // shoppingList: shopListEntry;
  // handleRemove: (shoppingList: shopListEntry) => void;
  // handleAdd: (shoppingList: shopListEntry) => void;
  i: number;
  item: shoppingListAPIitem;
}

const ShoppingListEntry: React.FC<ShoppingListEntryProps> = ({
  // name,
  // category,
  // shoppingList,
  // handleRemove,
  // handleAdd,
  i,
  item
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const itemQuantity = "x" + item.count;
  //const infoString = item.;
  const itemPrice = "$" + item.price;
  const priceCalc = item.count * item.price;
  const totalPrice = "$" + priceCalc.toFixed(2);
  
  const [count, setCount] = React.useState(item.count)
  // const handleItemDone = () => {
  //   handleAdd(item);
  // }

  // const handleItemDelete = () => {
  //   handleRemove(item);
  // }

  const handleItemIncrement = () => {
    setCount(count+1);
    console.log(count);
  }

  const handleItemDecrement = () => {
    setCount(count - 1);
    console.log(count);
  }


  return (
    <Card elevation={3} classes={{ root: classes.cardContainer }}>
      <ListItem classes={{ root: classes.listItemContainer }}>
        <Container classes={{ root: classes.entryInfoContainer }}>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              //src={item.}
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
                {item.name}
        
                <IconButton size="small">
                  <Info className={classes.infoButton} />
                </IconButton>
              </Container>
            }
            // secondary={<Container>{infoString}</Container>}
          />

          <ListItemText 
            primary={
              <Container 
              style={{
                  color: 'grey',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
               }}>
                  
                  {/* <div style={{ width: '100%'}}> */}
                    <Box
                    sx={{
                      fontSize: "20px",
                      display: 'flex',
                      justifyContent: 'center',
                      p: 1,
                      m: 1,
                      bgcolor: 'background.paper',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'row', p: 2, flexGrow: 1}}>{itemPrice}</Box>
                    {/* <Box sx={{ p: 1, flexGrow: 1}}>{itemQuantity}</Box> */}  
                    
                    <Box sx={{ p: 1, flexGrow: 1}}>
                      <ButtonGroup
                        variant="outlined"
                        classes={{ groupedOutlinedHorizontal: classes.incDecGroup }}
                        color={"default"}
                      >

                      <IconButton
                        color="primary"
                        disabled={count === 1}
                        onClick={() => setCount((prevCount) => prevCount - 1)}
                        classes={{ disabled: classes.disabledDec }}
                      >
                        <RemoveCircle />
                        </IconButton>
                  
                      <Button
                        disabled
                        variant="text"
                        classes={{
                          text: classes.buttonCounter,
                        }}
                      >

                    {count}

                      </Button>
                      <IconButton
                        color="primary"
                        onClick={() => setCount((prevCount) => prevCount + 1)}
                      >
                        <AddCircle />
                      </IconButton>
                    </ButtonGroup>

                    </Box>

                    <Box sx={{ p: 2, flexGrow: 1}}>{totalPrice}</Box>
                  </Box>
                {/* </div> */}
              </Container>
            }
          />
        </Container>

        <ButtonGroup
          variant="contained"
          size="large"
          fullWidth
          className={classes.actionButtonGroup}
        >
          {/* <StyledActionButton className={classes.menuButton}>
            <MenuBook onClick={handleItemMenu} />
          </StyledActionButton> */}
          <StyledActionButton className={classes.removeButton}>
            <Clear  onClick={handleItemDecrement}/>
          </StyledActionButton>
          <StyledActionButton className={classes.addButton}>
            <Done onClick={handleItemIncrement}/>
          </StyledActionButton>
        </ButtonGroup>
      </ListItem>
    </Card>
  );
};

export default ShoppingListEntry;
