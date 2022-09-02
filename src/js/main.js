let dataDisplays = document.querySelectorAll('.data-item__display')
let symbolsQuery = document.querySelectorAll('.data-item__display__symbol')
let pricesQuery = document.querySelectorAll('.data-item__display__price')

const baseQuery = 'https://www.alphavantage.co/query?function='
const globalQuoteFun = 'GLOBAL_QUOTE'
const symbolQuote = '&symbol='
const apiKey = '&apikey=XGPBHNB9IWTJ80FR'

const endPoint = baseQuery + globalQuoteFun + symbolQuote + apiKey

let symbols
let prices

const loadData = (symbol, id) => {
	if (localStorage.getItem('Price' + id) != null) {
		symbolsQuery[id].textContent = localStorage.getItem('Symbol' + id)
		pricesQuery[id].textContent = localStorage.getItem('Price' + id)
		console.log('Loaded from local Storage')
	} else {
		const query = baseQuery + globalQuoteFun + symbolQuote + symbol + apiKey
		fetch(query)
			.then(response => response.json())
			.then(data => {
				let data1 = data
				symbolsQuery[id].textContent = data1['Global Quote']['01. symbol']
				pricesQuery[id].textContent = data1['Global Quote']['05. price']
				localStorage.setItem('Symbol' + id, data1['Global Quote']['01. symbol'])
				localStorage.setItem('Price' + id, data1['Global Quote']['05. price'])
			})
	}
}

loadData('IBM', 0)
loadData('AAPL', 1)
loadData('ABB', 2)
loadData('GOOGL', 3)
loadData('MSFT', 4)
loadData('NFLX', 5)
