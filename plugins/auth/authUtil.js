import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = payload => jwt.sign(payload, 'NeverShareYourSecret', { expiresIn: '15m' });

const encryptPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};

const isPasswordValid = (password, encryptedPassword) => bcrypt.compareSync(password, encryptedPassword);

module.exports = {
    generateToken,
    encryptPassword,
    isPasswordValid,
};
