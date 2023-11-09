import MovieDetail from "../components/MovieDetail";
import Trailer from "../components/Trailer";
import React, { Suspense } from "react";

const MediaDetail = () => {
  return (
    <>
      <MovieDetail />
      <Trailer />
    </>
  );
};

export default MediaDetail;
