import { API_ENDPOINT } from "./constants.js";
import { createGenreComp, selElemnt } from "./components.js";

let CheckLogIn = localStorage.getItem("isLoggedIn");

const isDenied = () => {
  alert("ACCESS DENIED - Please Login to access!");
  window.location.pathname = "/";
};

if (CheckLogIn === null) {
  isDenied();
  console.log("test");
}

let queryString = window.location.search;
let movieIdParam = new URLSearchParams(queryString).get("id");

const getMoviebyId = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT("movies")}/${movieIdParam}`);
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
        <div class="btn-wrapper flex flex-row gap-4">
        <div class="add-to-watchlist-btn-wrapper">
          <a
            class="add-watchlist-btn font-bold flex bg-slate-300 h-12 w-12 rounded-3xl items-center justify-center lg:w-auto lg:px-5 "
            ><img
              src="/src/assets/img/bookmark-icon.svg"
              class="search-icon lg:mr-1.5"
            /><span class="watchlist-stat bg-slate-300 hidden lg:w-auto lg:block">Add to watchlist</span></a
          >
        </div>
        <div class="remove-from-watchlist-btn-wrapper">
          <a
            class="remove-watchlist-btn font-bold flex bg-slate-300 h-12 w-12 rounded-3xl items-center justify-center lg:w-auto lg:px-5 "
            ><img
              src="/src/assets/img/bookmark-icon.svg"
              class="search-icon lg:mr-1.5"
            /><span class="watchlist-stat bg-slate-300 hidden lg:w-auto lg:block">Remove from watchlist</span></a
          >
        </div>
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
            class="movie-trailer rounded-2xl w-screen max-w-full aspect-video lg:h-72 lg:max-w-xl"
            src="${movie.trailer}"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      `;
    mainElement[0].appendChild(pageLayout);

    // genre creatiion
    let displayedGenre = movie.genre.map((genre) => createGenreComp(genre));

    selElemnt(".movie-genre-container").append(...displayedGenre);

    //------------------------- Add to Watchlist ----------------------//
    const addToWatchlist = async (
      movieId,
      movieTitle,
      movieImage,
      movieSynopsis,
      movieGenre,
      movieProduction,
      movieTrailer,
      movieRating
    ) => {
      let response = await fetch(API_ENDPOINT("watchlist"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: movieId,
          title: movieTitle,
          image: movieImage,
          synopsis: movieSynopsis,
          genre: movieGenre,
          production: movieProduction,
          trailer: movieTrailer,
          rating: movieRating,
        }),
      });
      return await response.json();
    };

    const removeFromWatchlist = async () => {
      let response = await fetch(
        `${API_ENDPOINT("watchlist")}/${movieIdParam}`,
        {
          method: "DELETE",
        }
      );
      return await response.json();
    };

    selElemnt(".add-watchlist-btn").addEventListener("click", async () => {
      let movieId = movie.id;
      let movieTitle = movie.title;
      let movieImage = movie.image;
      let movieSynopsis = movie.synopsis;
      let movieGenre = movie.genre;
      let movieProduction = movie.production;
      let movieTrailer = movie.trailer;
      let movieRating = movie.rating;
      addToWatchlist(
        movieId,
        movieTitle,
        movieImage,
        movieSynopsis,
        movieGenre,
        movieProduction,
        movieTrailer,
        movieRating
      );
    });
    selElemnt(".remove-watchlist-btn").addEventListener("click", async () => {
      removeFromWatchlist();
    });
  } catch (err) {
    console.log(err);
  }
};

renderMovieDetail();

//Watchlist page button
selElemnt(".watchlist-btn").addEventListener("click", () => {
  window.location.pathname = "/src/pages/watchlist/";
});
