# TFG - Control de Acceso
## Fernando Tomás Coll - Tatiana Fernandez Hernandez

### Introducción

La seguridad es una de las cuestiones fundamentales a la hora de crear cualquier tipo de aplicación o sistema informático. 

Esta es una de las características más a tener en cuenta, debido a la multiplicidad y grandes capacidades que tienen los dispositivos electrónicos: hoy en día podemos llevar nuestra vida en el teléfono móvil o custodiar todo el archivo de nuestra empresa en un servidor ubicado en las instalaciones de la misma.

Es por este motivo que son tan importantes los sistemas de control de acceso. 


### Servidor

El servidor consta de una API desarrollada en TypeScript con Node.js y Express. Esta API se encarga de gestionar los Usuarios, Puertas, Roles, Accesos y la autenticación de los usuarios.

### Cliente

El cliente consta de un microcontrolador programado en C++ que se encarga de manejar las lecturas de un lector RFID y de enviarlas al servidor para que este las procese y le permita o no el acceso a la puerta.

### Web

La web consta de una aplicación desarrollada en TypeScript con React.js que se encarga de mostrar los datos de la API y de permitir la gestión de los mismos.

### Base de datos

La base de datos se trata de una base de datos relacional PostgreSQL que se encarga de almacenar los datos de la aplicación.

### Mejoras futuras
 - Añadir al sistema un control de acceso biométrico.
 - Implementar políticas de contraseñas seguras, como la obligación de cambiar contraseñas regularmente.
 - Añadir 2FA (autenticación en dos pasos) para aumentar significativamente la seguridad de la aplicación.
 - Añadir el identificador de los usuarios en el log de registro de entradas. Esto se hará para poder identificar si un usuario eliminado en el sistema tiene el mismo nombre que otro usuario creado posteriormente.
 - Añadir un posible cambio de tarjeta a un usuario sin tener que eliminarlo para crear otro nuevo.
 - Separar la funcionalidad de la web por roles. p.ej. que un visitante no pueda crear, modificar, borrar usuarios.