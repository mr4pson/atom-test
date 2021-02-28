import { TypeSupporter } from "./types";

export const cutArrayByThree = (supporters): TypeSupporter[][] => {
    return supporters.reduce((accumulator: TypeSupporter[][], currentValue, index) => {
        if (index % 3 === 0) {
            accumulator.push([currentValue]);
        }
        if (index % 3 !== 0) {
            accumulator[accumulator.length - 1].push(currentValue);
        }
        return accumulator;
    }, []);
}