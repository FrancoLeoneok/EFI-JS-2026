# Feria Imperio

Catálogo de la feria de Río Cuarto. Permite conocer los puestos, buscar productos, ver su detalle, armar un carrito y publicar o eliminar productos de prueba. Usa React, Vite, Tailwind y la [API de Python del EFI](https://efi-pp1-python-771ef59e.fastapicloud.dev/api/v1/docs).

## Ejecutar en local

```sh
npm ci
npm run dev
```

Abrí la URL que imprime Vite. El proyecto usa la API del EFI por defecto. Para cambiarla, copiá `.env.example` a `.env.local`, ajustá `VITE_API_URL` (incluí el prefijo `/api/v1`) y reiniciá Vite.

`npm run lint` revisa el código y `npm run build` genera la versión de producción.

## Fotos de productos

Subí la foto a ImgBB y pegá el enlace directo a la imagen en el campo opcional del formulario.

## Navegación

- `/`: inicio con puestos destacados.
- `/products`: catálogo con búsqueda, categorías y paginación.
- `/products/:id`: detalle del producto. Abre la subruta `/products/:id/descripcion` por defecto.
- `/feriantes/:id`: perfil del puesto y sus productos.
- `/cart`: carrito compartido con Context API durante la navegación.
- `/agregar-producto`: publica mediante POST y permite eliminar mediante DELETE los productos recién creados en esa pantalla. Usá datos de prueba y eliminalos antes de salir.
- `/about`: información del equipo.

La API del EFI no documenta autenticación para la edición de productos. Esta pantalla sirve para la demostración académica; para usarla como administración pública hace falta que el backend controle los permisos.

## Vercel

Importá el repositorio como proyecto Vite, configurá `VITE_API_URL` con el valor de `.env.example` y desplegá. `vercel.json` permite abrir rutas internas directamente y recargarlas. Verificá que la API admita el dominio del despliegue si configurás CORS en el backend.

## Integrantes

- Alejo Alaminos
- Franco Lopez Leone
- Joaquin Fornasari
- Quiroga Mauricio Nicolas
