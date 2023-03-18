import React, { useEffect, useState } from "react";
import CoursesService from "../API/CoursesService";
import { useFetching } from "../hooks/useFetching";
import CoursesItem from "../components/CoursesItem";
import { Alert, CircularProgress, Pagination } from "@mui/material";
import { getPageCount } from "../utils";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(1);

  const [fetchCourses, isCoursesLoading, coursesError] = useFetching(
    async () => {
      const response = await CoursesService.getAll();
      const totalCount = response.data.courses.length;
      setTotalCount(totalCount);
      setCourses([...response.data.courses]);
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;
  const currentCourses = courses.slice(firstIndex, lastIndex);

  const changePage = (page) => {
    if (page === 1) setPage(1);
    else setPage(+page.target.textContent);
  };

  useEffect(() => {
    fetchCourses();
  }, [page]);

  return (
    <>
      {coursesError && <Alert severity="error">Error</Alert>}
      {isCoursesLoading ? (
        <div>
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <div className="courses__list">
            {currentCourses.map((el) => {
              return <CoursesItem key={el.id} props={el} />;
            })}
          </div>
          <div style={{ marginBottom: "20px" }}>
            {!!totalPages && (
              <Pagination
                key={page}
                count={totalPages}
                page={page}
                onChange={changePage}
                shape="rounded"
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
