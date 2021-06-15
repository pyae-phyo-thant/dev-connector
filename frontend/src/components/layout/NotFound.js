import React, { Fragment } from "react";
import notFound from "./notFound.gif";

const NotFound = () => {
  return (
    <Fragment>
      <img
        src={notFound}
        style={{
          width: "auto",
          margin: "auto",
          display: "block",
          marginTop: "0px",
        }}
        alt="loading..."
      />
    </Fragment>
  );
};

export default NotFound;
