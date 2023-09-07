import Container from "react-bootstrap/Container";
import useFetch from "../hooks/useFetch";
import MediaItems from "./MediaItems";
import ComponentLoading from "./Loading/ComponentLoading";
import Error from "./Error";

const MediaContainer = ({ header, mediaCategory, mediaType }) => {
  const { loading, data, error } = useFetch(`${mediaType}/${mediaCategory}`);

  return (
    <>
      {loading && <ComponentLoading />}
      {error && <Error message={error} />}
      <Container fluid={true} className="mt-5 mb-5">
        <span className="border-info border-bottom fs-3 fw-bold border-3">
          {header}
        </span>
        <MediaItems mediaData={data} mediaType={mediaType} />
      </Container>
    </>
  );
};

export default MediaContainer;
