import { useParams } from "react-router-dom";
import FeaturedBanner from "../components/FeaturedBanner";
import configs from "../config/config";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MediaGrid from "../components/MediaGrid";
import api from "../utils/api";
import GlobalLoading from "../components/Loading/GlobalLoading";
import { useErrorBoundary } from "react-error-boundary";

const api_key = import.meta.env.VITE_REACT_API_KEY;
const MediaList = () => {
  const { mediaType } = useParams();
  const [mediaCategory, setMediaCategory] = useState("popular");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const randomMovie = movies && movies[Math.floor(Math.random() * 20)];

  console.log(mediaType);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/${mediaType}/${mediaCategory}?api_key=${api_key}&page=1`
        );
        const data = res.data.results;

        if (res.status === 200) {
          setLoading(false);
          setMovies(data);
        }
      } catch (error) {
        setLoading(false);
        showBoundary(error);
      }
    };
    fetchMovies();
  }, [mediaCategory, mediaType]);

  if (loading) {
    return <GlobalLoading />;
  }
  return (
    <>
      <FeaturedBanner
        mediaType={mediaType}
        generatedRandomMovie={randomMovie}
      />

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
