import Boom from 'boom';
import httpStatus from 'http-status';
import authUtil from './authUtil';
import models from '../../models';

exports.registerUserHandler = async ({ payload: user }, h) => {
    const numberUser = await models.User.count({ where: { username: user.username } });
    if (numberUser) {
        const error = Boom.badRequest(`Username already exists: ${user.username}`);
        error.output.payload.errorCode = 1002;
        throw error;
    }
    const savedUser = await models.sequelize.transaction(() => models.User.create({ ...user, password: authUtil.encryptPassword(user.password) }));
    return h.response(authUtil.generateToken({ id: savedUser.id })).code(httpStatus.CREATED);
};

exports.logInHandler = async ({ payload: user }, h) => {
    const { dataValues: foundUser } = await models.User.findOne({ where: { username: user.username } }) || {};
    if (!foundUser) {
        const error = Boom.badRequest(`Username does not exist: ${user.username}`);
        error.output.payload.errorCode = 1000;
        throw error;
    }
    if (!authUtil.isPasswordValid(user.password, foundUser.password)) {
        const error = Boom.badRequest('Username or Password is incorrect');
        error.output.payload.errorCode = 1001;
        throw error;
    }
    return h.response(authUtil.generateToken({ id: foundUser.id, username: foundUser.username })).code(httpStatus.CREATED);
};
