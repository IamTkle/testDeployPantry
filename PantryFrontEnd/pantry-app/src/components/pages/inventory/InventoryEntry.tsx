import {
  Avatar,
  Card,
  Collapse,
  Container,
  CssBaseline,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Theme,
  Typography,
  useTheme,
  Button,
  Hidden,
  ButtonGroup,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import {
  KeyboardArrowDownOutlined,
  Info as InfoIcon,
} from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { Item } from "./mockEntries";

interface EntryProps {
  FoodIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  items?: Item[];
  name?: string;
  category?: string;
  quantity?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expandEntryButton: {
      transition: "transform 250ms ease-in-out",
    },
    mainTextContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 0,
      paddingLeft: theme.spacing(1),
    },
    embeddedMainTextContainer: {
      padding: 0,
      margin: 0,
      minWidth: 0,
      width: "fit-content",
    },
    secondaryTextContainer: {
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
    },
    entryAvatarRoot: {
      height: "100%",
      aspectRatio: "1 / 1",
      minWidth: theme.spacing(16),
      [theme.breakpoints.down("xs")]: {
        minWidth: theme.spacing(10),
      },
    },
    h5Down: {
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.h6.fontSize,
      },
    },
    h6Down: {
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.body1.fontSize,
      },
    },
    h2Down: {
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    body1Down: {
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    infoButton: {
      // color: "#97A7E5",
      color: "#AD9FCE",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
      },
    },
    infoExpandButtonGroup: {
      maginLeft: theme.spacing(2),
      marginBottom: theme.spacing(9),
      [theme.breakpoints.down("xs")]: {
        marginLeft: "auto",
        marginBottom: 0,
      },
    },
  })
);

const InventoryEntry: React.FC<EntryProps> = ({
  FoodIcon = InfoIcon,
  items = [],
  name = "Human food item 1",
  category = "Human food",
  quantity = "1kg",
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isOpen, setOpen] = React.useState(false);
  const [deadlineProgress] = React.useState(() => Math.random() * 100);
  // const [deadlineProgress] = React.useState(50);

  return (
    <>
      <Card
        elevation={3}
        style={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
        }}
      >
        <ListItem component="li">
          <ListItemAvatar
            classes={{
              root: classes.entryAvatarRoot,
            }}
          >
            <Avatar variant="rounded" style={{ width: "100%", height: "100%" }}>
              <FoodIcon />
              {/* <img
                src="https://spoonacular.com/recipeImages/716429-556x370.jpg"
                alt="recipe"
                width={`${theme.spacing(16)}`}
              ></img> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Container classes={{ root: classes.mainTextContainer }}>
                <CssBaseline />
                <Container
                  classes={{ root: classes.embeddedMainTextContainer }}
                >
                  <Typography
                    variant="h6"
                    // noWrap
                    classes={{ root: classes.h6Down }}
                    display="block"
                  >
                    {name}
                  </Typography>
                  <Typography
                    paragraph={false}
                    color="textSecondary"
                    display="inline"
                    classes={{ root: classes.body1Down }}
                  >
                    {category}
                  </Typography>
                  <Typography
                    // noWrap
                    variant="h5"
                    display="block"
                    color="textSecondary"
                    // style={{ marginLeft: theme.spacing(1) }}
                    classes={{ root: classes.h5Down }}
                  >
                    {quantity}
                  </Typography>
                </Container>
                <ButtonGroup
                  orientation="vertical"
                  variant="outlined"
                  className={classes.infoExpandButtonGroup}
                >
                  <Hidden>
                    <IconButton className={classes.infoButton}>
                      <InfoIcon
                        color="primary"
                        fontSize="medium"
                        className={classes.infoButton}
                      />
                    </IconButton>
                  </Hidden>
                  <Hidden smUp>
                    <IconButton
                      onClick={() => setOpen((prevOpen) => !prevOpen)}
                      color="primary"
                    >
                      <KeyboardArrowDownOutlined
                        fontSize="medium"
                        classes={{ root: classes.expandEntryButton }}
                        style={isOpen ? { transform: "rotate(180deg)" } : {}}
                      />
                    </IconButton>
                  </Hidden>
                </ButtonGroup>
              </Container>
            }
            secondary={
              <Container classes={{ root: classes.secondaryTextContainer }}>
                <Typography
                  variant="body1"
                  paragraph={false}
                  display="inline"
                  classes={{ root: classes.body1Down }}
                  color="textPrimary"
                >
                  Earliest expiry:
                </Typography>
                <Typography
                  color={deadlineProgress >= 50 ? "secondary" : "primary"}
                  display="inline"
                  style={{ marginLeft: theme.spacing(1) }}
                >
                  30/02/2022
                </Typography>
              </Container>
            }
          />
          <Hidden mdDown>
            <Container maxWidth="sm" disableGutters={true}>
              <LinearProgress
                variant="determinate"
                value={deadlineProgress}
                color={deadlineProgress >= 50 ? "secondary" : "primary"}
              />
            </Container>
          </Hidden>
          <Hidden xsDown>
            <ListItemIcon>
              <IconButton
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                color="primary"
              >
                <KeyboardArrowDownOutlined
                  fontSize="medium"
                  classes={{ root: classes.expandEntryButton }}
                  style={isOpen ? { transform: "rotate(180deg)" } : {}}
                />
              </IconButton>
            </ListItemIcon>
          </Hidden>
        </ListItem>
        <Hidden lgUp>
          <Container disableGutters={true}>
            <LinearProgress
              variant="determinate"
              value={deadlineProgress}
              color={deadlineProgress >= 50 ? "secondary" : "primary"}
            />
          </Container>
        </Hidden>
        <Collapse in={isOpen}>
          <Typography
            paragraph={true}
            style={{ marginTop: 12 }}
            variant="body2"
          >
            Items will go here, need to determine what items will contain
          </Typography>
        </Collapse>
      </Card>
    </>
  );
};

export default InventoryEntry;
