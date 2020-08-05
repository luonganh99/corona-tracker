import numeral from 'numeral';

export const formatNumber = (num) => {
    return num ? `${numeral(num).format("0.0a")}`;
}