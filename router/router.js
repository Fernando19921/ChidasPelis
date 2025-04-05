import { header } from "../components/Headers.js";
import { login } from "../Components/Login.js";
import { Main } from "../Components/Main.js";
import { renderCard } from "../Components/RenderCard.js";

export const router = () => {
    const $root = document.getElementById("root");

  const { hash } = location;
 // $root.innerHTML = null;

  if (!hash) {
    // Si no hay hash, redirige al login
    location.hash = "#/login";
    return;
  }
//Rutas que maneja el inicio de sesion
  if (hash === "#/login") {
    $root.innerHTML = null;
    $root.innerHTML = login();
    console.log("Estoy en la ruta login")

    const $form = document.getElementById("form-login");

    if ($form) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault();
        location.hash = "#/home";
      });
    }
  }
  //Ruta maneja la vista principal home
  if (hash === "#/home") {
    $root.innerHTML = "";
        $root.appendChild(header());
        $root.appendChild(Main()); 
        renderCard()
        
    console.log("Entramos a la ruta home")
  }
};
