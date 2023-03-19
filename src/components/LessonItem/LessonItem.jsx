import * as React from "react";


import {  Chip, } from "@mui/material";
import { OrderContext } from "../../context";
import s from "../LessonItem/LessonItem.module.scss";
import Button from "../UI/Button/Button";

export default function LessonItem({ lesson }) {
  const { title, order: orderValue, status, previewImageLink } = lesson;
  const { order, setOrder } = React.useContext(OrderContext);

  const accessInfo = status === "locked" ? "error" : "success";

  const currentStyle =
    order == orderValue - 1
      ? `${s.course__text_title_active}`
      : `${s.course__text_title}`;
  const lockedStyle =
    status === "locked"
      ? `${s.main__content_items_locked}`
      : `${s.main__content_items}`;

  return (
    <div className={lockedStyle}>
      <div>
        <img
          src={`${previewImageLink}/lesson-${orderValue}.webp`}
          alt=""
          className={s.course__img}
        />
      </div>
      <div className={s.course__text}>
        <h6 className={currentStyle}>
          {" "}
          {orderValue}. {title}
        </h6>
      </div>
      <div className={s.course__time}>
        <Chip label={status} color={accessInfo} variant="outlined" />
      </div>
    

      <Button
        disabled={status === "locked" || order == orderValue - 1}
        onClick={() => setOrder(orderValue - 1)}
      >
        View lesson
      </Button>
    </div>


  );
}

{

}
