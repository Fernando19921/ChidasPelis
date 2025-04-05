//import { header } from "./components/Headers.js"
//import { Main } from "./Components/Main.js";
//import { renderCard } from "./Components/RenderCard.js";
import { router } from "./router/router.js";



//Esto manda a llamar todos mis componentes
export const App=()=>{
   // const $root= document.getElementById("root")
    //$root.innerHTML=null
    //$root.appendChild(header());
    //$root.appendChild(Main());
    //renderCard();
    router();
}

