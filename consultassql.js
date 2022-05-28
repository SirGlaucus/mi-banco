const Cursor = require("pg-cursor")

// Crear una función asíncrona que registre una nueva transacción utilizando valores
// ingresados como argumentos en la línea de comando. Debe mostrar por consola la
// última transacción realizada
const realizarTransaccion = async (client, release, descripcion, fecha, valor, id) => {
    const SQLInsert = {
        text: "INSERT INTO transacciones VALUES ($1, $2, $3, $4) RETURNING *;",
        values: [descripcion, fecha, valor, id]
    }

    const SQLUPdate = {
        text: 'UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2;',
        values: [valor, id]
    }

    try {
        await client.query("BEGIN")
        const res = await client.query(SQLInsert)
        await client.query(SQLUPdate)
        await client.query("COMMIT")
        console.log(`La transaccion ha sido realizada con exito. Se han descontado ${valor} de la cuenta numero ${id}.`)
        console.log(res.rows[0])
        release()
    } catch (errorConsulta) {
        await client.query("ROLLBACK")
        console.log("Error código: " + e.code)
        console.log("Detalle del error: " + e.detail)
        console.log("Tabla originaria del error: " + e.table)
        console.log("Restricción violada en el campo: " + e.constraint)
    }
}

// Realizar una función asíncrona que consulte la tabla de transacciones y retorne
// máximo 10 registros de una cuenta en específico. Debes usar cursores para esto.
const solicitarTransaccion = async (client, release, id) => {
    const SQLQuery = {
        text: "SELECT * FROM transacciones WHERE cuenta = $1;",
        values: [id]
    }

    try {
        const cursor = new Cursor(SQLQuery.text, SQLQuery.values)
        const cursorRespuesta = await client.query(cursor)
        cursorRespuesta.read(10, (err, rows) => {
            console.log(rows)
            cursorRespuesta.close()
            release()
        })
    } catch (errorConsulta) {
        console.log(errorConsulta.code)
    }
}

// Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
//ejecutada con valores ingresados como argumentos en la línea de comando. Debes
//usar cursores para esto.

const solicitarCuenta = async (client, release, id) => {
    const SQLQuery = {
        text: "SELECT * FROM cuentas WHERE id = $1;",
        values: [id]
    }
    try {
        const cursor = new Cursor(SQLQuery.text, SQLQuery.values)
        const cursorRespuesta = await client.query(cursor)
        cursorRespuesta.read(20, (err, rows) => {
            console.log(rows)
            cursorRespuesta.close()
            release()
        })
    } catch (errorConsulta) {
        console.log(errorConsulta.code)
    }
}

module.exports = {
    realizarTransaccion,
    solicitarTransaccion,
    solicitarCuenta
}