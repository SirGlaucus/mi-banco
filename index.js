const { Pool } = require("pg")

const { realizarT, solicitarT, solicitarC } = require('./consultassql')

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
                await realizarT(client, release, param1, param2, param3, param4)
                break
            default:
                console.log('Error: funcion no especificada o mal escrita.')
                break
        }
        pool.end()
    }
})

