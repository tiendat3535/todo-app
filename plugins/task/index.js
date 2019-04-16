import Joi from 'joi';
import TaskHandler from './taskHandler';

module.exports = {
    name: 'TaskPlugin',
    version: '0.1.0',
    register: async (server) => {
        // Router
        server.route([
            {
                method: 'GET',
                path: '/tasks',
                handler: TaskHandler.getTaskHandler,
                config: { auth: 'jwt' },
            },
            {
                method: 'POST',
                path: '/tasks',
                handler: TaskHandler.createTaskHandler,
                config: {
                    validate: {
                        payload: {
                            content: Joi.string().min(1).max(200).required(),
                        },
                    },
                    auth: 'jwt',
                },
            },
            {
                method: 'PUT',
                path: '/tasks',
                handler: TaskHandler.updateTaskHandler,
                config: {
                    validate: {
                        payload: {
                            id: Joi.number().required(),
                            content: Joi.string().min(1).max(200).required(),
                            done: Joi.boolean(),
                        },
                    },
                    auth: 'jwt',
                },
            },
            {
                method: 'DELETE',
                path: '/tasks/{id}',
                handler: TaskHandler.deleteTaskHandler,
                config: {
                    validate: { params: { id: Joi.number().required() } },
                    auth: 'jwt',
                },
            },
        ]);
    },
};
