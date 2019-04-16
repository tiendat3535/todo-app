// import Boom from 'boom';
import httpStatus from 'http-status';
import models from '../../models';

exports.getTaskHandler = () => ({});

exports.createTaskHandler = async ({ auth: { credentials }, payload: task }) => models.sequelize.transaction(
    () => models.Task.create({ ...task, userId: credentials.id }),
);

exports.updateTaskHandler = async ({ payload: task }, h) => {
    await models.sequelize.transaction(() => models.Task.update({ content: task.content, done: task.done }, { where: { id: task.id } }));
    return h.response().code(httpStatus.OK);
};

exports.deleteTaskHandler = async ({ params: { id } }, h) => {
    await models.sequelize.transaction(() => models.Task.destroy({ where: { id } }));
    return h.response().code(httpStatus.OK);
};
