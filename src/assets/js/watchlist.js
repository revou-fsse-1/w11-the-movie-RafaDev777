import { API_ENDPOINT } from "./constants.js";
import { selElemnt, createRatedMovieCard } from "./components.js";

const getWatchlist = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT("watchlist")}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const renderWatchlist = async () => {
  let movieWatchlist = await getWatchlist();
  movieWatchlist.forEach((movie) => {
    selElemnt(".watchlist-movie-container").appendChild(
      createRatedMovieCard(movie)
    );
  });
};

renderWatchlist();
