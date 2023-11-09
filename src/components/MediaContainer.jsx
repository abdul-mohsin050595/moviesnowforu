import Container from "react-bootstrap/Container";
import useFetch from "../hooks/useFetch";
import MediaItems from "./MediaItems";
import ComponentLoading from "./Loading/ComponentLoading";

const MediaContainer = ({ header, mediaData, mediaType }) => {
  return (
    <>
      <Container fluid={true} className="mt-5 mb-5">
        <span className="border-info border-bottom fs-3 fw-bold border-3">
          {header}
        </span>
        <MediaItems mediaData={mediaData} mediaType={mediaType} />
      </Container>
    </>
  );
};

export default MediaContainer;
