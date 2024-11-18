"use client";

import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { FiMenu, FiSearch, FiGrid } from "react-icons/fi";
import SettingsIcon from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { SiGoogleforms } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const drawerWidth = 240;

// Styled Main Content
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// Drawer Header
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (<div>

  
      <CssBaseline />
      {/* Navbar */}
      <nav className=" flex items-center justify-between bg-white px-4 py-3 shadow-md overflow-hidden">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className="p-2 hover:bg-neutral-100"
            sx={{
              display: open ? "none" : "block",
            }}
          >
            <FiMenu size={20} className="text-neutral-600" />
          </IconButton>
          <div className="flex items-center gap-2">
            {/* <div className=" w-10 h-10 rounded-md flex items-center justify-center"> */}
            <SiGoogleforms className="text-4xl text-purple-600"/>
            {/* </div> */}
            <h1 className="text-lg font-medium text-neutral-800">Forms</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center bg-neutral-100 px-4 py-2 rounded-full">
            <FiSearch size={18} className="text-neutral-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-neutral-100">
            <FiGrid size={20} className="text-neutral-600" />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 ">
            <img
              src="/images.png"
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <FcGoogle className="text-4xl mr-28"/>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Docs", "Sheets", "Slides", "Forms"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 4 === 0 ? (
                    <SiGoogleforms className="text-2xl text-blue-600"/>
                    ) : index % 4 === 1 ? (
                        <SiGoogleforms className="text-2xl text-green-600"/>
                    ) :index % 4 ===2 ? 
                    (
                        <SiGoogleforms className="text-2xl text-yellow-400"/>
                    ) :(
                        <SiGoogleforms className="text-2xl text-purple-600"/>
                    )
                    }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Settings", "Help & Feedback", "Drive"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                {index % 3 === 0 ? (
                    <SettingsIcon />
                    ) : index % 3 === 1 ? (
                    <QuizIcon />
                    ) : (
                    <AddToDriveIcon />
                    )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      </div>
  );
};

export default Navbar;
