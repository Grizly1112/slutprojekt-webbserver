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

Utils.Logout = function() {
    localStorage.removeItem('user')
    window.location.reload();
}

export default Utils;