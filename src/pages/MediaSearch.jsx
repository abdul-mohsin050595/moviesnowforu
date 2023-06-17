import { useCallback, useEffect, useState } from "react";
import apiConfigs from "../config/apiConfigs";
import Search from "../components/Search";
import { Button, Row } from "react-bootstrap";
import MediaCard from "../components/MediaCard";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../components/PaginationComp";
import GlobalLoading from "../components/Loading/GlobalLoading";

const MediaSearch = () => {
  const [media, setMedia] = useState([]);
  const [mediaType, setMediaType] = useState("movie");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const search = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiConfigs.searchMedia(mediaType, query, page);
      const data = res.data;
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        setMedia(data.results);
        setPageCount(data.total_pages);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  });

  useEffect(() => {
    search();
  }, [query, mediaType]);

  const searchHandler = (e) => {
    const { value } = e.target;
    if (value === "") {
      setMedia([]);
    }
    setQuery(value);
  };

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
    <div className="mt-5">
      <div className="p-2 d-flex justify-content-center align-item-center">
        <Button
          onClick={() => setMediaType("movie")}
          className={`${mediaType === "movie" ? "bg-info" : "bg-secondary"}`}
        >
          MOVIE
        </Button>
        <Button
          onClick={() => setMediaType("tv")}
          className={`ms-2 ${mediaType === "tv" ? "bg-info" : "bg-secondary"}`}
        >
          TV SERIES
        </Button>
      </div>

      <Search
        mediaType={mediaType}
        value={query}
        searchHandler={searchHandler}
      />

      {loading && <GlobalLoading />}

      <Row className="p-2 flex-row">
        {media &&
          media.map((med) => {
            return (
              <MediaCard
                key={med.id}
                media={med}
                mediaDetail={mediaDetail}
                cardStyle={cardStyle}
              />
            );
          })}
      </Row>

      {media.length > 0 && (
        <PaginationComp page={page} setPage={setPage} pageCount={pageCount} />
      )}

      {error && <span className="fs-4 text-danger">{error}</span>}
    </div>
  );
};

export default MediaSearch;
