const express = require('express')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const dotenv = require('dotenv').config()

const app = express()
const port = 80
const API_KEY = process.env.API_KEY

const FormatCurrencyCode = (code) => {
    const out = Number().toLocaleString(undefined, {
        style: "currency",
        currency: code
    }).replace(' ', '').replace('0.00', '').replace('0', '')

    return out
}

const fetchExchangeRates = async baseCurrency => {
    return axios(`https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}&base_currency=${baseCurrency}`)
}

const errorResponse = {
    status: 500,
    message: 'Something went wrong!'
}

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('/api/v1/currency/exchange/:curr', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const request = await fetchExchangeRates(req.params.curr)
        return res.end(JSON.stringify(request.data.data))
    } catch(e) {
        return res.status(500).end(JSON.stringify(errorResponse))
    }
})

app.get('/api/v1/currency', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
        let fileResponse = JSON.parse(fs.readFileSync(path.join('currency.json')))

        fileResponse = fileResponse.map(el => {
            el.symbol = FormatCurrencyCode(el.code)
            return el
        }).sort((a, b) => a.country.localeCompare(b.country));

        const request = await fetchExchangeRates("GBP")
        rates = request.data.data

        return res.end(JSON.stringify({
            currencies: fileResponse,
            exchangeRates: rates
        }))
    } catch (e) {
        return res.status(500).end(JSON.stringify(errorResponse))
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
