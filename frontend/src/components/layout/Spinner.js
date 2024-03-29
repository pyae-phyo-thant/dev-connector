import React, { Fragment } from "react";
import spinnerGif from "./spinner.gif";

export default function spinner() {
  return (
    <Fragment>
      <img
        src={spinnerGif}
        style={{
          width: "auto",
          margin: "auto",
          display: "block",
          marginTop: "100px",
        }}
        alt="loading..."
      />
    </Fragment>
  );
}
