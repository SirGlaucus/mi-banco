const Cursor = require("pg-cursor")

const realizarT = async (client, release, descripcion, fecha, valor, id) => {
    const SQLInsert = {
        text: "INSERT INTO transacciones VALUES ($1, $2, $3, $4);",
        values: [descripcion, fecha, valor, id]
    }

    const SQLUPdate = {
        text: 'UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2;',
        values: [valor, id]
    }

    try {
        await client.query("BEGIN")
        await client.query(SQLInsert)
        await client.query(SQLUPdate)
        await client.query("COMMIT");
        console.log(`La transaccion ha sido realizada con exito. Se han descontado ${valor} de la cuenta numero ${id}.`)
        release()
    } catch (errorConsulta) {
        await client.query("ROLLBACK");
        // Paso 1
        console.log("Error código: " + e.code);
        console.log("Detalle del error: " + e.detail);
        console.log("Tabla originaria del error: " + e.table);
        console.log("Restricción violada en el campo: " + e.constraint);
    }
}

const solicitarT = async (client, release, id) => {
    const SQLQuery = {
        text: "SELECT * FROM transacciones WHERE cuenta = $1;",
        values: [id]
    }

    try {
        const cursor = new Cursor(SQLQuery.text, SQLQuery.values)
        const cursorRespuesta = await client.query(cursor)
        cursorRespuesta.read(10, (err, rows) => {
            // Paso 7
            console.log(rows)
            // Paso 8
            cursorRespuesta.close()
            release()
        })
    } catch (errorConsulta) {
        console.log(errorConsulta.code)
    }
}

const solicitarC = async (client, release, id) => {
    const SQLQuery = {
        text: "SELECT * FROM cuentas WHERE id = $1",
        values: [id]
    }
    try {
        const cursor = new Cursor(SQLQuery.text, SQLQuery.values)
        const cursorRespuesta = await client.query(cursor)
        cursorRespuesta.read(20, (err, rows) => {
            // Paso 7
            console.log(rows)
            // Paso 8
            cursorRespuesta.close()
            release()
        })
    } catch (errorConsulta) {
        console.log(errorConsulta.code)
    }
}

module.exports = {
    realizarT,
    solicitarT,
    solicitarC
}