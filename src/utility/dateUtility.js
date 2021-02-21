const datefns = require('date-fns');

/**
 * Returns the date range, first day of date range and last day of date range
 * @param {*} duration 
 * @param {*} offset 
 */
exports.getDateRange = (duration, offset) => {
    var date = new Date();
    if(duration == 'month') {
        date = datefns.addMonths(date, offset);
        return `${datefns.format(date, 'MMMM')} - ${datefns.format(date, 'yyyy')}`;
    }
    else if(duration == 'week') {
        date = datefns.addWeeks(date, offset)
        return `${datefns.format(datefns.startOfWeek(date), 'PPP')} to ${datefns.format(datefns.endOfWeek(date), 'PPP')}`
    }
    else if(duration == 'year') {
        date = datefns.addYears(date, offset);
        return datefns.format(date, 'YYYY');
    }
}

/**
 * Returns the start and end dates with a given duration and offset
 * @param {*} duration 
 * @param {*} offset 
 */
exports.getStartAndEndDates = (duration, offset) => {
    let date = new Date();

    if(duration == 'day') {
        date = datefns.addDays(date, offset);
        return [date, date];
    }
    else if(duration == 'week') {
        date = datefns.addWeeks(date, offset);
        return [datefns.startOfWeek(date), datefns.endOfWeek(date)];
    }
    else if(duration == 'month') {
        date = datefns.addMonths(date, offset);
        return [datefns.addDays(datefns.startOfMonth(date), -1), datefns.addDays(datefns.endOfMonth(date), -1)];
    }
    else {
        date = datefns.addYears(date,offset);
        return [datefns.startOfYear(date), datefns.endOfYear(date)];
    }
}