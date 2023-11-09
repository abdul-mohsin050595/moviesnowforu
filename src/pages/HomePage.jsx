import { useState, useEffect } from "react";
import FeaturedBanner from "../components/FeaturedBanner";
import MediaContainer from "../components/MediaContainer";
import configs from "../config/config";
import api from "../utils/api";
import GlobalLoading from "../components/Loading/GlobalLoading";
import { useErrorBoundary } from "react-error-boundary";

const api_key = import.meta.env.VITE_REACT_API_KEY;

const HomePage = () => {
  const [data, setData] = useState({
    featuredData: {},
    popularMovies: [],
    popularSeries: [],
    topRatedMovies: [],
    topRatedSeries: [],
  });
  const { showBoundary } = useErrorBoundary();

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // setLoading(true);
      const [
        featuredDataResponse,
        popularMoviesResponse,
        popularSeriesResponse,
        topRatedMoviesResponse,
        topRatedSeriesResponse,
      ] = await Promise.all([
        api.get(
          `${configs.mediaType.movie}/${configs.mediaCategory.popular}?api_key=${api_key}`
        ),
        api.get(
          `${configs.mediaType.movie}/${configs.mediaCategory.popular}?api_key=${api_key}`
        ),
        api.get(
          `${configs.mediaType.tv}/${configs.mediaCategory.popular}?api_key=${api_key}`
        ),
        api.get(
          `${configs.mediaType.movie}/${configs.mediaCategory.top_rated}?api_key=${api_key}`
        ),
        api.get(
          `${configs.mediaType.tv}/${configs.mediaCategory.top_rated}?api_key=${api_key}`
        ),
      ]);

      // Extract data from Axios responses
      const featuredData =
        featuredDataResponse.data.results[Math.floor(Math.random() * 20)];
      const popularMovies = popularMoviesResponse.data.results;
      const popularSeries = popularSeriesResponse.data.results;
      const topRatedMovies = topRatedMoviesResponse.data.results;
      const topRatedSeries = topRatedSeriesResponse.data.results;

      setLoading(false);
      setData({
        featuredData,
        popularMovies,
        popularSeries,
        topRatedMovies,
        topRatedSeries,
      });
    } catch (error) {
      // Show error boundary
      setLoading(false);
      showBoundary(error);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <GlobalLoading />}
      <FeaturedBanner
        mediaType={configs.mediaType.movie}
        generatedRandomMovie={data?.featuredData}
      />
      <MediaContainer
        header="POPULAR MOVIES"
        mediaData={data?.popularMovies}
        mediaType={configs.mediaType.movie}
      />

      <MediaContainer
        header="POPULAR SERIES"
        mediaData={data?.popularSeries}
        mediaType={configs.mediaType.tv}
      />

      <MediaContainer
        header="TOP RATED MOVIES"
        mediaData={data?.topRatedMovies}
        mediaType={configs.mediaType.movie}
      />

      <MediaContainer
        header="TOP RATED SERIES"
        mediaData={data?.topRatedSeries}
        mediaType={configs.mediaType.tv}
      />
    </>
  );
};

export default HomePage;
