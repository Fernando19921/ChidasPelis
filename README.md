# ChidasPelis

Este una migracion de un proyecto creado en vanilla js y fue migrado a   [Angular CLI](https://github.com/angular/angular-cli) version 18.2.18 el objetivo general del proyecto es crear una plataforma de streaming

### Fucnionalidades

- Cargada dinamica de informacion desde Json
- Diseno responsivo
- Vista inicio sesion simulada
- Agrega peliculas a favoritos

##### Cómo Descargar Repositorio

1. Abre la consola o terminal en tu computadora.
2. Copia el enlace del repositorio desde GitHub.
3. Ejecuta el siguiente comando en la consola:

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

### Capturas de pantalla Login

![Vista del Login](./src/assets/images/Vistalogin.png)

### Captura de pantalla Home

![Vista del Login](./src/assets/images/VistaHome.png)

### Covarge

![Vista del Login](./src/assets/images/Covarage.webp)

### Dependecia utilizadas

## Dependencias y Bibliotecas

- [`@angular/common/http@18.2.18`](https://angular.io/api/common/http/HttpClient): Utilizado para realizar peticiones HTTP y obtener los datos del archivo `peliculas.json`.
- [`bootstrap@5.3.3`](https://getbootstrap.com/docs/5.3/getting-started/introduction/): Utilizado para los estilos y diseño responsivo del proyecto.

---

### Instalación de dependencias

```bash
npm install bootstrap@5.3.3
```

### Descripcion de como lo hice y problemas conocidos

###### Migracion a angular

La migración se me facilitó un poco porque mi proyecto en vanilla ya lo tenía estructurado en componentes. Sin embargo, los principales problemas que tuve fueron debido a que nunca había trabajado con Angular. Estaba aprendiendo y desarrollando el proyecto al mismo tiempo.

Aunque ya tenía noción de cómo funcionan los componentes, usarlos en Angular tiene su manera particular de hacerlo. Afortunadamente, una vez que le entiendes, todo se va haciendo más fácil.

Otro conflicto que tuve fue al utilizar `HttpClient`, ya que nunca lo había usado antes. También batallé un poco al organizar mis imágenes, porque en varias ocasiones ponía rutas incorrectas.

###### Pruebas Unitaria

Las pruebas unitarias realizadas con Jasmine me resultaron algo desafiantes, ya que nunca antes había trabajado con pruebas tan elaboradas en mi proyecto. Aunque tenía algo de conocimiento previo utilizando Jest, encontré ciertas dificultades debido a aspectos del testing que aún desconozco. Sin embargo, esta experiencia me permitió aprender y mejorar mis habilidades en este ámbito.

### Retrospectiva


### ✅ ¿Qué hice bien?

Logré cumplir con los objetivos del proyecto, ya que pude  **migrar exitosamente la aplicación a Angular** . Además, implementé pruebas unitarias que cubren todas las funcionalidades del componente, alcanzando un **90% de cobertura de código** (`code coverage`). Esto garantiza un alto nivel de confiabilidad y calidad en el funcionamiento del módulo.

#### 🧪 Funcionalidades cubiertas en los tests:

* Agregado a favoritos
* Lectura desde `localStorage`
* Actualización del estado visual
* Protección contra SSR (`localStorage` solo en navegador)

---

### ❌ ¿Qué no salió tan bien?

Tuve dificultades al **organizar los archivos del proyecto** y al adaptarme a Angular, ya que me enfrenté a varias características propias del framework que desconocía. Sin embargo, estas barreras me permitieron aprender y mejorar mis habilidades en esta nueva tecnología.

#### 🔁 ¿Qué puedo hacer diferente?

Creo que puedo mejorar aún más mi trabajo fortaleciendo mis conocimientos en Angular y practicando más para familiarizarme con su estructura y herramientas.
