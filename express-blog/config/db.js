const env = process.env.NODE_ENV
//console.log(env)
let MYSQL_CONF,REDIS_CONF
if (env === 'dev') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: 'ilovemysql',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
if (env === ' production') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: 'ilovemysql',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
module.exports = {
    MYSQL_CONF,REDIS_CONF
}