const moment = require('moment');
const { DATETIME_FORMAT } = require('../config/constant');

exports.calcDate = date => {
    let result;
    const dateRegexp = new RegExp(/(\d+)(일|시간|분) 전/);
    if (!dateRegexp.test(date)) {
        if (date == '어제') {
            result = moment()
                .subtract(1, 'days')
                .format(DATETIME_FORMAT);
        } else {
            result = moment(date).format(DATETIME_FORMAT);
        }
    } else {
        let [_, amout, unit] = date.match(dateRegexp);
        switch (unit) {
            case '일':
                result = moment()
                    .subtract(amout, 'days')
                    .format(DATETIME_FORMAT);
                break;
            case '시간':
                result = moment()
                    .subtract(amout, 'hours')
                    .format(DATETIME_FORMAT);
                break;
            case '분':
                result = moment()
                    .subtract(amout, 'minutes')
                    .format(DATETIME_FORMAT);
                break;
        }
    }
    return result;
};

exports.nowDate = (date = null) =>
    date ? moment(date).format(DATETIME_FORMAT) : moment().format(DATETIME_FORMAT);
