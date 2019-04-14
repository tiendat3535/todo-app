import hapiAuthJwt2 from 'hapi-auth-jwt2';
import AuthHandler from './authHandler';

module.exports = {
    name: 'AuthPlugin',
    version: '0.1.0',
    register: async (server) => {
        await server.register(hapiAuthJwt2, {});
        await server.auth.strategy('jwt', 'jwt',
            {
                key: 'NeverShareYourSecret',
                validate: () => ({ isValid: true }),
                verifyOptions: { algorithms: ['HS256'] },

            });
        await server.auth.default('jwt');
        // Router
        server.route([
            {
                method: 'GET',
                path: '/users/{username}',
                handler: req => `Hello: ${req.params.username}`,
                config: { auth: 'jwt' },
            },
            {
                method: 'POST',
                path: '/users',
                handler: AuthHandler.registerUserHandler,
                config: { auth: false },
            },
            {
                method: 'POST',
                path: '/accessTokens',
                handler: AuthHandler.logInHandler,
                config: { auth: false },
            },
        ]);
    },
};
