import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

exports.generateToken = payload => jwt.sign(payload, 'NeverShareYourSecret', { expiresIn: '15m' });

exports.encryptPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};

exports.isPasswordValid = (password, encryptedPassword) => bcrypt.compareSync(password, encryptedPassword);
