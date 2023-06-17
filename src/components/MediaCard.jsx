import { useState } from "react";
import configs from "../config/config";
import { Card } from "react-bootstrap";

const MediaCard = ({ media, mediaDetail, cardStyle }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const cardOverlay = {
    background: "linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))",
    flexDirection: "column",
    justifyContent: "flex-end",
    color: "white",
    transformOrigin: "bottom left",
    transition: "all 2s ease-in-out 3s",
  };
  return (
    <Card
      style={cardStyle}
      onClick={() => mediaDetail(media.id)}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <Card.Img
        src={configs.posterPath(media.poster_path || media.backdrop_path)}
        alt={media.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />
      <Card.ImgOverlay
        style={cardOverlay}
        className={`moblieOverlay ${showOverlay ? "d-sm-flex" : "d-sm-none"}`}
      >
        <Card.Text className="fw-bold">Rating {media.vote_average}</Card.Text>
        <Card.Text className="fw-bold">
          {new Date(media.release_date || media.first_air_date).getFullYear()}
        </Card.Text>
        <Card.Text className="fw-bold">{media.title || media.name}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default MediaCard;
