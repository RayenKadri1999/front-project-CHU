import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../appStore";
import { LayoutDashboard,  Upload } from "lucide-react";
import { FolderEdit, UserPlus } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Typography } from "@mui/material";
import { BookmarkCheck } from 'lucide-react';
import { Users } from 'lucide-react';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const { username, role } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);

  const renderListItem = (text, icon, path) => (
    <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate(path)}>
      <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => useAppStore.setState({ dopen: !open })}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <List>
          {(role === "admin" || role === "superUser")&& renderListItem("Liste des patients", <LayoutDashboard />, "/afficherPatients")}
          {renderListItem("Ajouter patient", <FolderEdit />, "/ajouterPatient")}
          {role === "admin" && renderListItem("Ajouter utilisateur", <UserPlus />, "/ajouterUtilisateur")}
          {(role === "admin" || role === "superUser") && renderListItem("Afficher liste utilisateurs", <Users />, "/afficherUsers")}
          {(role === "admin" || role === "superUser") && renderListItem("Validations", <BookmarkCheck />, "/ManageRequest")}
          {role === "admin" && renderListItem("Transformer", <Upload />, "/Generate")}
        </List>

        <Divider />

        <Typography
          noWrap
          component="div"
          sx={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            padding: 2,
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          Current user: {username}<br />
          Status: {role}
        </Typography>
      </Drawer>
    </Box>
  );
}
