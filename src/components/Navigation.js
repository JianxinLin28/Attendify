import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Drawer, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../constants/Attendify_centered.png";

const NavBar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldShowButtons = screenWidth >= 768;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2596ff",
        paddingTop: "15px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={`/dashboard/${localStorage.getItem("jwt")}`}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "115px",
              }}
            />
          </Link>
        </div>

        {shouldShowButtons ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              color="inherit"
              sx={{
                color: "#FFF",
                marginRight: "10px",
                "&:hover": {
                  color: "#ff8906",
                },
              }}
              component={Link}
              to={`/dashboard/${localStorage.getItem("jwt")}`}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              sx={{
                color: "#FFF",
                marginRight: "10px",
                "&:hover": {
                  color: "#ff8906",
                },
              }}
              component={Link}
              to="/createCourse"
            >
              Classes
            </Button>
            <Button
              color="inherit"
              sx={{
                color: "#FFF",
                marginRight: "10px",
                "&:hover": {
                  color: "#ff8906",
                },
              }}
              component={Link}
              to="/analytics"
            >
              Analytics
            </Button>
          </div>
        ) : (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}

        {shouldShowButtons ? (
          localStorage.getItem("jwt") ? (
            <a
              style={{
                color: "#fffffe",
                backgroundColor: "#ff8906",
                borderRadius: 10,
                padding: "10px 18px",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": {
                  color: "#ff8906",
                  backgroundColor: "#fffffe",
                },
              }}
              href="/"
              onClick={() => {
                localStorage.removeItem("jwt");
                localStorage.removeItem("userState");
              }}
            >
              Log Out
            </a>
          ) : null
        ) : null}
      </Toolbar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <div
          style={{
            width: "250px",
            padding: "20px",
            backgroundColor: "#2596ff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Vertically stacked buttons */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              color="inherit"
              sx={{
                color: "#FFF",
                marginBottom: "10px",
                "&:hover": {
                  color: "#ff8906",
                },
              }}
              component={Link}
              to={`/dashboard/${localStorage.getItem("jwt")}`}
              onClick={toggleDrawer}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              sx={{
                color: "#FFF",
                marginBottom: "10px",
                "&:hover": {
                  color: "#ff8906",
                },
              }}
              component={Link}
              to="/createCourse"
              onClick={toggleDrawer}
            >
              Classes
            </Button>
            <Button
              color="inherit"
              sx={{
                color: "#FFF",
                marginBottom: "10px",
                "&:hover": {
                  color: "#ff8906",
                },
              }}
              component={Link}
              to="/analytics"
              onClick={toggleDrawer}
            >
              Analytics
            </Button>
          </div>
          {localStorage.getItem("jwt") ? (
            <Button
              color="inherit"
              sx={{
                color: "#fffffe",
                backgroundColor: "#ff8906",
                borderRadius: 10,
                padding: "10px 18px",
                "&:hover": {
                  color: "#ff8906",
                  backgroundColor: "#fffffe",
                },
              }}
              component={Link}
              to="/"
              onClick={() => {
                localStorage.removeItem("jwt");
                localStorage.removeItem("userState");
                toggleDrawer();
              }}
            >
              Log Out
            </Button>
          ) : null}
        </div>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
