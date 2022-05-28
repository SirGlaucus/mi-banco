const { Pool } = require("pg")
// Paso 2
const Cursor = require("pg-cursor")
// Paso 3
const config = {
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "banco",
    port: 5432,
}
const pool = new Pool(config)

const argumentos = process.argv

const acccionSql = argumentos[2]
const param1 = argumentos[3]
const param2 = argumentos[4]
const param3 = argumentos[5]
const param4 = argumentos[6]

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


pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) {
        console.error(errorConexion.code)
    } else {
        switch (acccionSql) {
            case 'solicitarC':
                await solicitarC(client, release, param1)
                break
            case 'solicitarT':
                await solicitarT(client, release, param1)
                break
            case 'realizarT':
                // await realizarT(client, release, param1)
                break
            default:
                console.log('Error: funcion no especificada o mal escrita.')
                break
        }
        pool.end()
    }
})

