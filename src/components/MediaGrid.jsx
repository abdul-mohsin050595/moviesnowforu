/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import MediaCard from "./MediaCard";
import { useCallback, useEffect, useState, Suspense } from "react";
import api from "../utils/api";
import PaginationComp from "./PaginationComp";
import CardLoading from "./Loading/CardLoading";
import GlobalLoading from "./Loading/GlobalLoading";
import { useErrorBoundary } from "react-error-boundary";

const api_key = import.meta.env.VITE_REACT_API_KEY;

const MediaGrid = ({ mediaCategory }) => {
  const { mediaType } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const { showBoundary } = useErrorBoundary();

  const getMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `${mediaType}/${mediaCategory}?api_key=${api_key}&page=${page}`
      );
      const data = res.data;
      setLoading(false);
      setMedia(data.results);
      setPageCount(data.total_pages);
    } catch (error) {
      setLoading(false);
      showBoundary(error);
    }
  }, [mediaType, mediaCategory, page]);

  useEffect(() => {
    getMedia();
  }, [mediaCategory, mediaType, page, getMedia]);

  const mediaDetail = (id) => {
    navigate(`/${mediaType}/${id}`);
  };

  const cardStyle = {
    width: "230px",
    height: "342px",
    flexShrink: "1",
    felxBasis: "30%",
    padding: "0",
    flexGrow: "1",
    margin: "10px",
    cursor: "pointer",
  };
  return (
    <>
      <Row className="p-4 p-sm-2 flex-row">
        {loading && <GlobalLoading />}
        {media.map((med) => {
          return (
            <Suspense key={med.id} fallback={<CardLoading />}>
              <MediaCard
                media={med}
                mediaDetail={mediaDetail}
                cardStyle={cardStyle}
              />
            </Suspense>
          );
        })}
      </Row>
      {!loading && (
        <PaginationComp page={page} setPage={setPage} pageCount={pageCount} />
      )}
    </>
  );
};

export default MediaGrid;
