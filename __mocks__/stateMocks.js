export const stateMockInitial = {
    baseCurrency: {
        code: "GBP",
        country: "United Kingdom"
    },
    selectedCurrency: null
}

export const stateMockBaseGBP = {
    baseCurrency: {
        code: "GBP",
        country: "United Kingdom"
    },
    selectedCurrency: null,
    currencies: [
        {
            country: "United Kingdom",
            countryCode: "GB",
            currency: "Sterling",
            code: "GBP",
            exchange: 1,
            symbol: "£"
        },
        {
            country: "United States",
            countryCode: "US",
            currency: "USD",
            code: "USD",
            exchange: 1.356006,
            symbol: "US$"
        },
    ],
    exchangeRates: {
        GBP: 1,
        USD: 1.356006
    }
}

export const stateMockBaseUSD = {
    baseCurrency: {
        code: "USD",
        country: "United States"
    },
    selectedCurrency: null,
    currencies: [
        {
            country: "United Kingdom",
            countryCode: "GB",
            currency: "Sterling",
            code: "GBP",
            exchange: 0.965489,
            symbol: "£"
        },
        {
            country: "United States",
            countryCode: "US",
            currency: "USD",
            code: "USD",
            exchange: 1,
            symbol: "US$"
        },
    ],
    exchangeRates: {
        GBP: 0.965489,
        USD: 1
    }
}