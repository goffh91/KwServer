const fse = require('fs-extra');
const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ args: { userIp } });
});


/**
 * Use swagger api docs.
 */
const swaggerDoc = require('../middleware/swaggerDoc');
router.use('/swagger', swaggerDoc.serve, swaggerDoc.setup);


/**
 * Auto route '.js' files in this dir.
 */
if (process.env.USE_AUTOROUTE || true) {
    fse.readdirSync(__dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (path.extname(file) === '.js');
    }).forEach((file) => {
        let route = require(path.join(__dirname, file));
        router.use('/' + file.replace('.js', ''), route);
    });
}


module.exports = exports = router;
