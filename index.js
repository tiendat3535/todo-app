import Hapi from 'hapi';
// import util from 'util';
import AuthPlugin from './plugins/auth';
import TaskPlugin from './plugins/task';

const server = Hapi.server(
    {
        port: 3000,
        host: '0.0.0.0',
        debug: { request: ['*'], log: ['*'] },
    },
    { cors: true },
);

// server.events.on('response', (request) => {
//     console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}`);
//     console.log(util.inspect(request));
// });

// Start the server
const start = async () => {
    await server.register([AuthPlugin, TaskPlugin], { routes: { prefix: '/api' } });
    await server.start();
    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
