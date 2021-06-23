// @ts-check

const { argv } = process
const build = process.env['NODE_ENV'] === 'build' || argv[argv.length - 1] === 'build'
const { join } = require('path')

/**
 * @type {import('f2e-server').F2EConfig}
 */
const config = {
    livereload: !build,
    build,
    gzip: true,
    buildFilter: (p) => /^(src|index)/.test(p),
    outputFilter: (p) => !p || /^(index|static)/.test(p),
    middlewares: [
        { middleware: 'template', test: /\.html?/ },
        { middleware: 'esbuild' },
        () => {
            return {
                onRoute: p => {
                    if (!p) return 'index.html'
                },
            }
        }
    ],
    output: join(__dirname, './docs'),
    // onServerCreate: (server) => {
    //     const { Server } = require('ws')
    //     const wss = new Server({server});
    //     wss.on('connection', (socket) => {
    //         socket.send('init')
    //     })
    // }
    // authorization: 'admin:admin'
}
module.exports = config