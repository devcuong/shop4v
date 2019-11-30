var moment = require('moment');

function getDuration(timeStart) {
    var then = moment(timeStart, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
    var now = moment();
    var diff = moment.duration(then.diff(now));
    if (diff < 0) {
        diff = Math.abs(diff);
    }
    var d = moment.utc(diff).format("HH");
    return d;
}

module.exports = {
    getDuration
};