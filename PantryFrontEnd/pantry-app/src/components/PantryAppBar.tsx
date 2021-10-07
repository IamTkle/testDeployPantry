import {
  AppBar,
  FormControl,
  Hidden,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Theme,
  Typography,
  createStyles,
  useTheme,
} from "@material-ui/core";
import HamburgerMenuIcon from "@material-ui/icons/Menu";
import React from "react";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import FilterIcon from "@material-ui/icons/TuneOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "auto",
      left: theme.spacing(30),
      backgroundColor: theme.palette.background.default,
      borderBottom: "3px solid " + theme.palette.primary.dark,
      [theme.breakpoints.down("sm")]: {
        left: 0,
      },
    },

    titleTypography: {
      color: theme.palette.primary.dark,
      [theme.breakpoints.down("sm")]: {
        fontSize: 25,
        marginLeft: theme.spacing(1),
      },
    },

    searchInput: {
      marginLeft: "auto",
    },

    openMenuButtonContainer: {
      [theme.breakpoints.down("xs")]: {
        marginRight: "auto",
      },
    },

    ascendingTrack: {
      backgroundColor: theme.palette.secondary.main,
    },

    textRoot: {
      right: 0,
      top: 0,
      width: "auto",
      borderWidth: 10,
      transition: "width 250ms ease-in-out",
      float: "right",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },

    title: {
      fontSize: "2rem",
      alignSelf: "center",
      marginRight: "auto",
      marginLeft: theme.spacing(4),
      fontWeight: "bolder",
      letterSpacing: 3,
    },
  })
);

interface PantryAppBarProps {
  handleOpenMenu: () => void;
  handleSearchClick: (searchTerm: string) => void;
  handleSortTypeChosen: (sortType: number, desc: boolean) => void;
  handleSortDirectionChange: (sortType: number, desc: boolean) => void;
}

const PantryAppBar: React.FC<PantryAppBarProps> = ({
  handleOpenMenu,
  handleSearchClick,
  handleSortDirectionChange,
  handleSortTypeChosen,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [sortDescending, setSortDescending] = React.useState(true);

  const [sortType, setSortType] = React.useState(0);

  return (
    <AppBar
      color="default"
      variant="elevation"
      position="fixed"
      className={classes.appBar}
      classes={{ root: classes.appBar }}
    >
      <Hidden mdUp>
        <IconButton
          onClick={handleOpenMenu}
          color="primary"
          className={classes.openMenuButtonContainer}
        >
          <HamburgerMenuIcon style={{ color: theme.palette.primary.dark }} />
        </IconButton>
      </Hidden>
      <Hidden xsDown>
        <Typography
          variant={"h2"}
          classes={{ root: classes.titleTypography }}
          color="textPrimary"
          className={classes.title}
        >
          Inventory
        </Typography>
      </Hidden>

      <TextField
        placeholder="Search for an item"
        size="medium"
        color="primary"
        variant="outlined"
        classes={{ root: classes.textRoot }}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          classes: {
            root: classes.searchInput,
          },
          endAdornment: (
            <IconButton onClick={() => handleSearchClick(searchTerm)}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      <IconButton
        onClick={(e) => {
          setFilterMenuOpen(true);
          setAnchorEl(e.currentTarget);
        }}
      >
        <FilterIcon />
      </IconButton>

      <Menu
        variant="menu"
        open={filterMenuOpen}
        anchorEl={anchorEl}
        keepMounted
        onClose={() => setFilterMenuOpen(false)}
      >
        <FormControl>
          <MenuItem
            style={{ cursor: "default" }}
            onClick={() => {
              setSortDescending((prev) => !prev);
              handleSortDirectionChange(sortType, !sortDescending);
            }}
          >
            Ascending
            <Switch
              color="primary"
              checked={sortDescending}
              classes={{
                track: classes.ascendingTrack,
              }}
            />
            Descending
          </MenuItem>
        </FormControl>
        <MenuItem
          value="expiry"
          key={0}
          onClick={() => {
            setSortType(0);
            handleSortTypeChosen(0, sortDescending);
          }}
          tabIndex={0}
          selected={sortType === 0}
        >
          By expiry date
        </MenuItem>
        <MenuItem
          value="name"
          key={1}
          tabIndex={1}
          selected={sortType === 1}
          onClick={() => {
            setSortType(1);
            handleSortTypeChosen(1, sortDescending);
          }}
        >
          By item name
        </MenuItem>
        <MenuItem
          value="category"
          key={2}
          tabIndex={2}
          selected={sortType === 2}
          onClick={() => {
            setSortType(2);
            handleSortTypeChosen(2, sortDescending);
          }}
        >
          By category
        </MenuItem>
        <MenuItem
          value="quantity"
          key={3}
          tabIndex={3}
          selected={sortType === 3}
          onClick={() => {
            setSortType(3);
            handleSortTypeChosen(3, sortDescending);
          }}
        >
          By quantity
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default PantryAppBar;
