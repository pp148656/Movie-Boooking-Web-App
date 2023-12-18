import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
const labelProps = {
  mt: 1,
  mb: 1,
};
const AddMovie = () => {
  const navigate= useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    genre:"",
    language:"",
    seatCol:1,
    seatRow:1,
    releaseDate: "2023-12-20",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => {console.log(res); navigate("/")})
      .catch((err) => console.log(err));              
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Service
          </Typography>
          <FormLabel sx={labelProps} required>Title</FormLabel>
          <TextField 
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            required
           
          />
          <FormLabel sx={labelProps} required>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            
          />
          {/* <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
           
          /> */}
          <FormLabel sx={labelProps} required>Facility Type</FormLabel>
          <TextField
           
            value={inputs.genre}
            onChange={handleChange}
            name="genre"
            variant="standard"
           
          />
          <FormLabel sx={labelProps}>City</FormLabel>
          <TextField
           
            value={inputs.language}
            onChange={handleChange}
            name="language"
            variant="standard"
           
          />
          
          <FormLabel sx={labelProps} required>Fees</FormLabel>
          <TextField
           
            value={inputs.seatRow}
            
            onChange={handleChange}
            name="seatRow"
            variant="standard"
           
          />
          {/* <FormLabel sx={labelProps}>Seat Columns</FormLabel>
          <TextField
            
            value={inputs.seatCol}

            onChange={handleChange}
            name="seatCol"
            variant="standard"
           
          /> */}
          {/* <FormLabel sx={labelProps}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={labelProps}>Featured <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          /> </FormLabel> */}
          
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add 
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;