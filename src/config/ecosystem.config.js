/**
 * This file is for pm2 script.
 * https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
    apps: [{
        name: "KwServer",
        script: "src/server.js",
        watch: "src/*",
        instances: 1,
        exec_mode: "cluster",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}