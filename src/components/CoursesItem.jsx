import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ReactHlsPlayer from "react-hls-player";

export default function CoursesItem({ props }) {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <Card
      sx={{ width: 445, marginBottom: 3, marginLeft: 2 }}
      onClick={() => navigate(`/courses/${props.id}`)}
      onMouseEnter={() => {
        if (!!props.meta?.courseVideoPreview?.link) {
          return setShowVideo(true);
        }
      }}
      onMouseLeave={() => setShowVideo(false)}
      // titlecourse={props.title}
    >
      <CardActionArea>
        {!showVideo ? (
          <CardMedia
            component="img"
            height="240"
            image={`${props.previewImageLink}/cover.webp`}
            alt="green iguana"
          />
        ) : (
          <ReactHlsPlayer
            src={props.meta.courseVideoPreview.link}
            autoPlay
            height="237"
            width="100%"
            loop={true}
            muted={true}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Lessons: {props.lessonsCount} Rating: {props.rating}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Skills:{" "}
            {props.meta.skills?.map((el, index) => (
              <i key={index}>{el} </i>
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
