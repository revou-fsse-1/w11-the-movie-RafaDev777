import {
  createMovieCard,
  createRatedMovieCard,
  selElemnt,
} from "./components.js";
import { API_ENDPOINT } from "./constants.js";

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
  currWatchMovies.forEach((movie) => {
    selElemnt(".crnt-watch-card-container").appendChild(createMovieCard(movie));
  });
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
  suggestedMovies.forEach((movie) => {
    selElemnt(".sgtd-watch-card-container").appendChild(
      createRatedMovieCard(movie)
    );
  });
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
  prevMovies.forEach((movie) => {
    selElemnt(".prvs-watch-card-container").appendChild(createMovieCard(movie));
  });
};

renderPrevMovie();
