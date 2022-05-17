// fetch data from API
const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=21922ff32e69b56af5d95243631ba12e&sort_by=popularity.desc&page=1";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=21922ff32e69b56af5d95243631ba12e&query=";
const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=21922ff32e69b56af5d95243631ba12e";
const pageNumber = 1;

function getMovies(url) {
  fetch(url)
    .then((response) => response.json())
    // 2nd line e json er bodle ja iccha use kora jbe but 1st line e jabe nah
    .then((json) => renderFunction(json.results));
}
getMovies(apiUrl);
// selectors
const main = document.querySelector(".main");
const form = document.querySelector("form");
const inputValue = document.querySelector("#search");

function renderFunction(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const movieTitle = movie.title;
    const movieRating = movie.vote_average;
    const moviePoster = movie.poster_path;
    const movieOverview = movie.overview;

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.innerHTML = `
            <img src="${
              // ternary operator
              moviePoster ? imgUrl + moviePoster : "./images/noImage.png"
            }" alt="">
            <div class="movie_info">
                <h3>${movieTitle}</h3>
                <span class="${getRatingColor(
                  movieRating
                )}">${movieRating}</span>
            </div>
            <div class="overview">
                 <h3>Overview</h3>
                 <p>${movieOverview}</p>
            </div>
`;
    main.appendChild(movieDiv);
  });
}
//movie rating color changes
function getRatingColor(rating) {
  if (rating >= 7.5) {
    return "green";
  } else if (rating >= 6) {
    return "red";
  } else {
    return "orange";
  }
}
// search
form.addEventListener("submit", function (e) {
  // preventDefault etar kaj hocche prottekbar kichu search deyar somoy search bar e kichu likhe enter dile pura page notun kore reload eta off korar jnno preventDefault use hoy
  e.preventDefault();
  // trim() etar kaj hocche search bar e unnececerry space remove kora
  const inputData = inputValue.value.trim();
  // ekhane if etar mane hocce inputData er value thakte hobe ekisathe oita empty string thaka jabe na onek somoy space dileo ta input data value hoye jay tai eita deya
  if (inputData && inputData !== "") {
    getMovies(searchUrl + inputData);
    inputData = "";
  } else {
    window.location.reload();
  }
});
// pagination
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
var pNumber = 1;
nextButton.addEventListener("click", function (e) {
  e.preventDefault();
  pNumber += 1;
  getMovies(
    baseUrl +
      "/discover/movie?" +
      apiKey +
      "&sort_by=popularity.desc&page=" +
      pNumber
  );
});
prevButton.addEventListener("click", function (e) {
  e.preventDefault();
  pNumber -= 1;
  if (pNumber <= 1) {
    getMovies(apiUrl);
    pNumber = 1;
  } else {
    getMovies(
      baseUrl +
        "/discover/movie?" +
        apiKey +
        "&sort_by=popularity.desc&page=" +
        pNumber
    );
  }
});
