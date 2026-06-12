# 312 Motors — Landing Page

Landing page estática para **312 Motors**: servicio a domicilio de diagnóstico y reparación automotriz en Bogotá.

## Stack

- HTML5
- SCSS (compilado con [Dart Sass](https://sass-lang.com/))
- JavaScript vanilla (sin frameworks)

## Estructura

```
landing_page/
├── index.html          Página principal
├── scss/               Estilos fuente (editar aquí)
│   ├── main.scss
│   ├── _variables.scss
│   ├── _base.scss
│   └── _sections.scss
├── css/main.css        CSS compilado (no editar a mano)
├── js/main.js          Interacciones (nav, carrusel, scroll-reveal, formulario)
└── assets/img/         Imágenes
```

## Desarrollo

```bash
npm install        # instala sass
npm run watch      # compila SCSS al guardar
npm run build      # compila minificado para producción
```

Abrir `index.html` en el navegador (o servir con cualquier servidor estático).

## Datos pendientes de reemplazo

- Teléfono / WhatsApp: actualmente `+57 300 000 0000` (buscar `573000000000` y `300 000 0000` en `index.html` y `js/main.js`).
- Imágenes: placeholders de Unsplash, reemplazar por fotos reales del cliente en `assets/img/`.
- Video de presentación: placeholder de YouTube en la sección de video.
- Testimonios y redes sociales: contenido de ejemplo.
