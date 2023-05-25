var Utils = {};

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

Utils.FormatTimezoneString = function() {
    // Get user timezone 
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Get offsett from UTC time
    const offset = new Date().getTimezoneOffset();
    
    // Abs offsett / 60 to get in hours
    const hourOffset = Math.abs(offset) / 60;

    // Calculate if GMT (GTM === UTC) is positive or negative
    const sign = offset < 0 ? "+" : offset > 0 ? "-" : "";

    // Format String
    const timezoneString = `${timezone} (GMT ${sign}${hourOffset})`;

    return timezoneString
}


Utils.FormatUserAge = function(dateOfBirth) {
    const ageExact = (Date.now() - new Date(dateOfBirth)) / (31557600000);
    // https://stackoverflow.com/questions/1435975/how-can-i-round-down-a-number-in-javascript
    const actualAge = Math.floor( ageExact * Math.pow(10, 0) ) / Math.pow(10, 0)
    
    return actualAge;
}

Utils.FomratMessageTimeDate = function(Timestamp, shortReturn) {
    var Date_obj = new Date(Timestamp);

    var hours = ('0' + Date_obj.getHours()).slice(-2);
    var minutes = ('0' + Date_obj.getMinutes()).slice(-2);

    if(shortReturn) {
        return `${('0' + Date_obj.getHours()).slice(-2)}:${('0' + Date_obj.getMinutes()).slice(-2)}`
    } else {
    var formatted_date = `${('0' + Date_obj.getDate()).slice(-2)}/${('0' + (Date_obj.getMonth() + 1)).slice(-2)}/${Date_obj.getFullYear()}`;
        return formatted_date + " " + `${hours}:${minutes}`;
    }
}


Utils.FormatImageStr = function(imgObj) {
    let imageString = `data:image/png;base64,${btoa(new Uint8Array(imgObj).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''))}`;

    return imageString;
}

Utils.ConvertToBase64 = function(file) {
    return new Promise((resolve, reject) => {
        const fileSize = file.size;
        const maxSize = 1 * 1024 * 1024;

        if (fileSize > maxSize) {
            reject(new Error("File is too large"));
            alert("Filen är för stor");
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });  
}


// Wheather widget
Utils.ConvertKelvinToCelsius = function(temp) {
    return Math.round(temp -  273.15);
}

export default Utils;