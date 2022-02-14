export const Round = (number, precision) => {
    return (Math.round(number * 100) / 100).toFixed(precision)
}

export const GetKey = c => {
    return `${c.country}${c.currency}`.toLowerCase().replace(' ', '')
}

export const BaseConversion = (foreign, exchangeRate) => {
    return foreign * exchangeRate
}

export const ForeignConversion = (base, exchangeRate) => {
    return base / exchangeRate
}
