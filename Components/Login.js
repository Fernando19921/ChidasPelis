
export const login = () => {
    return `
      <header class="login-header">
        <img src="./assets/logo.webp" alt="Logo" class="logo-header" />
      </header>
  
      <section class="login-form">
        <div class="login-container">
          <img src="./assets/logo.webp" alt="Logo" class="logo-form" />
          <h2>Iniciar Sesión</h2>
          <form id="form-login" method="post">
            <input type="email" name="email" placeholder="Correo electrónico" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </section>
    `;
  };
  