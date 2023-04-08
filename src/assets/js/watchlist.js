import { API_ENDPOINT } from "./constants.js";
import { selElemnt, createRatedMovieCard } from "./components.js";

let CheckLogIn = localStorage.getItem("isLoggedIn");

const isDenied = () => {
  alert("ACCESS DENIED - Please Login to access!");
  window.location.pathname = "/";
};

if (CheckLogIn === null) {
  isDenied();
  console.log("test");
}

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
  if (movieWatchlist.length === 0) {
    selElemnt(".watchlist-movie-container").innerHTML = `
    <div class="error-msg-container flex flex-row gap-10 items-center">
    <span class="text-[120px] font-bold">:(</span><p class="text-[60px] leading-tight">You don't have</br>watchlist yet!</p>
    </div>
    `;
  } else {
    movieWatchlist.forEach((movie) => {
      selElemnt(".watchlist-movie-container").appendChild(
        createRatedMovieCard(movie)
      );
    });
  }
};

renderWatchlist();

//Watchlist page button
selElemnt(".watchlist-btn").addEventListener("click", () => {
  window.location.pathname = "/src/pages/watchlist/";
});
