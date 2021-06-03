const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "128402215172fea4f96566ae019f6b5d";
let MOVIE_ID = "";

document.addEventListener("DOMContentLoaded", () => {
  MOVIE_ID = getUrlVars().id;
  renderMovieDetails(MOVIE_ID);
});

const getUrlVars = () => {
  let vars = {};
  window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
};

const getMovieDetails = (movieId) => {
  const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};

const renderMovieDetails = async (movieId) => {
  const movieDetails = await getMovieDetails(movieId);
  console.log(movieDetails);
};
