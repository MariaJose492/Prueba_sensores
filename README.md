# Tecnimática

Sistema web para gestión y monitoreo industrial de sensores y zonas de una planta.

El proyecto está dividido en dos partes:

* Backend: API REST desarrollada con FastAPI.
* Frontend: interfaz web desarrollada con React + Vite.

---

# Estructura del proyecto

```text
TECNIMÁTICA/
├── backend/
├── frontend/
├── schema.sql
├── README.md
└── DECISIONS.md
```

---

# Backend

El backend expone una API REST para administrar sensores, zonas y monitoreos industriales.

## Tecnologías utilizadas

* FastAPI
* SQLAlchemy
* PostgreSQL
* Uvicorn
* Pydantic

---

## Requisitos

* Python 3.10 o superior
* PostgreSQL en ejecución

---

## Variables de entorno

El backend utiliza un archivo `.env` dentro de `backend/`.

Ejemplo:

```env
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tecnimatica
```

---

## Instalación y ejecución

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

La API estará disponible en:

```text
http://localhost:8000
```

---

## Documentación Swagger

FastAPI genera documentación automática en:

```text
http://localhost:8000/docs
```

---

## Endpoints principales

### Sensores

* `GET /sensors`

  * Lista todos los sensores.

* `GET /sensors/{id}/zones`

  * Lista las zonas monitoreadas por un sensor.

---

### Zonas

* `GET /zones`

  * Lista todas las zonas y la cantidad de sensores activos.

* `GET /zones/{id}/sensors`

  * Lista sensores asociados a una zona.

---

### Monitoreos

* `GET /monitorings`

  * Lista monitoreos.
  * Permite filtro opcional por estado.

* `POST /monitorings`

  * Asigna un sensor a una zona.

* `PATCH /monitorings/{id}`

  * Actualiza estado o umbral de un monitoreo.

---

# Frontend

El frontend consume la API REST y muestra información de sensores, zonas y monitoreos.

---

## Tecnologías utilizadas

* React
* Vite
* Axios
* React Router DOM

---

## Requisitos

* Node.js 18 o superior

---

## Instalación y ejecución

```bash
cd frontend

npm install

npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## Páginas principales

* `/`

  * Página principal con zonas y accesos rápidos.

* `/sensors`

  * Listado de sensores con filtros visuales por estado.

* `/zones/:id`

  * Vista detalle de una zona y sus sensores.

* `/monitorings/create`

  * Formulario para asignar sensores a zonas.

* `/monitorings/update`

  * Actualización de estado y umbral de monitoreos.

---

## Funcionalidades implementadas

* Listado de zonas con cantidad de sensores activos.
* Vista detalle de sensores por zona.
* Formulario para crear monitoreos.
* Actualización de estado y umbral de monitoreo.
* Indicadores visuales para:

  * sensores activos
  * sensores pausados
  * sensores inactivos
* Validaciones y manejo de errores descriptivos.
* Refresco automático de información.
* Navegación entre páginas mediante React Router.

---

## Conexión con la API

El frontend se conecta por defecto a:

```text
http://localhost:8000
```

Si se modifica la URL o el puerto del backend, se debe actualizar la constante `API_URL` dentro de los servicios del frontend.

---

# Base de datos

El archivo `schema.sql` contiene:

* Creación completa de tablas.
* Relaciones entre entidades.
* Restricciones y llaves foráneas.
* Datos de prueba iniciales.

---

## Cargar la base de datos

```bash
psql -U postgres -d tecnimatica -f schema.sql
```

---

# Flujo de ejecución

1. Levantar PostgreSQL.
2. Ejecutar el backend desde `backend/`.
3. Ejecutar el frontend desde `frontend/`.
4. Abrir:

```text
http://localhost:5173
```

---

# Notas

* El backend utiliza CORS para permitir conexión local con el frontend.
* Si no aparecen datos:

  * verificar que PostgreSQL esté activo
  * verificar que el backend esté corriendo
  * verificar que la base de datos tenga registros cargados
* Los mensajes de error fueron implementados de forma descriptiva para facilitar validaciones y pruebas.

---
