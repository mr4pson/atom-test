import { ReactComponent as SupporterLeft } from './../../../assets/images/supporter-left.svg';
import { ReactComponent as SupporterCenter } from './../../../assets/images/supporter-center.svg';
import { ReactComponent as SupporterRight } from './../../../assets/images/supporter-right.svg';
import { TypeSupporter } from '../AdminPage/SupportersPage/types';

export const cutArrayByThree = (supporters: TypeSupporter[]): TypeSupporter[][] => {
    return supporters.reduce((accumulator: any[][], currentValue, index) => {
        if (index % 3 === 0) {
            accumulator.push([currentValue]);
        }
        if (index % 3 !== 0) {
            accumulator[accumulator.length - 1].push(currentValue);
        }
        return accumulator;
    }, []);
}


export const renderSwitch = (index: number): JSX.Element => {
    switch(index % 3) {
        case 0:
            return <SupporterLeft/>;
        case 1:
            return <SupporterCenter/>;
        case 2:
            return <SupporterRight/>;
        default:
            return <SupporterLeft/>;
    }
}