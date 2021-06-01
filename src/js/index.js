const URL_PATH = "https://api.themoviedb.org";
const APE_KEY = "128402215172fea4f96566ae019f6b5d";

// const getNewsMovies = async () => {
//   try {
//     const url = `${URL_PATH}/3/movie/now_playing?api_key=${APE_KEY}&language=es-ES&page=1`;
//     const res = await fetch(url);
//     console.log(res);
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// getNewsMovies();

document.addEventListener("DOMContentLoaded", () => {
  renderNewsMovies();
});

const getNewsMovies = async () => {
  const url = `${URL_PATH}/3/movie/now_playing?api_key=${APE_KEY}&language=es-ES&page=1`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((err) => console.log(err));
};

const renderNewsMovies = async () => {
  const newMovies = await getNewsMovies();
  // console.log(newMovies);

  let html = "";

  newMovies.forEach((movie, index) => {
    const { id, title, overview, backdrop_path } = movie;
    const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const urlMovie = `/movie.html?id=${id}`;

    html += `
    <div class="carousel-item ${
      index === 0 ? "active" : null
    }" style="background-image:url('${urlImage}')">
       <div class="carousel-caption">
        <h5>${title}</h5>
        <p>${overview}</p>
        <a href="${urlMovie}" class="btn btn-primary">Más Información</a>
       </div>
    </div>`;
  });

  html += `
  <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Anterior</span>
  </a>
  <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Siguiente</span>
  </a>
  `;

  document.getElementsByClassName("list-news-movies")[0].innerHTML = html;
};
