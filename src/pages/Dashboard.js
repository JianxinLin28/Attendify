import React from "react";
import Card from "../components/Cards";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  return (
    <>
    <Navigation />
    <Container maxWidth="lg">
      <Grid container spacing={6} sx={{ padding: "40px" }}>
        <Grid item xs={4}>
          <Card
            title="CS320 - Software Engineering"
            body="This is a description of the course."
          />
        </Grid>
        <Grid item xs={4}>
          <Card
            title="CS210 - Data Structures and Algorithms"
            body="This is a description of the course."
          />
        </Grid>
        <Grid item xs={4}>
          <Card
            title="CS320 - Software Engineering"
            body="This is a description of the course."
          />
        </Grid>
        <Grid item xs={4}>
          <Card
            title="CS320 - Software Engineering"
            body="This is a description of the course."
          />
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default Dashboard;
