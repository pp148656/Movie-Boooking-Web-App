import { Button, FormGroup, FormLabel, TextField, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";



import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


// import DateTimePicker from '@mui/lab/DateTimePicker';
import './Styles.css';
// import TimePicker from 'react-time-picker';
import AlertButton from "./showAlert";

const Booking = () => {
 //booking alert
 const [showAlert, setShowAlert] = useState(false);
 const [startTime, setStartTime] = useState(""); // Separate state for start time
 const [endTime, setEndTime] = useState(""); // Separate state for end time

 //clicking the dropdown icon
  const handleClick=(e)=>{
    setInputs((prevState) => ({
      ...prevState,seatNumber:e.target.value}));
  }

  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };
  const handleEndTimeChange = (value) => {
    setEndTime(value);
  };



  const [isOpen,setIsOpen]=useState(false);
  const toggleDropdown1 = () => {
    setIsOpen(!isOpen);
  };
  

  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);
 
  
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
 
  
  const canBook = () => {
    // Add your custom conditions here
    // For example, check if startTime is before endTime
    // You can add more conditions based on your requirements
    if (inputs.date && startTime && endTime && startTime < endTime) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(canBook())
    {newBooking({ ...inputs, movie: movie._id, startTime, endTime })
      .then((res) => console.log(res)).then(setShowAlert(true))
      .catch((err) => console.log(err)); 
    setInputs({date:"",seatNumber:""});
    setIsOpen(false);}
    else{
      console.log("Booking is not allowed. Check your conditions.");
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Slot: {movie.title}
          </Typography>
          
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>Name: {movie.description}</Typography>
               
                
                {movie.genre && <Typography fontWeight={"bold"} marginTop={1}>
                  Facility Type: {movie.genre}
                </Typography>}
                <Typography paddingTop={2}>Fees: {movie.seatRow}</Typography>
                <Typography paddingTop={2}>City: {movie.language}</Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  {/* <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  /> */}
                 
                    {/* <IconButton  style={{ fontSize: '20px' }} onClick={toggleDropdown1} >
                      <ExpandMoreIcon />
                    </IconButton>
                    {isOpen && (
                       <div style={{alignSelf:"center",display: 'grid',
                       gridTemplateColumns: `repeat(${movie.seatCol}, 1fr)`,
                       gap: '2px'}}>
                        {renderButtons(movie.seatCol,movie.seatRow)}
                      </div>
                    )} */}
                  
                  <FormLabel required>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  
                  <FormLabel required>Start Time</FormLabel>
                  <TimePicker
                    value={startTime}
                    onChange={handleStartTimeChange}
                  />
                  <FormLabel>End Time</FormLabel>
                  <TimePicker
                    value={endTime}
                    onChange={handleEndTimeChange}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                  
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  </LocalizationProvider>);
};

export default Booking;