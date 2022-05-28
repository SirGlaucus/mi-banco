# Desafio Mi Banco

En este desafío deberás realizar una aplicación Node que se conecte con PostgreSQL, utilice transacciones y cursores para simular el comportamiento de una transacción bancaria.

IMPORTANTE: Las lineas de codigo para crear la base de datos se encuentran en el archivo script.sql.

### Habilidades a evaluar

 - Cursores
 - Transacciones
 - Captura de errores en transacciones

### Requerimientos

- Crear una función asíncrona que registre una nueva transacción utilizando valores ingresados como argumentos en la línea de comando. Debe mostrar por consola la última transacción realizada.
- Realizar una función asíncrona que consulte la tabla de transacciones y retorne máximo 10 registros de una cuenta en específico. Debes usar cursores para esto.
- Realizar una función asíncrona que consulte el saldo de una cuenta y que sea ejecutada con valores ingresados como argumentos en la línea de comando. Debes usar cursores para esto.
- En caso de haber un error en la transacción, se debe retornar el error por consola.
