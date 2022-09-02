let dataDisplays = document.querySelectorAll('.data-item__display')
let symbolsText = document.querySelectorAll('.data-item__display__symbol')
let pricesText = document.querySelectorAll('.data-item__display__price')
let changesText = document.querySelectorAll('.data-item__display__change')

const baseQuery = 'https://www.alphavantage.co/query?function='
const globalQuoteFun = 'GLOBAL_QUOTE'
const symbolQuote = '&symbol='
const apiKey = '&apikey=XGPBHNB9IWTJ80FR'

const endPoint = baseQuery + globalQuoteFun + symbolQuote + apiKey

let symbols
let prices
let changes
let data1

const loadData = (symbol, id) => {
	if (localStorage.getItem('Change' + id) != null) {
		symbolsText[id].textContent = localStorage.getItem('Symbol' + id)
		pricesText[id].textContent = localStorage.getItem('Price' + id)
		let changePercent = Number(localStorage.getItem('Change' + id).replace('%', ''))
		setChangeColor(changePercent, id)
		changesText[id].textContent = localStorage.getItem('Change' + id)
		console.log('Loaded from local Storage')
	} else {
		const query = baseQuery + globalQuoteFun + symbolQuote + symbol + apiKey
		fetch(query)
			.then(response => response.json())
			.then(data => {
				data1 = data
				symbolsText[id].textContent = data1['Global Quote']['01. symbol']
				pricesText[id].textContent = data1['Global Quote']['05. price']
				let changePercent = Number(data1['Global Quote']['10. change percent'].replace('%', ''))
				setChangeColor(changePercent, id)
				changesText[id].textContent = changePercent + '%'
				localStorage.setItem('Symbol' + id, data1['Global Quote']['01. symbol'])
				localStorage.setItem('Price' + id, data1['Global Quote']['05. price'])
				localStorage.setItem('Change' + id, data1['Global Quote']['10. change percent'])
			})
	}
}

function setChangeColor(num, id) {
	console.log('Num:' + num)
	if (num > 0) {
		changesText[id].classList.add('data-item__display__change--up')
		changesText[id].classList.remove('data-item__display__change--down')
	} else {
		changesText[id].classList.add('data-item__display__change--down')
		changesText[id].classList.remove('data-item__display__change--up')
	}
}

loadData('IBM', 0)
loadData('AAPL', 1)
loadData('ABB', 2)
loadData('GOOGL', 3)
loadData('MSFT', 4)
loadData('NFLX', 5)
