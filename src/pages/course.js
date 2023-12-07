import React from "react";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
import Navigation from "../components/Navigation";
import CourseBody from "../components/CourseBody";

const CoursePage = () => {
    return (
        <>
            <Navigation />
            <CourseBody
                heading="Add a course"
                paragraph="Use this page to create a new class."
            />
        </>
    );
};

export default CoursePage;