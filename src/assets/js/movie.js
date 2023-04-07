import { API_ENDPOINT } from "./constants.js";
import { createGenreComp, selElemnt } from "./components.js";

let queryString = window.location.search;
let movieId = new URLSearchParams(queryString).get("id");

const getMoviebyId = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT("movies")}/${movieId}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const renderMovieDetail = async () => {
  try {
    let movie = await getMoviebyId();
    document.title = `The Movie Watchlist - ${movie.title}`;
    let mainElement = document.getElementsByTagName("main");
    mainElement[0].innerHTML = "";
    let pageLayout = document.createElement("div");
    pageLayout.className = "content-container";
    pageLayout.innerHTML = `
      <div
        class="top-container flex flex-row justify-between items-center mt-16"
      >
        <h2 class="movie-title text-3xl lg:text-4xl">${movie.title}</h2>
        <div class="add-to-watchlist-btn-wrapper">
          <a
            class="font-bold flex bg-slate-300 h-12 w-12 rounded-3xl items-center justify-center lg:w-48"
            ><img
              src="/src/assets/img/bookmark-icon.svg"
              class="search-icon lg:mr-1.5"
            /><span class="hidden lg:block">Add to watchlist</span></a
          >
        </div>
      </div>
      <div class="bottom-container w-full flex flex-row mt-6 flex-wrap-reverse">
        <div class="movie-info-container flex flex-row gap-5 lg:basis-1/2">
          <img
            src="${movie.image}"
            class="hidden movie-info-image object-cover w-44 h-64 rounded-2xl lg:block"
          />
          <div class="move-dscr-container mt-14 lg:mt-0">
            <div class="movie-genre-container flex flex-row gap-5">
            </div>
            <p class="movie-dscr mt-5">
              ${movie.synopsis}
            </p>
            <p class="mt-12">IMDB Rating</p>
            <p class="">
              ⭐ ${movie.rating}<span class="font-normal text-xs text-gray-500">/10</span>
            </p>
          </div>
        </div>
        <div
          class="movie-trailer-container lg:basis-1/2 lg:flex-row-reverse lg:flex"
        >
          <iframe
            class="movie-trailer rounded-2xl w-full h-48 lg:h-72 lg:max-w-xl"
            src="${movie.trailer}"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      `;
    mainElement[0].appendChild(pageLayout);
    // genre creation

    let displayedGenre = movie.genre.map((genre) => createGenreComp(genre));
    console.log(displayedGenre);

    selElemnt(".movie-genre-container").append(...displayedGenre);
  } catch (err) {
    console.log(err);
  }
};

renderMovieDetail();
