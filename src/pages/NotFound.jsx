import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button/Button";

const NotFound = () => {
  const loc = useLocation();
  const navigate = useNavigate();

  return (
    <div id="container">
      <div id="top">Oops!</div>
      <div id="middle">404</div>
      <div id="bottom">
        The page {loc.pathname} you were looking doesn't exist.
      </div>

      <Button onClick={() => navigate("/courses")}>Courses</Button>
    </div>
  );
};

export default NotFound;
