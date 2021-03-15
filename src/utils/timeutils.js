export const convertNumToTime = (number, shortVersion = false) => {
    var sign = (number >= 0) ? 1 : -1;

    number = number * sign;

    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + '';

    if (minute.length < 2) {
    minute = '0' + minute; 
    }
    // Add Sign in final result
    sign = sign == 1 ? '' : '-';

    // Concate hours and minutes
    
    time = sign + hour + (shortVersion ? ' h' : ' hours')
    if(minute !== '00') {
        time += ' and ' + minute + (shortVersion ? ' m' : ' minutes')
    }

    return time;
}