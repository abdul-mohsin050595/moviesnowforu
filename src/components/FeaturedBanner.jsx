import Button from "react-bootstrap/Button";
import useFetch from "../hooks/useFetch";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import configs from "../config/config";
import { Container } from "react-bootstrap";
import { Suspense } from "react";
import GlobalLoading from "./Loading/GlobalLoading";

function FeaturedBanner({ mediaType, mediaCategory }) {
  const { loading, data, error } = useFetch(`${mediaType}/${mediaCategory}`);
  const navigate = useNavigate();

  const randomMovie = data[Math.floor(Math.random() * 20)];
  if (error) {
    return <h1>{error}</h1>;
  }

  console.log(data)
  return (
    <div className="mobileCard">
      {loading && <GlobalLoading />}
      {randomMovie && (
        <Suspense fallback={<GlobalLoading />}>
          <Card className="bg-dark text-white ">
            <img
              src={`${configs.backdropPath(
                randomMovie.backdrop_path || randomMovie.poster_path
              )}`}
              className=" mobileBanner"
              alt={randomMovie.original_title || randomMovie.name}
            />
            <Card.ImgOverlay className="d-flex justify-content-center flex-column imgOverlay w-sm-60">
              <Container>
                <div className="fs-2 pt-1 pb-1 mobileTitle">
                  {randomMovie.original_title || randomMovie.name}
                </div>
                <Card.Text className="fw-bold d-none d-sm-block mobileText">
                  {randomMovie.overview.slice(0, 143) + "..."}
                </Card.Text>
                <Button
                  onClick={() => navigate(`/${mediaType}/${randomMovie.id}`)}
                  variant="danger"
                  size="sm"
                >
                  Watch Now
                </Button>
              </Container>
            </Card.ImgOverlay>
          </Card>
        </Suspense>
      )}
    </div>
  );
}

export default FeaturedBanner;
