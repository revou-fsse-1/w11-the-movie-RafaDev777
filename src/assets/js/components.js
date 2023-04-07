export const createMovieCard = (data) => {
  let movieCard = document.createElement("div");
  movieCard.className = "card";
  movieCard.innerHTML = `
  <a href="/src/pages/movie/?id=${data.id}">
<img
    class="rounded-2xl object-cover w-44 h-64"
    src="${data.image}"
  />
  </a>
  `;
  return movieCard;
};

export const createRatedMovieCard = (data) => {
  let ratedMovieCard = document.createElement("div");
  ratedMovieCard.className = "card relative";
  ratedMovieCard.innerHTML = `
  <a href="/src/pages/movie/?id=${data.id}">
  <img
  class="rounded-2xl object-cover w-44 h-64"
  src="${data.image}"
  />
  <p class="absolute left-3 top-4 text-white font-bold">⭐ ${data.rating}</p>
  </a>
  `;
  return ratedMovieCard;
};

export const selElemnt = (query) => {
  return document.querySelector(query);
};
