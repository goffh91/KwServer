const cron = require('node-cron');

/**
 *  https://github.com/node-cron/node-cron
 *
 *  Allowed fields
 *  # ┌────────────── second (optional) : 0-59
 *  # │ ┌──────────── minute            : 0-59
 *  # │ │ ┌────────── hour              : 0-23
 *  # │ │ │ ┌──────── day of month      : 1-31
 *  # │ │ │ │ ┌────── month             : 1-12 (or names)
 *  # │ │ │ │ │ ┌──── day of week       : 0-7 (or names, 0 or 7 are sunday)
 *  # │ │ │ │ │ │
 *  # │ │ │ │ │ │
 *  # * * * * * *
 */

cron.schedule('* * * * 2 *', () => {
    console.log('2분마다 작업실행');
});

module.exports = cron;