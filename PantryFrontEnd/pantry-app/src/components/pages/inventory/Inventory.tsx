import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tab,
  Tabs,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useTheme,
  Divider,
  CssBaseline,
  Collapse,
  Card,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { createStyles } from "@material-ui/core/styles";
import { KeyboardArrowDownOutlined } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import FilterIcon from "@material-ui/icons/TuneOutlined";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
import tabs from "./tabs";
import InventoryEntry from "./InventoryEntry";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100vh",
      marginLeft: theme.spacing(35),
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(4),
    },
    root: {
      right: 0,
      top: 0,
      width: theme.spacing(6),
      borderWidth: 10,
      transition: "width 250ms ease-in-out",
      float: "right",
      "&.Mui-focused": {
        // width: theme.spacing(50),
        width: theme.spacing(100),
        float: "right",
      },
    },
    appBar: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: `calc(100vw - ${theme.spacing(35)}px)`,
    },
    title: {
      fontSize: "2rem",
      alignSelf: "center",
      marginRight: "auto",
      marginLeft: theme.spacing(4),
      fontWeight: "bolder",
      letterSpacing: 3,
    },
    tabBar: {
      color: theme.palette.text.primary,
      "&.Mui-selected": {
        fontWeight: 400,
        fontSize: 24,
      },
    },
  })
);

interface InventoryProps {}

const Inventory: React.FC<InventoryProps> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [expanded, setExpanded] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, newTab: number) => {
    setActiveTab(newTab);
  };

  return (
    <div className={classes.container}>
      <AppBar
        color="transparent"
        variant="elevation"
        position="fixed"
        className={classes.appBar}
        classes={{ root: classes.appBar }}
      >
        <Typography variant="h2" color="textPrimary" className={classes.title}>
          Inventory
        </Typography>
        <TextField
          placeholder="Search for an item in the inventory"
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          size="medium"
          color="primary"
          variant="outlined"
          InputProps={{
            classes: {
              focused: classes.root,
              root: classes.root,
            },
            endAdornment: expanded ? (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ) : (
              <SearchIcon
                onClick={(e) => {
                  e.currentTarget.parentElement
                    ? e.currentTarget.parentElement.click()
                    : console.log("parent null");
                }}
              />
            ),
          }}
        />
        <IconButton>
          <FilterIcon />
        </IconButton>
      </AppBar>

      <Toolbar />
      <Container>
        <Tabs
          value={activeTab}
          variant="scrollable"
          scrollButtons="on"
          onChange={handleTabChange}
          classes={{ root: classes.tabBar }}
        >
          {tabs.map((tab, i) => {
            return <Tab wrapped label={tab.label} value={i} icon={tab.icon} />;
          })}
        </Tabs>
        <Toolbar />

        <SwipeableViews
          index={activeTab}
          onChangeIndex={(index) => setActiveTab(index)}
        >
          {activeTab === 0 && (
            <Container>
              <List>
                <InventoryEntry />

                <Card>
                  <ListItem divider>
                    <ListItemAvatar>
                      <Avatar variant="rounded">
                        {tabs[0] ? tabs[0].icon : null}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                          minHeight={0}
                        >
                          <CssBaseline />
                          <Typography variant="h6">
                            Human food item 2
                          </Typography>
                          <IconButton>
                            <InfoIcon color="primary" />
                          </IconButton>
                          <Divider
                            orientation="vertical"
                            color={theme.palette.text.primary}
                            variant="middle"
                          />
                          <Typography variant="h5">x 2</Typography>
                        </Box>
                      }
                      secondary="Earliest expiry: 30/02/2022"
                      secondaryTypographyProps={{
                        variant: "body2",
                        color: "secondary",
                      }}
                    />
                    <ListItemIcon>
                      <IconButton>
                        <KeyboardArrowDownOutlined />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                  <Collapse>Tabs</Collapse>
                  <LinearProgress
                    variant="determinate"
                    value={90}
                    color="secondary"
                  />
                </Card>
              </List>
            </Container>
          )}
          {activeTab === 1 && (
            <Container>
              <List>
                <InventoryEntry />
              </List>
            </Container>
          )}
        </SwipeableViews>
      </Container>
    </div>
  );
};

export default Inventory;
