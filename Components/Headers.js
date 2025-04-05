import { menu_botones } from "./menu.js";
import { inputSearch } from "./Search.js";
import { title } from "./Title.js";



export function header() {
    const $header = document.createElement("header");
    $header.classList.add("header");
    $header.appendChild(title());
    $header.appendChild(menu_botones());
    $header.appendChild(inputSearch())
    console.log("se cargo el header")
    return $header;
}

