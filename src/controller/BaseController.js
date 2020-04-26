const Container = require('typedi').Container;

class BaseController {

    constructor() {
        this.container = Container;
        this.isDevMode = (process.env.NODE_ENV === 'development');
    }

    static next(req, res, next) {
        next();
    }

    static redirect(status, redirectURL) {
        return (req, res, next) => {
            if ([301, 302, 303, 307, 308].includes(status)) {
                res.status(status).redirect(redirectURL);
            } else {
                next();
            }
        }
    }

}

module.exports = BaseController;
