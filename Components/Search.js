export const inputSearch = () => {
    const d = document,
        $form = d.createElement("form"),
        $wrapper = d.createElement("div"),
        $input = d.createElement("input"),
        $icon = d.createElement("span");

    $form.classList.add("search-form");
    $wrapper.classList.add("input-wrapper");
    $input.name = "search";
    $input.type = "search";
    $input.placeholder = "search";
    $input.autocomplete = "off";

    $icon.classList.add("user-icon");
    $icon.innerHTML = "&#128100;"; 

    $wrapper.appendChild($input);
    $wrapper.appendChild($icon);
    $form.appendChild($wrapper);


    return $form;
}
