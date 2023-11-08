import { useState, useEffect } from "react";
import FeaturedBanner from "../components/FeaturedBanner";
import MediaContainer from "../components/MediaContainer";
import configs from "../config/config";
import api from "../utils/api";
import Error from "../components/Error";
import GlobalLoading from "../components/Loading/GlobalLoading";

const api_key = import.meta.env.VITE_REACT_API_KEY;

const HomePage = () => {
  const [data, setData] = useState({
    featuredData: {},
    popularMovies: [],
    popularSeries: [],
    topRatedMovies: [],
    topRatedSeries: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
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

      setData({
        featuredData,
        popularMovies,
        popularSeries,
        topRatedMovies,
        topRatedSeries,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (loading) {
  //   return <GlobalLoading />;
  // }
  return (
    <>
      {loading && <GlobalLoading />}
      <FeaturedBanner
        mediaType={configs.mediaType.movie}
        generatedRandomMovie={data?.featuredData}
      />
      <MediaContainer
        header="POPULAR MOVIES"
        // mediaCategory={configs.mediaCategory.popular}
        mediaData={data?.popularMovies}
        mediaType={configs.mediaType.movie}
      />

      <MediaContainer
        header="POPULAR SERIES"
        // mediaCategory={configs.mediaCategory.popular}
        mediaData={data?.popularSeries}
        mediaType={configs.mediaType.tv}
      />

      <MediaContainer
        header="TOP RATED MOVIES"
        // mediaCategory={configs.mediaCategory.top_rated}
        mediaData={data?.topRatedMovies}
        mediaType={configs.mediaType.movie}
      />

      <MediaContainer
        header="TOP RATED SERIES"
        // mediaCategory={configs.mediaCategory.top_rated}
        mediaData={data?.topRatedSeries}
        mediaType={configs.mediaType.tv}
      />
      {error && <Error message={error} />}
    </>
  );
};

export default HomePage;
