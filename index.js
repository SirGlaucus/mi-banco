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

const solicitarCuenta = async (client, release) => {
    const cursor = new Cursor("SELECT * FROM cuentas")
    const cursorRespuesta = await client.query(cursor)
    cursorRespuesta.read(20, (err, rows) => {
        // Paso 7
        console.log(rows)
        // Paso 8
        cursorRespuesta.close()
        release()
    })
}

const solicitarTransacciones = async (client, release) => {
    const cursor = new Cursor("SELECT * FROM transacciones")
    const cursorRespuesta = await client.query(cursor)
    cursorRespuesta.read(20, (err, rows) => {
        // Paso 7
        console.log(rows)
        // Paso 8
        cursorRespuesta.close()
        release()
    })
}

pool.connect(async (error_conexion, client, release) => {
    if (error_conexion) {
        console.error(error_conexion.code)
    } else {
        switch (acccionSql) {
            case 'solicitarCuenta':
                await solicitarCuenta(client, release)
                break
            case 'solicitarTransacciones':
                await solicitarTransacciones(client, release)
                break
            default:
                console.log('Error: funcion no especificada o mal escrita.')
                break
        }
        pool.end()
    }
})