import React from "react";

export default function FailVideo({ text, order, title }) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        height: "450px",
        color: "red",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        flexDirection: "column",
      }}
    >
      <h3>{text}</h3>
      <p>{order + ". " + title}</p>
    </div>
  );
}
