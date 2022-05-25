const miscellaneous = {
    author: {
        name: 'Oscar René',
        lastName: 'Ballesteros Plaza'
    },
    getDecimalPart: (num) => {
        if (Number.isInteger(num)) return 0;
        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
    }
}

module.exports = miscellaneous;