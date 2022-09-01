const baseQuery = 'https://www.alphavantage.co/query?function='
const globalQuoteFun = 'GLOBAL_QUOTE'
const symbolQuote = '&symbol=IBM'
const apiKey = '&apikey=demo'

const endPoint = baseQuery + globalQuoteFun + symbolQuote + apiKey

JSON.

console.log('Endpoint:' + endPoint)
