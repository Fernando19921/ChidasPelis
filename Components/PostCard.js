export const PostCard = (propm) => {
  const { titulo, director, anio, genero, img, trailer } = propm;

  return `
    <article class="post-card">
      <img src="${img}" alt="${titulo}" class="card-img" 
          onerror="this.style.display='none';" />
      <div class="card-content">
        <h3 class="card-title">${titulo}</h3>
        <p class="card-desc">
          <strong>Director:</strong> ${director}<br>
          <strong>Año:</strong> ${anio}<br>
          <strong>Género:</strong> ${genero}
        </p>
        <div class="card-buttons">
          <a class="btn btn-trailer" href="${trailer}" target="_blank" rel="noopener noreferrer">Ver tráiler</a>
          <button class="btn btn-fav btn-agregar" data-title="${titulo}">Agregar a favoritos</button>
        </div>
      </div>
    </article>
  `;
};

