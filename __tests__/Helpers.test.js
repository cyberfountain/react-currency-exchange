import { GetKey, Round, BaseConversion, ForeignConversion } from "../src/Helpers/Helpers"

test(`GetKey provides correct data`, () => {
    const mock = {
        country: "United Kingdom",
        currency: "GBP"
    }

    expect(GetKey(mock)).toBe('unitedkingdomgbp')
})

test(`Round provides correct data`, () => {
    expect(Round(0.14955211, 2)).toBe('0.15')
    expect(Round(0.55959, 2)).toBe('0.56')
    expect(Round(0.9999999, 2)).toBe('1.00')
})

test(`BaseConversion provides correct data`, () => {
    expect(BaseConversion(1, 0.5103547)).toBe(0.5103547)
})

test(`ForeignConversion provides correct data`, () => {
    expect(ForeignConversion(1, 0.5103547)).toBe(1.9594215552438332)
})