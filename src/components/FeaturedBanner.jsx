import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import configs from "../config/config";
import { Container } from "react-bootstrap";
import { Suspense } from "react";
import GlobalLoading from "./Loading/GlobalLoading";

function FeaturedBanner({ generatedRandomMovie, mediaType }) {
  const navigate = useNavigate();

  return (
    <div className="mobileCard">
      {generatedRandomMovie && (
        <Suspense fallback={<GlobalLoading />}>
          <Card className="bg-dark text-white ">
            <img
              src={`${configs.backdropPath(
                generatedRandomMovie?.backdrop_path ||
                  generatedRandomMovie?.poster_path
              )}`}
              className=" mobileBanner"
              width="100%"
              heigth="auto"
              alt={
                generatedRandomMovie?.original_title ||
                generatedRandomMovie?.name
              }
              loading="lazy"
            />
            <Card.ImgOverlay className="d-flex justify-content-center flex-column imgOverlay w-sm-60">
              <Container>
                <div className="fs-2 pt-1 pb-1 mobileTitle">
                  {generatedRandomMovie?.original_title ||
                    generatedRandomMovie?.name}
                </div>
                <Card.Text className="fw-bold d-none d-sm-block mobileText">
                  {generatedRandomMovie?.overview?.slice(0, 143) + "..."}
                </Card.Text>
                <Button
                  onClick={() =>
                    navigate(`/${mediaType}/${generatedRandomMovie?.id}`)
                  }
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
