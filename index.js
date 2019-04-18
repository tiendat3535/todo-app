import Hapi from 'hapi';
import AuthPlugin from './plugins/auth';
import TaskPlugin from './plugins/task';

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    debug: { request: ['error'] },
});

// Start the server
const start = async () => {
    await server.register([AuthPlugin, TaskPlugin], {});
    await server.start();
    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
