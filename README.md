

# Individual Project - Henry Food

<p align="right">
  <img height="200" src="./cooking.png" />
</p>


## Comenzando

La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

- Buscar recetas
- Filtrarlos / Ordenarlos
- Crear nuevas recetas propias

__IMPORTANTE__: Para poder utilizar esta API externa es necesario usar una api key, la cual se mostrará en el presente texto (son las 'API_PASSWORD' que se escribirán en el archivo .env). Esta api key tiene un límite de 150 peticiones por día, por lo que se debe usar con cuidado.

Pasos para poder ver el proyecto:

 1- Clonar el repositorio

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto. También es necesario tener instalado postgreSQL

Actualmente las versiónes necesarias son:

- __Node__: 12.18.3 o mayor
- __NPM__: 6.14.16 o mayor

El repositorio cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

2 - En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
#API_PASSWORD=8fac7559b35d46dfaff86dec6bee7548
#API_PASSWORD=eab5b993e0d44ed1a4e9c78dd9b8afd7
#API_PASSWORD=5df068fe925643679f31215c8ffd38b0
#API_PASSWORD=3f9882e259014f22b3cbfe49d903e6ed
#API_PASSWORD=7c0cd2d19fc8487fa5489fc8977884fa
# API_PASSWORD=b89b668065e24b309e8781cdd0e2e788
#API_PASSWORD=bea73bd0223c436bbafbbe4890977334
#API_PASSWORD=e2e83bef705f4bf79dd351c8782f6aa6
#API_PASSWORD=83319da650374a1baf7dcf6280f6897a
 API_PASSWORD=766a3e1be9b0452ba4b265a19f4af2be
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con sus propias credenciales para conectarse a postgres.

3 - Crear desde postgreSQL una base de datos llamada `food`, para esto se debe abrir la consola de postgresql y escribir la sentencia sql: 'CREATE DATABASE food;'
Luego debemos ordenar a postgreSQL que se conecte a la base de datos creada anteriormente escribiendo la línea: '\c food;' en la consola de postgres.

Una vez conectada la base de datos en postgreSQL, se debe abrir el visual studio code y en la consola dentro de la carpeta 'api' escribir 'npm install', luego poner este mismo comando en la carpeta 'client'.

4 - Escribir en la consola del visual studio, en la carpeta 'api' npm start.

5 - Escribir en la consola del visual studio, en la carpeta 'client' npm start.


