import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";

import { Context } from "../../contexts";
import { styles } from "./myModalStyles";

function MyModal() {
  const {
    openModal,
    setOpenModal,
    correctAnswers,
    setCorrectAnswers,
    questions,
    setQuestions,
    setCurrentQuestion,
  } = useContext(Context);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenModal(false);
    }
  };

  const handlePlayAgain = () => {
    setQuestions([]);
    setCurrentQuestion({});
    setCorrectAnswers(0);
    setOpenModal(false);
    navigate("/");
  };

  return (
    <Modal
      disableEnforceFocus
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.root}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Congrats
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your Score: {Math.round((correctAnswers / questions.length) * 100)}%
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handlePlayAgain}>
          Play Again
        </Button>
      </Box>
    </Modal>
  );
}

export default MyModal;
