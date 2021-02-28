import { TypeTime } from "./types";

export function pad(n): string {
    return (n < 10 ? "0" + n : n);
}

export function getTimeObjectFromSeconds(timeInSeconds): TypeTime {
    const days        = Math.floor(timeInSeconds/24/60/60);
    const hoursLeft   = Math.floor((timeInSeconds) - (days*86400));
    const hours       = Math.floor(hoursLeft/3600);
    const minutesLeft = Math.floor((hoursLeft) - (hours*3600));
    const minutes     = Math.floor(minutesLeft/60);
    const seconds = timeInSeconds % 60;
    return { seconds, minutes, hours, days };
}

export function getPadTime(time: TypeTime): TypeTime {
    return {
        days: pad(time.days),
        hours: pad(time.hours),
        minutes: pad(time.minutes),
        seconds: pad(time.seconds),
    };
}

export function getRemainingSeconds(utcTime): number {
    const dictantDate = Date.parse(utcTime);
    const currentDate = +new Date();
    return Math.round((dictantDate - currentDate) / 1000);
}