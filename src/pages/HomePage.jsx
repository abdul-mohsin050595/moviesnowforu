import FeaturedBanner from "../components/FeaturedBanner";
import MediaContainer from "../components/MediaContainer";
import configs from "../config/config";

const HomePage = () => {
  return (
    <>
      <FeaturedBanner
        mediaType={configs.mediaType.movie}
        mediaCategory={configs.mediaCategory.popular}
      />
      <MediaContainer
        header="POPULAR MOVIES"
        mediaCategory={configs.mediaCategory.popular}
        mediaType={configs.mediaType.movie}
      />

      <MediaContainer
        header="POPULAR SERIES"
        mediaCategory={configs.mediaCategory.popular}
        mediaType={configs.mediaType.tv}
      />

      <MediaContainer
        header="TOP RATED MOVIES"
        mediaCategory={configs.mediaCategory.top_rated}
        mediaType={configs.mediaType.movie}
      />

      <MediaContainer
        header="TOP RATED SERIES"
        mediaCategory={configs.mediaCategory.top_rated}
        mediaType={configs.mediaType.tv}
      />
    </>
  );
};

export default HomePage;
