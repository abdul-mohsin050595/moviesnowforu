import { useParams } from "react-router-dom";
import FeaturedBanner from "../components/FeaturedBanner";
import configs from "../config/config";
import { Suspense, useState } from "react";
import { Col, Container, Row, Button, Stack } from "react-bootstrap";
import MediaGrid from "../components/MediaGrid";

const MediaList = () => {
  const { mediaType } = useParams();
  const [mediaCategory, setMediaCategory] = useState("popular");
  return (
    <>
      <FeaturedBanner mediaType={mediaType} mediaCategory={mediaCategory} />

      <div className="d-sm-flex p-2 flex-row text-center justify-content-between align-item-center">
        <div>
          <h1 className="d-inline-block pt-2 pb-2  border-3 border-bottom border-info">
            {mediaType === configs.mediaType.movie ? "Movies" : "TV Series"}
          </h1>
        </div>
        <div className="pt-2 pb-2">
          <Button
            onClick={() => setMediaCategory("popular")}
            className={`${
              mediaCategory === "popular"
                ? "bg-info border-info"
                : "bg-secondary border-secondary"
            }`}
          >
            POPULAR
          </Button>
          <Button
            onClick={() => setMediaCategory("top_rated")}
            className={`ms-2 ${
              mediaCategory === "top_rated"
                ? "bg-info border-info"
                : "bg-secondary border-secondary"
            }`}
          >
            TOP RATED
          </Button>
        </div>
      </div>

      <MediaGrid mediaCategory={mediaCategory} />
    </>
  );
};

export default MediaList;
