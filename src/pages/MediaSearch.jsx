import { useCallback, useEffect, useState } from "react";
import apiConfigs from "../config/apiConfigs";
import Search from "../components/Search";
import { Button, Row, Spinner } from "react-bootstrap";
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
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState("1");
  const navigate = useNavigate();

  const search = async () => {
    try {
      setLoading(true);
      const res = await apiConfigs.searchMedia(mediaType, query, page);
      const data = res.data;
      console.log(data);
      if (res.status === 200) {
        setLoading(false);
        setMedia(data.results);
        setPageCount(data.total_pages);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    search();
  }, [query, mediaType, page]);

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
    <div className="mt-5 pt-5">
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

      <span className="border-info border-bottom fs-3 fw-bold border-3 ms-5">
        Searched Media
      </span>

      {media.length === 0 && (
        <p className="text-center p-5 m-5">No item found</p>
      )}

      <Row className="p-2 flex-row">
        {media &&
          media?.map((item) => {
            return (
              <MediaCard
                key={item?.id}
                media={item}
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
