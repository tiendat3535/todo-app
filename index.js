import Hapi from 'hapi';

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
async function start() {
    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
