import { App } from "./app.js"
import { router } from "./router/router.js";
document.addEventListener("DOMContentLoaded",App)

window.addEventListener("hashchange", ()=>{
    App()
});

