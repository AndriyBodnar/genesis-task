import React from "react";
import s from "../Button/Button.module.scss";

export default function Button({
  disabled = false,
  children,
  style = null,
  onClick,
}) {
  return (
    <div className={s.own_button}>
      <button disabled={disabled} style={style} type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
