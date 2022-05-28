CREATE DATABASE Banco;


CREATE TABLE transacciones (descripcion varchar(50), fecha varchar(10), monto DECIMAL, cuenta INT);

CREATE TABLE cuentas (id INT, saldo DECIMAL CHECK (saldo >= 0) );

INSERT INTO cuentas values (1, 20000);
INSERT INTO cuentas values (2, 20000);
INSERT INTO cuentas values (3, 20000);

SELECT * FROM cuentas;

BEGIN;
INSERT INTO transacciones VALUES ('Compra', '25/09/1342', 20000, 2);
UPDATE cuentas SET saldo = saldo - 20000 WHERE id = 2;
COMMIT;