import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { Alert, Chip, List, ListItem, ListItemText } from "@mui/material";
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
      {/* <div className={s.course__button}>
        <button
          type="button"
          disabled={status === "locked"}
          onClick={() => setOrder(orderValue - 1)}
        >
          View lesson
        </button>
      </div> */}

      <Button
        disabled={status === "locked" || order == orderValue - 1}
        onClick={() => setOrder(orderValue - 1)}
      >
        View lesson
      </Button>
    </div>

    // <ListItem button>
    //   <ListItemText primary={`${order}. ${title}`} secondary={{ status }} />
    // </ListItem>
  );
}

{
  /* <div
style={{
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid rgba(32, 12, 12, 0.87)",
  borderRadius: "12px",
  padding: "10px",
  marginTop: "10px",
  cursor: "pointer",
}}
onClick={() => setOrder(orderValue - 1)}
>
<Typography
  variant="h6"
  gutterBottom
  className={`${currentStyle + " " + lockedStyle}`}
>
  {orderValue}. {title}{" "}
</Typography>
<Chip label={status} color={accessInfo} variant="outlined" />
</div> */
}
