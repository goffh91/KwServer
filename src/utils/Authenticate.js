const jsonwebtoken = require('jsonwebtoken');

class Authentication {

    static isToken(token) {
        return /Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(
            token,
        );
    }

    static generateToken(userId) {
        return jsonwebtoken.sign({ userId }, process.env.CRYPTO_SECRETKEY || '', {
            algorithm: 'HS512',
            expiresIn: '1d',
        });
    }

    static verifyToken(token) {
        const data = jsonwebtoken.verify(
            token,
            process.env.CRYPTO_SECRETKEY || '',
            { algorithms: ['HS512'] },
        );

        if (data.iat * 1000 - new Date().getTime() > 0) return false;
        if (data.exp * 1000 - new Date().getTime() <= 0) return false;
        return true;
    }

    static refreshToken(token) {
        const data = jsonwebtoken.verify(
            token,
            process.env.CRYPTO_SECRETKEY || '',
            { algorithms: ['HS512'] },
        );
        if (data.exp - new Date().getTime() / 1000 < 60 * 60) {
            return Authentication.generateToken(data.userId);
        }
        return token;
    }

    static getUserIdByToken(token) {
        return jsonwebtoken.verify(token, process.env.CRYPTO_SECRETKEY || '', {
            algorithms: ['HS512'],
        });
    }

    /*static async currentUserChecker(action) {
        const bearerToken = action.request.headers.authorization;
        if (!Authentication.isToken(bearerToken)) {
            return false;
        }
        const token = bearerToken.replace(/Bearer\s/, '');
        if (!Authentication.verifyToken(token)) {
            return false;
        }
        const userService = Container.get(UserService);
        const user = await userService.getById(
            Authentication.getUserIdByToken(token).userId,
        );

        action.request.query.user = user;
        return user;
    }*/

}

module.exports = Authentication;
