import * as React from "react";
import {
  styled,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  People,
  School,
  AdminPanelSettings,
  MeetingRoom,
  Groups,
} from "@mui/icons-material";
import { NavLink, Outlet } from "react-router-dom";

const drawerWidth = 260;

// Dark Theme konfiguratsiyasi
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3f51b5" },
    background: {
      default: "#0a1929", // Chuqur to'q ko'k
      paper: "#001e3c", // Drawer uchun biroz ochroq
    },
    text: {
      primary: "#ffffff",
      secondary: "#b2bac2",
    },
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  background: "rgba(10, 25, 41, 0.7)",
  backdropFilter: "blur(8px)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "none",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SiteBar() {
  const [open, setOpen] = React.useState(true);

  const links = [
    { link: "Teacher", path: "/admin/teacher", icon: <School /> },
    { link: "Student", path: "/admin/student", icon: <People /> },
    { link: "Manager", path: "/admin/manager", icon: <AdminPanelSettings /> },
    { link: "Room", path: "/admin/room", icon: <MeetingRoom /> },
    { link: "Group", path: "/admin/group", icon: <Groups /> },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              edge="start"
              sx={[{ mr: 2 }, open && { display: "none" }]}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: "bold", letterSpacing: 1 }}
            >
              CRM <span style={{ color: "#007fff" }}>DASHBOARD</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(255, 255, 255, 0.12)",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography
              variant="subtitle1"
              sx={{ mr: "auto", ml: 2, fontWeight: "bold" }}
            >
              Menu
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ opacity: 0.1 }} />
          <List sx={{ px: 1 }}>
            {links.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <NavLink
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    color: "inherit",
                  }}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  {({ isActive }) => (
                    <ListItemButton
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: isActive
                          ? "rgba(0, 127, 255, 0.15)"
                          : "transparent",
                        color: isActive ? "#007fff" : "#b2bac2",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive ? "#007fff" : "#b2bac2",
                          minWidth: 40,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.link}
                        primaryTypographyProps={{
                          fontSize: "0.9rem",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      />
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Box sx={{ p: 1 }}>
            <Outlet />
          </Box>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
