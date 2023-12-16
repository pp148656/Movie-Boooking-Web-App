import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

const Movies = () => {
  const genres = [
    { label: 'Drama', value: 'Drama' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Action', value: 'Action' },
    { label: 'Romance', value: 'Romance' }
    // Add more GselectedGenre as needed
  ];

  const languages = [
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Engilsh', value: 'Engilsh' },
    { label: 'Marathi', value: 'Marathi' },
    { label: 'Tamil', value: 'Tamil' },
    { label: 'Telugu', value: 'Telugu' }
    // Add more GselectedGenre as needed
  ];

  const filterMovies = (movies, selectedGenres, selectedLanguages) => {
    return movies.filter((movie) => {
      const meetsGenreCriteria = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
      const meetsLanguageCriteria = selectedLanguages.length === 0 || selectedLanguages.includes(movie.language);
      return meetsGenreCriteria && meetsLanguageCriteria;
    });
  };

  const [selectedGenre, setSelectedGenre] = useState([]);
  const [isOpen, setIsOpen]= useState(false);

  const [selectedLang, setSelectedLang] = useState([]);
  const [isLang, setIsLang] = useState(false);

  const [movies, setMovies] = useState();
  const [filtermovie, setFilterMovies]= useState(movies);

  const toggleDropdown1 = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsLang(!isLang);
  };
  const handleGenreToggle = optionValue => {
    if (selectedGenre.includes(optionValue)) {
      setSelectedGenre(selectedGenre.filter(option => option !== optionValue));
    } else {
      setSelectedGenre([...selectedGenre, optionValue]);
    }
  };
  const handleLangToggle = optionValue => {
    if (selectedLang.includes(optionValue)) {
      setSelectedLang(selectedLang.filter(option => option !== optionValue));
    } else {
      setSelectedLang([...selectedLang, optionValue]);
    }
  }; 

  useEffect(() => {
    getAllMovies()
    .then((data) => {
      setMovies(data.movies);
      const filteredMovies = filterMovies(data.movies, selectedGenre, selectedLang);
      setFilterMovies(filteredMovies);
    })
    .catch((err) => console.log(err));
  }, [selectedGenre, selectedLang]);
  return (
    <Box display={"flex"} >
      <Box  marginTop={4} marginLeft={4} display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
      <div  style={{  padding: '6px', fontSize: '28px', fontStyle:'Bold',fontFamily:'fantasy' }}>Filters </div>
      <FormControl component="fieldset">
      
        <IconButton  style={{ fontSize: '20px' }} onClick={toggleDropdown1} >
          Genre <ExpandMoreIcon />
        </IconButton>
        {isOpen && (
          <FormGroup >
            {genres.map(option => (
               <div style={{ marginLeft: '10px' }}>
              <FormControlLabel
                key={option.value}
                
                control={
                 
                  <Checkbox
                    checked={selectedGenre.includes(option.value)}
                    onChange={() => handleGenreToggle(option.value)}
                  />
                }
                label={option.label}
              />
              </div>
            ))}
          </FormGroup>
        )}
      </FormControl>


      <FormControl component="fieldset">
      
        <IconButton style={{ fontSize: '20px' }} onClick={toggleDropdown2} >
          
          Language <ExpandMoreIcon />
          
        </IconButton>
        
        {isLang && (
          <FormGroup >
            {languages.map(option => (
               <div style={{ marginLeft: '10px' }}>
              <FormControlLabel
                key={option.value}
                
                control={
                 
                  <Checkbox
                    checked={selectedLang.includes(option.value)}
                    onChange={() => handleLangToggle(option.value)}
                  />
                }
                label={option.label} 
              />
              </div>
            ))}
          </FormGroup>
        )}
      </FormControl>
      </Box>






    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h5"
        padding={2}
        width="20%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {  filtermovie  &&
          filtermovie.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
        
      </Box>
    </Box>
    </Box>
  );
};

export default Movies;