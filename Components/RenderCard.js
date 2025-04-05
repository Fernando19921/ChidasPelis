import { fetchData } from "../helpers/axios.js";
import { PostCard } from "./PostCard.js";

export const renderCard = async () => {
  const $container = document.createElement("section");
  const $main = document.getElementById("main");
  $container.classList.add("card-container");

  await fetchData({
    url: "peliculas.json",
    Success: (posts) => {
      let html = "";
      posts.data.forEach((post) => {
        html += PostCard(post);
      });

      $container.innerHTML = html;     // las cards van dentro del contenedor
      $main.innerHTML = "";            // Limpiamos el contenido anterior del main
      $main.appendChild($container);   //  agregamos el contenedor al main
    }
  });
  console.log("Los datos de las card estan cargados")
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-agregar")) {
    const $title=e.target.dataset.title;
    alert(`Agregastes --"${$title}"-- a tus favoritos🎬`); 
  }
});



