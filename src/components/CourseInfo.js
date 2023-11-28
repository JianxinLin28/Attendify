import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

export default function ValidationTextFields() {

  const addCourse = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Double check all of your information before adding.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Add Course"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Added!",
          text: "Your course has been added.",
          icon: "success"
        });
      }
    });
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="courseName"
          label="Course Name"
          defaultValue=""
          helperText="CS 320: Software Engineering"
        />
        <TextField
          id="courseSchedule"
          label="Class Schedule"
          defaultValue=""
          helperText="e.g. MWF 10:00-10:50"
        />
      </div>
      <div>
      <TextField
          id="courseInstructor"
          label="Instructors"
          defaultValue=""
          helperText="e.g. Jaime Davilla, Timothy Richards"
        />
        <TextField
          id="courseTimeout"
          label="QR Timeout Interval"
          defaultValue=""
          helperText="Recommended: 7"
        />
      </div>
      <div>
      <TextField
          id="courseLocation"
          label="Location"
          defaultValue=""
          helperText="e.g. Online/HAS 20"
        />
        <TextField
          id="courseAttendance"
          label="Attendance Type"
          defaultValue=""
          helperText="Mandatory/Optional"
        />
      </div>
      <Button sx={{ background: '#1976d2', color: '#FFF', '&:hover': {
          background: '#1565c0'} }} onClick={addCourse}>Add course</Button>
      
    </Box>
  );

  
}
