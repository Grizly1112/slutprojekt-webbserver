var Utils = {};

Utils.FormatTimeSince = function (date) {
    let Intervals = [
        { Label: 'år', Seconds: 31536000, Multiple: 'år' },
        { Label: 'månad', Seconds: 2592000, Multiple: 'månader' },
        { Label: 'vecka', Seconds: 604800, Multiple: 'veckor' },
        { Label: 'dag', Seconds: 86400, Multiple: 'dagar' },
        { Label: 'timme', Seconds: 3600, Multiple: 'timmar' },
        { Label: 'minut', Seconds: 60, Multiple: 'minuter' },
        { Label: 'sekund', Seconds: 1, Multiple: 'sekunder' },
    ];

    let Seconds = Math.floor((Date.now() - date) / 1000);

    if (Seconds < 3 || Seconds == undefined) { return '0 sekunder sedan' };

    let Interval = Intervals.find(i => i.Seconds < Seconds);
    let Count = Math.floor(Seconds / Interval.Seconds);

    return `${Count} ${Count !== 1 ? Interval.Multiple : Interval.Label} sedan`
}

Utils.FormatNotificationCount = function(count) {
    if(count === 0 || ((typeof count === 'string' || count instanceof String))) {
        return;
    }
    if(count > 9 && count < 99) {
        return(`9+`)
    } else if(count > 99) {
        return(`99+`)
    } else {
    return(`${count}`)
    }
}

Utils.FormatTimeDate = function (Timestamp) {
    var Date_obj = new Date(Timestamp);

    const monthNames = ["Januari", "Feburari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];

    var Formatted = `${('0' + Date_obj.getDate()).slice(-2)} ${monthNames[Date_obj.getMonth()]} ${Date_obj.getFullYear()}`;

    return Formatted
}

Utils.FormatUserAge = function(dateOfBirth) {
    const ageExact = (Date.now() - new Date(dateOfBirth)) / (31557600000);
    // https://stackoverflow.com/questions/1435975/how-can-i-round-down-a-number-in-javascript
    const actualAge = Math.floor( ageExact * Math.pow(10, 0) ) / Math.pow(10, 0)
    
    return actualAge;
}

Utils.Logout = function() {
    localStorage.removeItem('user')
    window.location.reload();
}

export default Utils;