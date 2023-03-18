import React, { useContext } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Courses from "../pages/Courses";
import CourseIdPage from "../pages/CourseIdPage";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/genesis-task"
        element={<Navigate to="genesis-task/courses/" replace />}
      />
      <Route path="genesis-task/courses/" element={<Courses />} exact />
      <Route
        path="genesis-task/courses/:id/"
        element={<CourseIdPage />}
        exact
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
