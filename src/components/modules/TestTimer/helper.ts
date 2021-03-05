import { pad } from "../DictationTimer/helper";
import { TypeTime } from "./types";

export const getPadTime = (countdown: number): TypeTime => {
    const minutes = Math.floor(countdown / (60 * 1000));
    return {
        minutes: pad(minutes),
        seconds: pad(Math.floor((countdown - (minutes * 60 * 1000)) / 1000))
    }
}