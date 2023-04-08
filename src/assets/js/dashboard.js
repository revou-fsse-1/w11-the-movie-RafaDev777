import {
  createMovieCard,
  createRatedMovieCard,
  selElemnt,
} from "./components.js";
import { API_ENDPOINT } from "./constants.js";

let CheckLogIn = localStorage.getItem("isLoggedIn");

const isDenied = () => {
  alert("ACCESS DENIED - Please Login to access!");
  window.location.pathname = "/";
};

if (CheckLogIn === null) {
  isDenied();
  console.log("test");
}

//Currently Watching
const getCurrWatch = async () => {
  try {
    let response = await fetch(API_ENDPOINT("currentWatch"));
    return await response.json();
  } catch (err) {
    console.log("error", err);
  }
};

const renderCurrWatch = async () => {
  let currWatchMovies = await getCurrWatch();
  if (currWatchMovies.length === 0) {
    selElemnt(".crnt-watch-card-container").innerHTML = `
    <div class="error-msg-container flex flex-row gap-10 items-center">
    <span class="text-[120px] font-bold">:(</span><p class="text-[60px] leading-tight">You haven't watch</br>any movie!</p>
    </div>
    `;
  } else {
    currWatchMovies.forEach((movie) => {
      selElemnt(".crnt-watch-card-container").appendChild(
        createMovieCard(movie)
      );
    });
  }
};

renderCurrWatch();

//Suggested Movie
const getSuggested = async () => {
  try {
    let response = await fetch(API_ENDPOINT("isSuggested"));
    return await response.json();
  } catch (err) {
    console.log("error", err);
  }
};

const renderSuggested = async () => {
  let suggestedMovies = await getSuggested();
  if (suggestedMovies.length === 0) {
    selElemnt(".sgtd-watch-card-container").innerHTML = `
    <div class="error-msg-container flex flex-row gap-10 items-center">
    <span class="text-[120px] font-bold">:(</span><p class="text-[60px] leading-tight">We can't give</br>any movie suggestion yet!</p>
    </div>
    `;
  } else {
    suggestedMovies.forEach((movie) => {
      selElemnt(".sgtd-watch-card-container").appendChild(
        createRatedMovieCard(movie)
      );
    });
  }
};

renderSuggested();

//Previously Watch
const getPrevWatch = async () => {
  try {
    let response = await fetch(API_ENDPOINT("isPrevious"));
    return await response.json();
  } catch (err) {
    console.log("error", err);
  }
};

const renderPrevMovie = async () => {
  let prevMovies = await getPrevWatch();
  if (prevMovies.length === 0) {
    selElemnt(".prvs-watch-card-container").innerHTML = `
    <div class="error-msg-container flex flex-row gap-10 items-center">
    <span class="text-[120px] font-bold">:(</span><p class="text-[60px] leading-tight">You haven't watch<br/>any movie yet!</p>
    </div>
    `;
  } else {
    prevMovies.forEach((movie) => {
      selElemnt(".prvs-watch-card-container").appendChild(
        createMovieCard(movie)
      );
    });
  }
};

renderPrevMovie();

//Watchlist page button
selElemnt(".watchlist-btn").addEventListener("click", () => {
  window.location.pathname = "/src/pages/watchlist/";
});
