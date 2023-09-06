import MovieDetail from "../components/MovieDetail";
import Trailer from "../components/Trailer";
import React, { Suspense } from "react";

const MediaDetail = () => {
  return (
    <>
      <Suspense fallback="loading....">
        <MovieDetail />
        <Trailer />
      </Suspense>
    </>
  );
};

export default MediaDetail;
