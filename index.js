import Hapi from 'hapi';
import AuthPlugin from './plugins/auth';

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler() {
        return 'Hello World!';
    },
});

// Start the server
const start = async () => {
    await server.register([AuthPlugin], {});
    await server.start();
    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
