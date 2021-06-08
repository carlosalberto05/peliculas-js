const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "128402215172fea4f96566ae019f6b5d";

document.addEventListener("DOMContentLoaded", () => {
  let { page } = getUrlVars();
  page == undefined ? (page = 1) : null;
  renderNewMovies(page);
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

const getNewsMovies = (page) => {
  const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=es-MX&page=${page}`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};

const renderNewMovies = async (page) => {
  const movies = await getNewsMovies(page);

  let html = "";

  movies.forEach((movie) => {
    const { id, title, poster_path } = movie;
    const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const urlMoreInfo = `../../movie.html?id=${id}`;

    html += `
        <div class="col-3 col-custom">
            <a href="${urlMoreInfo}" class="card custom-card">
            <img src="${urlImage}" class="card-img-top" alt="${title}">
            <div class="card-body">
            <h4 class="card-title text-center m-0">${title}</h4>
            </div>
            </a>
        </div>
    `;
  });

  document.getElementsByClassName("list-cards")[0].innerHTML = html;
};
