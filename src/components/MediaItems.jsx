import { useNavigate } from "react-router-dom";
import MediaCard from "./MediaCard";

const MediaItems = ({ mediaData, mediaType }) => {
  const navigate = useNavigate();
  const mediaDetail = (id) => {
    navigate(`/${mediaType}/${id}`);
  };
  const rowStyle = {
    width: "100%",
    overflowX: "scroll",
    flexDirection: "row",
    display: "flex",
    padding: "20px 0",
  };

  const cardStyle = {
    position: "relative",
    flexShrink: "0",
    width: "228px",
    height: "342px",
    marginRight: "30px",
    transition: "width 0.5s ease",
    cursor: "pointer",
  };
  return (
    <div style={rowStyle}>
      {mediaData?.map((media) => {
        return (
          <MediaCard
            key={media?.id}
            media={media}
            mediaDetail={mediaDetail}
            cardStyle={cardStyle}
          />
        );
      })}
    </div>
  );
};

export default MediaItems;
