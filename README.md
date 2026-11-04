# EFI Javascript

Aplicación web del Examen Final Integrador de JavaScript. Presenta productos y puestos de Río Cuarto, Córdoba, y consume la [API de Python del EFI](https://efi-pp1-python-771ef59e.fastapicloud.dev/api/v1/docs).

## Sobre el proyecto

Feria Imperio permite conocer a los emprendedores locales, explorar sus productos y armar un carrito. El catálogo reúne los productos de **Mates El Imperio** y **Cerámicas del Sur**. La vista admin permite demostrar el alta y la baja de productos contra la API.

## Funcionalidades actuales

- **Inicio y puestos:** feriantes destacados y perfiles con información del emprendimiento y búsqueda en sus productos.
- **Catálogo:** búsqueda por texto, filtro por puesto, paginación y fichas con precio, disponibilidad y descripción.
- **Carrito:** productos y cantidades compartidos entre pantallas mediante Context API durante la navegación.
- **Vista admin:** formulario con validación para publicar productos. La foto es opcional y se agrega con un enlace directo de ImgBB. Los productos recién publicados se pueden eliminar desde la misma pantalla.

El selector de vistas sirve para la demostración académica. La vista usuario oculta el formulario y redirige al catálogo si se intenta abrir su URL. La autorización de operaciones sobre los datos corresponde a la API.

## Tecnologías

- **React 19 y JavaScript:** componentes, formularios y estado.
- **React Router DOM 7:** rutas principales, dinámicas y anidadas.
- **Vite 8 y Tailwind CSS 4:** entorno de desarrollo, compilación y estilos.
- **Fetch y FastAPI:** lectura, alta y baja de productos mediante la API de Python.
- **Context API:** carrito y modo de visualización compartidos.

## Arquitectura y rutas

`src/pages/` contiene las pantallas, `src/components/` los elementos reutilizables y `src/context/` el estado compartido. `src/api.js` centraliza las peticiones y `src/useApi.js` gestiona los datos, la carga y los errores con `useState` y `useEffect`.

- `/`: inicio y puestos destacados.
- `/products`: catálogo con búsqueda y filtro por puesto.
- `/products/:id`: detalle dinámico. Abre por defecto `/products/:id/descripcion`, su ruta anidada.
- `/feriantes/:id`: perfil y productos del puesto.
- `/cart`: carrito.
- `/agregar-producto`: formulario disponible en vista admin.
- `/about`: información del proyecto y del equipo.

## 🤝 Colaboradores

Participantes del Trabajo

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/FornaJoa" title="Perfil de Joaquin Fornasari en GitHub">
        <img src="https://avatars.githubusercontent.com/u/163206353?v=4" width="100" alt="Foto de Joaquin Fornasari en GitHub"/><br>
        <sub>
          <b>Joaquin Fornasari</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/FrancoLeoneok" title="Perfil de Franco Leone en GitHub">
        <img src="https://avatars.githubusercontent.com/u/178578464?v=4" width="100" alt="Foto de Franco Leone en GitHub"/><br>
        <sub>
          <b>Franco Leone</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/AlejoAlaminos" title="Perfil de Alejo Alaminos en GitHub">
        <img src="https://avatars.githubusercontent.com/u/164796037?v=4" width="100" alt="Foto de Alejo Alaminos en GitHub"/><br>
        <sub>
          <b>Alejo Alaminos</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/nicoquiroga20-lang" title="Perfil de Nicolas Quiroga en GitHub">
        <img src="https://avatars.githubusercontent.com/u/232619836?v=4" width="100" alt="Foto de Nicolas Quiroga en GitHub"/><br>
        <sub>
          <b>Nicolas Quiroga</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
