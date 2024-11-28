# Proyecto - API REST Juegos y Plataformas

**Proyecto académico:** Desarrollo de una **API REST** para gestionar **usuarios**, **juegos** y **plataformas**. Incluye autenticación y autorización mediante tokens JWT, así como permisos basados en roles (**admin** y **user**).

## Tecnologías utilizadas

Esta **API REST** está construida con las siguientes tecnologías:

- **Node.js** y **Express**: Para el desarrollo del servidor backend.
- **MongoDB (MongoDB Atlas)**: Base de datos NoSQL para el almacenamiento de datos.
- **Mongoose**: ODM para modelar los datos de MongoDB.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios.
- **Insomnia**: Para realizar pruebas a los endpoints.

## Funcionalidades clave

- **Autenticación** y **autorización**:
  - Los usuarios se registran con el rol de "user" por defecto.
  - El primer usuario admin debe ser creado manualmente en la base de datos.
  - Los usuarios admin pueden actualizar el rol de otros usuarios y gestionar usuarios, juegos y plataformas.
- **Gestión de usuarios**:
  - Crear, leer, actualizar (solo admin) y eliminar usuarios.
  - Un usuario puede eliminar su propia cuenta, mientras que los admins pueden eliminar cualquier cuenta.
- **Gestión de juegos**:
  - Crear, leer, actualizar y eliminar juegos.
  - Los juegos pueden ser verificados automáticamente si el creador es admin.
- **Gestión de plataformas**:
  - Crear, leer, actualizar y eliminar plataformas.
  - Relación entre juegos y plataformas mediante ObjectId.

## Relación entre colecciones

- **Usuarios**: Pueden tener una lista de juegos favoritos.
- **Juegos**: Relacionados con plataformas.
- **Plataformas**: Pueden tener múltiples juegos asociados.

## Endpoints Usuarios

| NAME             | METHOD | ENDPOINT             | BODY PARAMS                 |
| ---------------- | ------ | -------------------- | --------------------------- |
| GET USERS        | GET    | /api/users           | ---                          |
| REGISTER         | POST   | /api/users/register  | { userName, password }       |
| LOGIN            | POST   | /api/users/login     | { userName, password }       |
| DELETE USER      | DELETE | /api/users/:id       | ---                          |
| UPDATE USER ROLE | PUT    | /api/users/:id       | { rol } (solo admin)         |

## Endpoints Juegos

| NAME               | METHOD | ENDPOINT                         | BODY PARAMS                              |
| ------------------ | ------ | -------------------------------- | ---------------------------------------- |
| GET JUEGOS         | GET    | /api/juegos                      | ---                                      |
| GET JUEGO BY ID    | GET    | /api/juegos/:id                  | ---                                      |
| GET JUEGOS BY CATEGORY | GET | /api/juegos/categoria/:categoria | ---                                      |
| GET JUEGOS BY PRICE | GET    | /api/juegos/precio/:precio       | ---                                      |
| POST JUEGO         | POST   | /api/juegos                      | { nombre, imagen, precio, categoria, plataformaId } |
| UPDATE JUEGO       | PUT    | /api/juegos/:id                  | { nombre, imagen, precio, categoria } (solo admin) |
| DELETE JUEGO       | DELETE | /api/juegos/:id                  | ---                                      |
| GET UNVERIFIED JUEGOS | GET | /api/juegos/not-verified         | --- (solo admin)                         |

## Endpoints Plataformas

| NAME               | METHOD | ENDPOINT               | BODY PARAMS                     |
| ------------------ | ------ | ---------------------- | ------------------------------- |
| GET PLATAFORMAS    | GET    | /api/plataformas       | ---                             |
| GET PLATAFORMA BY ID | GET  | /api/plataformas/:id   | ---                             |
| POST PLATAFORMA    | POST   | /api/plataformas       | { nombre, descripcion, logo } (solo admin) |
| UPDATE PLATAFORMA  | PUT    | /api/plataformas/:id   | { nombre, descripcion, logo } (solo admin) |
| DELETE PLATAFORMA  | DELETE | /api/plataformas/:id   | --- (solo admin)                |

## Autenticación

Para acceder a los endpoints protegidos, se debe incluir un token JWT en los headers de la petición:

### Cómo obtener el token
1. Haz una solicitud de login usando el endpoint `/api/users/login`.
2. Usa el token recibido en el header para acceder a los endpoints protegidos.


## Instrucciones para Ejecutar las Seeds

Para poblar tu base de datos con los datos iniciales de **Juegos** y **Plataformas**, solo necesitas ejecutar dos comandos.

### Pasos para Ejecutar las Seeds

1. Abre una terminal y navega hasta la carpeta raíz de tu proyecto.
2. Ejecuta el siguiente comando para insertar los juegos y las plataformas:

   ```bash
   node utils/seeds/seedJuegos.js
   node utils/seeds/seedPlataformas.js


## Notas

- El primer usuario administrador debe crearse manualmente en la base de datos y asignarle el rol `admin`.
- Los usuarios registrados por defecto tienen el rol `user`.
- Los juegos solo se verificarán automáticamente si son creados por un usuario admin.
