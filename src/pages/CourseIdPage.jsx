import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import CoursesService from "../API/CoursesService";
import { useNavigate, useParams } from "react-router-dom";
import {  CircularProgress,  Rating,  } from "@mui/material";
import LessonItem from "../components/LessonItem/LessonItem";
import VideoContainer from "../components/VideoContainer";
import { OrderContext } from "../context";
import FailVideo from "../components/FailVideo";
import Button from "../components/UI/Button/Button";

export default function CourseIdPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const [order, setOrder] = useState(0);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await CoursesService.getById(id);

    setCourse({ ...response.data });
    setLessons([...response.data.lessons.sort((a, b) => a.order - b.order)]);
  });

  const style = {
    background: "#f5f5f7",
    marginTop: "10px",
    padding: "15px 15px 0px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "14px",
  };

  useEffect(() => {
    fetchPostById(params.id);
    if (localStorage.getItem(`lessonOrder__${params.id}`))
      setOrder(localStorage.getItem(`lessonOrder__${params.id}`));
  }, []);

  useEffect(() => {
    if (params.id) {
      localStorage.setItem(`lessonOrder__${params.id}`, order);
    }
  }, [order]);

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
      }}
    >
      <div>
        <Button
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/courses")}
        >
          {" "}
          Courses
        </Button>

        {!!error && navigate(`/${params.id}`)}

        <h1>{course.title}</h1>
        {isLoading ? (
          <div>
            <CircularProgress color="success" />
          </div>
        ) : (
          <div className="lesson__item">
            {lessons[order]?.status === "locked" ? (
              <FailVideo
                title={lessons[order]?.title}
                order={lessons[order]?.order}
                text="Locked video"
              />
            ) : (
              <VideoContainer lessons={lessons} currentVideo={order} />
            )}
            <div>
              <div style={style}>
                <h3>Description: {course.description}</h3>

                <Rating
                  name="half-rating-read"
                  value={course.rating}
                  precision={0.5}
                  readOnly
                />

                <h4>Lessons:</h4>
              </div>
              <div>
                {lessons.map((lesson) => {
                  return <LessonItem lesson={lesson} key={lesson.order} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </OrderContext.Provider>
  );
}
