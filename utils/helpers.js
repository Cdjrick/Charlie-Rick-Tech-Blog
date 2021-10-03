const hb = require('handlebars')
const moment = require("moment");

hb.registerHelper('dateFormat', function (date, options) {
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "MMMM Do, hh:mm A"
    return moment(date).format(formatToUse);
});