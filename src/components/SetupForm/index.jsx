import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../../contexts";

import {
  Box,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";

import { styles } from "./setupFormStyles";
import "react-toastify/dist/ReactToastify.css";
import { useCallback } from "react";

function SetupForm() {
  const [allCategories, setAllCategories] = React.useState([]);
  const [number, setNumber] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");

  const { setQuestions, setCurrentQuestion } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await axios.get("https://opentdb.com/api_category.php");
      setAllCategories(res.data.trivia_categories);
    };
    fetchAllCategories();
  }, []);

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const showToastMessage = (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const controlNumber = () => {
    const minNumber = 1;
    const maxNumber = 50;
    if (number === "") {
      showToastMessage("You have not chosen the number!");
    } else if (number <= minNumber || number > maxNumber) {
      showToastMessage("The number of questions must be between 1 and 50!");
    }
  };

  const controlCategory = () => {
    if (category === "") showToastMessage("You have not chosen the category!");
  };

  const controlDifficulty = () => {
    if (difficulty === "")
      showToastMessage("You have not chosen the difficulty!");
  };

  const fetchQuestions = async () => {
    const res = await axios.get(
      `https://opentdb.com/api.php?amount=${number}${
        category === "all" ? "" : `&category=${category}`
      }${
        difficulty === "anyDifficulty" ? "" : `&difficulty=${difficulty}`
      }&type=multiple`
    );

    setQuestions(res.data.results);
    setCurrentQuestion(res.data.results[0]);

    navigate("/questions");
  };



  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    controlNumber();
    controlCategory();
    controlDifficulty();

    if (number > 0 && number <= 50 && category !== "" && difficulty !== "")
      fetchQuestions();
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Box component="form" fullwidth autoComplete="off" sx={styles.root}>
        <Typography variant="h4">Setup Quiz</Typography>
        <TextField
          id="outlined-basic"
          label="Number of Questions"
          variant="outlined"
          value={number}
          type="number"
          InputProps={{
            inputProps: {
              min: 1,
              max: 50,
            },
          }}
          onChange={handleChangeNumber}
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            label="Category"
            value={category}
            onChange={handleChangeCategory}
          >
            <MenuItem value="all">All</MenuItem>
            {allCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-label"
            id="difficulty"
            label="difficulty"
            value={difficulty}
            onChange={handleChangeDifficulty}
          >
            <MenuItem value="anyDifficulty">Any Difficulty</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Start
        </Button>
      </Box>
    </>
  );
}

export default SetupForm;
