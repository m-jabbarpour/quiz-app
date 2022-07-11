import React, { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { Context } from "../../contexts";
import MyModal from "../MyModal";

import { styles } from "./questionBox.styles";

function QuestionBox() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    setOpenModal,
    correctAnswers,
    setCorrectAnswers,
  } = useContext(Context);
  const [toggleButtonValue, setToggleButtonValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleOpen = () => setOpenModal(true);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const shuffledAnswers = shuffleArray([
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ]);

    setOptions(shuffledAnswers);
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    if (toggleButtonValue === currentQuestion.correct_answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setCurrentQuestion(questions[questions.indexOf(currentQuestion) + 1]);
  };

  const handleFinish = () => {
    if (toggleButtonValue === currentQuestion.correct_answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
    handleOpen();
  };

  return (
    <>
      <Box sx={styles.root}>
        <Typography sx={styles.correctAnswers}>
          Correct Answers: {correctAnswers}/{questions.length}
        </Typography>
        <Box sx={styles.mainContent}>
          <Typography variant="h3" align="center">
            {parse(currentQuestion.question)}
          </Typography>

          <ToggleButtonGroup
            orientation="vertical"
            value={toggleButtonValue}
            sx={{ gap: 0 }}
          >
            {options.map((option, index) => (
              <ToggleButton
                key={index}
                value={option}
                variant="contained"
                color="secondary"
                sx={styles.answers}
                onClick={() => setToggleButtonValue(option)}
              >
                {parse(option)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Button
          variant="contained"
          sx={styles.nextQuestion}
          onClick={
            questions.indexOf(currentQuestion) < questions.length - 1
              ? handleNextQuestion
              : handleFinish
          }
        >
          {questions.indexOf(currentQuestion) < questions.length - 1
            ? "Next Question"
            : "Finish"}
        </Button>
      </Box>
      <MyModal />
    </>
  );
}

export default QuestionBox;
