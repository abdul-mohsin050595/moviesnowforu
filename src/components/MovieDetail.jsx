import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import configs from "../config/config";
import GlobalLoading from "./Loading/GlobalLoading";
import { useErrorBoundary } from "react-error-boundary";

const ACCESS_TOKEN = import.meta.env.VITE_REACT_ACCESS_TOKEN;

function MovieDetail() {
  const { mediaType, mediaId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const getDetail = async () => {
      try {
        const config = {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        };
        const res = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`,
          config
        );

        const result = await res.data;

        if (res.status === 200) {
          setLoading(false);
          setMovie(result);
        }
      } catch (error) {
        setLoading(false);
        showBoundary(error);
      }
    };
    getDetail();
  }, [mediaType, mediaId]);

  if (loading) {
    return <GlobalLoading />;
  }
  return (
    <main className="mt-5">
      <article className=" w-100 d-sm-flex s-md-flex flex-md-row flex-sm-column">
        <div className="mediaImage text-sm-center w-md-50">
          <img
            src={`${configs.backdropPath(
              movie?.backdrop_path || movie?.poster_path
            )}`}
            alt={movie?.original_title || movie?.name}
            style={{
              // width: "100%",
              // height: "100%",
              objectFit: "cover",
              padding: "20px",
            }}
            width="100%"
            height="auto"
            loading="lazy"
          />
        </div>
        <div className="mediaDetail p-2 p-md-3 w-md-50">
          <div>
            <h1 className="py-2">
              {movie?.original_title} {movie?.original_name}
            </h1>
          </div>
          <div className="py-3 d-flex flex-wrap align-items-center">
            <b className="me-2">Rating {movie?.vote_average}</b>
            {movie?.genres?.map((gen) => (
              <span
                key={gen?.id}
                className="m-1 text-black bg-info rounded py-1 px-2"
              >
                {gen?.name}
              </span>
            ))}
          </div>
          <div className="pt-3 text-left">
            <p className="fs-6">{movie?.overview?.slice(0, 360) + "..."}</p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default MovieDetail;
