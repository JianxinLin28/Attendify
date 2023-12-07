// Dashboard Component
import { useState, useEffect } from "react";
import Card from "../components/Cards";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const storedUserState = JSON.parse(localStorage.getItem("userState"));

    setUserState(storedUserState);
  }, [navigate]);

  return (
    <div>
      {userState && (
        <>
          <Navigation />
          <Container maxWidth="lg">
            <Grid container spacing={6} sx={{ padding: "40px" }}>
              <Grid item xs={4}>
                <Card
                  title={userState.first_name + " " + userState.last_name}
                  body="This is a description of the user."
                />
              </Grid>
              {/* Add other cards or components as needed */}
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default Dashboard;
