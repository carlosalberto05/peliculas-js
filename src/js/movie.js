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
  // console.log(movieDetails);
  const { backdrop_path, poster_path, title, overview, genres, release_date } =
    movieDetails;

  renderBackground(backdrop_path);
  renderPoster(poster_path, title);
  renderMovieData(title, overview, genres, release_date);
  renderTeaser(movieId);
};

const renderBackground = (backdrop_path) => {
  const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  document.getElementsByClassName(
    "movie-info"
  )[0].style.backgroundImage = `url('${urlImage}')`;
};

const renderPoster = (poster_path, title) => {
  const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;

  const html = `<img src="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}"/>`;

  document.getElementsByClassName("movie-info__poster")[0].innerHTML = html;
};

const renderMovieData = (title, overview, genres, release_date) => {
  const dataSplit = release_date.split("-");

  let htmlGenres = "";

  genres.forEach((genre) => {
    htmlGenres += `<li>${genre.name}</li>`;
  });

  const html = `
    <h1>
      ${title}
      <span class="date-any">${dataSplit[0]}</span>
      <span class="teaser" data-toggle="modal" data-target="#video-teaser">
      <i class="fas fa-play"></i> Ver trailer
      </span>
    </h1>
    <h5>General</h5>
    <p>${overview}</p>
    <h5>Generos</h5>
   <ul>
    ${htmlGenres}
   </ul>
  `;

  document.getElementsByClassName("movide-info__data")[0].innerHTML = html;
};

const renderTeaser = (movieId) => {
  const url = `${URL_PATH}/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => console.log(result.results))
    .catch((err) => console.log(err));
};
