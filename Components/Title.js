
export const title = () => {
    
    const $contenedor = document.createElement("div");
    $contenedor.classList.add("contenedor-img");

    const $img = document.createElement("img");
    $img.src = "./assets/logo.webp"; 
    $img.alt = "Logo de ChidasPelis";
    $img.classList.add("titulo-img");


    $contenedor.appendChild($img);
    return $contenedor;
};
