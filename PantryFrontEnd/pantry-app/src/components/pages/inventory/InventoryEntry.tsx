import {
  Avatar,
  Box,
  Card,
  Collapse,
  CssBaseline,
  Divider,
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
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import {
  KeyboardArrowDownOutlined,
  Info as InfoIcon,
} from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { classicNameResolver } from "typescript";

type Item = any;

interface EntryProps {
  FoodIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  items?: Item[];
  name?: string;
  type?: string;
  quantity?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expandEntryButton: {
      transition: "transform 250ms ease-in-out",
    },
  })
);

const InventoryEntry: React.FC<EntryProps> = ({
  FoodIcon = InfoIcon,
  items = [],
  name = "Human food item 1",
  type = "Human food",
  quantity = 12,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Card>
        <ListItem divider>
          <ListItemAvatar>
            <Avatar variant="rounded">
              <FoodIcon />
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
                <Typography variant="h6">{name}</Typography>
                <IconButton>
                  <InfoIcon color="primary" />
                </IconButton>
                <Divider orientation="vertical" variant="middle" />
                <Typography variant="h5">x {quantity}</Typography>
              </Box>
            }
            secondary={`Earliest expiry: 30/02/2022\n${type}`}
            secondaryTypographyProps={{
              variant: "body2",
              color: "primary",
            }}
          />
          <ListItemIcon>
            <IconButton onClick={() => setOpen((prevOpen) => !prevOpen)}>
              <KeyboardArrowDownOutlined
                classes={{ root: classes.expandEntryButton }}
                style={isOpen ? { transform: "rotate(180deg)" } : {}}
              />
            </IconButton>
          </ListItemIcon>
        </ListItem>
        <LinearProgress variant="determinate" value={10} />
        <Collapse in={isOpen}>
          Items will go here, need to determine what items will contain
        </Collapse>
      </Card>
    </>
  );
};

export default InventoryEntry;
