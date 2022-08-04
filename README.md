# Instalación
## Requisitos
* Angular CLI
* Node y NPM
* MySQL / MariaDB
## Pasos
1. Clonar o descargar este repositorio. En la terminal navegar al directorio y ejecutar ``npm install`` para instalar las dependencias de Angular y cosas del lado del cliente
2. Ahora navegar a la carpeta **api** y ejecutar lo mismo: ``npm install``
3. Crear base de datos y usuario en MySQL
4. Crear archivo **.env** a partir del ejemplo **.env.example** (dentro de **api**)
5. Importar **esquema.sql** a la base de datos recién creada en el paso 3
6. Configurar credenciales de la base de datos en **.env** (está dentro de **api**)
7. En la carpeta raíz ejecutar ``ng serve``
8. Abrir otra terminal, y dentro de **api** ejecutar ``node index.js`` 
9. Navegar a localhost:4200
