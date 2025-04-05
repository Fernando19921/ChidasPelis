export const menu_botones = () => {
    const $menu = document.createElement("nav");
    $menu.classList.add("menu");

    $menu.innerHTML = `
    <a href="#">Acción</a>
    <span></span>

    <a href="#">Terror</a>
    <span></span>

    <a href="#">Comedia</a>
    <span></span>

    <a href="#">Recomendaciones</a>
    <span></span>
    `;

    return $menu;
};
