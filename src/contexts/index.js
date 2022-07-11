import { createContext, useState } from "react";

export const Context = createContext({
  questions: [],
  setQuestions: () => {},
  currentQuestion: {},
  setCurrentQuestion: () => {},
  openModal: false,
  setOpenModal: () => {},
  correctAnswers: 0,
  setCorrectAnswers: () => {},
});

const ContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  return (
    <Context.Provider
      value={{
        questions,
        setQuestions,
        currentQuestion,
        setCurrentQuestion,
        openModal,
        setOpenModal,
        correctAnswers,
        setCorrectAnswers,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
