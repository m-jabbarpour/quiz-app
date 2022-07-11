import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";

import { styles } from "./app.styles";

const SetupForm = React.lazy(() => import("../components/SetupForm"));
const QuestionBox = React.lazy(() => import("../components/QuestionBox"));

function App() {
  return (
    <Container sx={styles.root}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<CircularProgress />}>
              <SetupForm />
            </Suspense>
          }
        />
        <Route
          path="/questions"
          element={
            <Suspense fallback={<CircularProgress />}>
              <QuestionBox />
            </Suspense>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
