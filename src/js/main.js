let dataDisplays = document.querySelectorAll('.data-item__display')
let symbolsQuery = document.querySelectorAll('.data-item__display__symbol')
let pricesQuery = document.querySelectorAll('.data-item__display__price')

const baseQuery = 'https://www.alphavantage.co/query?function='
const globalQuoteFun = 'GLOBAL_QUOTE'
const symbolQuote = '&symbol='
const apiKey = '&apikey=XGPBHNB9IWTJ80FR'

const endPoint = baseQuery + globalQuoteFun + symbolQuote + apiKey

let data1

const loadData = (symbol, id) => {
	const query = baseQuery + globalQuoteFun + symbolQuote + symbol + apiKey
	fetch(query)
		.then(response => response.json())
		.then(data => {
			data1 = data
			symbolsQuery[id].textContent = data1['Global Quote']['01. symbol']
			pricesQuery[id].textContent = data1['Global Quote']['05. price']
		})
}

loadData('IBM', 0)
loadData('AAPL', 1)
loadData('ABB', 2)
loadData('GOOGL', 3)
loadData('MSFT', 4)
loadData('NFLX', 5)
