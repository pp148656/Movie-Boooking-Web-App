import { Button, FormGroup, FormLabel, TextField, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import FormControl from '@mui/material/FormControl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import './Styles.css';
import AlertButton from "./showAlert";

const Booking = () => {
 //booking alert
 const [showAlert, setShowAlert] = useState(false);

 //clicking the dropdown icon
  const handleClick=(e)=>{
    setInputs((prevState) => ({
      ...prevState,seatNumber:e.target.value}));
  }
  //rendering the seats
  const renderButtons = (numCols,numRows) => {
    const buttons = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if(movie.bookedSeats[numCols*row+col]===true){
          buttons.push(
            <Grid item key={`button-${row}-${col}`}>
            
                <Button variant="contained"  value={row  * numCols + col + 1} >
                  {row * numCols + col + 1}
                </Button>
              
              
            </Grid>);
        }
        else{
        buttons.push(
          <Grid item key={`button-${row}-${col}`}>
          
              <Button variant="contained" color="grey" value={row * numCols + col + 1} onClick={handleClick}>
                {row * numCols + col + 1}
              </Button>
            
            
          </Grid>
        );
        }
      }
    }
    return buttons;
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
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res)).then(setShowAlert(true))
      .catch((err) => console.log(err)); 
    setInputs({date:"",seatNumber:""});
    setIsOpen(false);
  };
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Movie: {movie.title}
          </Typography>
          <div style={{margin:"0px 30% 0px 30%" ,alignSelf:"center"}}>
          <AlertButton showAlert={showAlert} setShowAlert={setShowAlert}/>
          </div>
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
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer:
                  {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
                {movie.genre && <Typography fontWeight={"bold"} marginTop={1}>
                  Genre: {movie.genre}
                </Typography>}
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
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                 
                    <IconButton  style={{ fontSize: '20px' }} onClick={toggleDropdown1} >
                      <ExpandMoreIcon />
                    </IconButton>
                    {isOpen && (
                       <div style={{alignSelf:"center",display: 'grid',
                       gridTemplateColumns: `repeat(${movie.seatCol}, 1fr)`,
                       gap: '2px'}}>
                        {renderButtons(movie.seatCol,movie.seatRow)}
                      </div>
                    )}
                  
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
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
  );
};

export default Booking;