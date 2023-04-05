export const movieCard = document.createElement("div");
movieCard.className("card");
movieCard.innerHTML = `
<img
    class="rounded-2xl object-cover w-44 h-64"
    src="https://th.bing.com/th/id/OIP.KNfIqaD92jvecpbxNWWQ4wHaJ4?w=139&h=185&c=7&r=0&o=5&pid=1.7"
  />
`;

export const ratedMovieCard = document.createElement("div");
ratedMovieCard.className("card relative");
ratedMovieCard.innerHTML = `
<img
class="rounded-2xl object-cover w-44 h-64"
src="https://th.bing.com/th/id/OIP.KNfIqaD92jvecpbxNWWQ4wHaJ4?w=139&h=185&c=7&r=0&o=5&pid=1.7"
/>
<p class="absolute left-3 top-4 text-white font-bold">⭐ 8.7</p>

`;
