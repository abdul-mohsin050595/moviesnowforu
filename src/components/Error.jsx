import React from "react";

function Error({ message }) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span className=" text-danger fs-4">{message}</span>
    </div>
  );
}

export default Error;
