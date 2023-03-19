import React, { useCallback, useEffect,  useState } from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import FailVideo from "./FailVideo";
import { useEventListener } from "../hooks/useEventListener";
import { Alert } from "@mui/material";

import Button from "./UI/Button/Button";

export default function VideoContainer({ lessons, currentVideo }) {


  const [videoProgress, setVideoProgress] = useState(0);

  const video = document.getElementById("myVideo");

  const handlePictureInPicture = async () => {
    try {
      await video.requestPictureInPicture();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExitPictureInPicture = () => {
    try {
      document.exitPictureInPicture();
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    return () => handleExitPictureInPicture();
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem(
      `videoProgress__${lessons[currentVideo]?.title}`
    );

    if (savedProgress) {
      setVideoProgress(parseFloat(savedProgress));
    }
  }, [currentVideo]);

  const videoControl = useCallback((e) => {
    e.preventDefault();
    if (video) {
      if (e.ctrlKey && e.code === "KeyB") {
        video.currentTime = video.currentTime + 15;
      }
      if (e.ctrlKey && e.code === "KeyV") {
        video.currentTime = video.currentTime - 15;
      }
    }
  });
  useEventListener("keyup", videoControl);

  const handleTimeUpdate = (e) => {
    localStorage.setItem(
      `videoProgress__${lessons[currentVideo]?.title}`,
      e.target.currentTime
    );
  };

  const startVideoFromLocal = (e) => {
    e.target.currentTime = videoProgress;
  };

  return !lessons[currentVideo]?.link ? (
    <FailVideo
      title={lessons[currentVideo]?.title}
      order={lessons[currentVideo]?.order}
      text="Failed load data"
    />
  ) : (
    <>
      <ReactHlsPlayer
        src={lessons[currentVideo]?.link}
        autoPlay
        height="450"
        muted={true}
        controls
        id="myVideo"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={startVideoFromLocal}
      />

      <Button onClick={handlePictureInPicture}>Picture-in-Picture</Button>
      <Alert
        variant="filled"
        severity="success"
        color="info"
        style={{ marginTop: "20px" }}
      >
        Ctrl + V - -15s / Ctrl + B - +15s
      </Alert>
    </>
  );
}
