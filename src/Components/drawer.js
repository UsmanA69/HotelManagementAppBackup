import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{
          ...(open && { display: "none" }),
          position: "absolue",
          top: "0",
          left: "180px",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuItem>
          <Link to="/dashboard/addroom">
            <Button
              variant="outlined"
              color="inherit"
              sx={{ margin: "5px", width: "150px" }}
            >
              Add Room
            </Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ margin: "5px", width: "150px" }}
          >
            Edit Rooms
          </Button>
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard/deleterooms">
            <Button
              variant="outlined"
              color="inherit"
              sx={{ margin: "5px", width: "150px" }}
            >
              Delete Room
            </Button>
          </Link>
        </MenuItem>
      </Drawer>
    </>
  );
}
