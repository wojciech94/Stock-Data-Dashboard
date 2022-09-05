const wrapper = document.querySelector('.wrapper')
const addDataItem = document.querySelector('.data-item')
let dataDisplays = document.querySelectorAll('.data-item__display')
let symbolsText = document.querySelectorAll('.data-item__display__symbol')
let pricesText = document.querySelectorAll('.data-item__display__price')
let changesText = document.querySelectorAll('.data-item__display__change')
let addInput = document.querySelector('.data-item__action__ticker')
let addBtn = document.querySelector('.data-item__action__btn')
let removeBtns = document.querySelectorAll('.remove-btn')

const baseQuery = 'https://www.alphavantage.co/query?function='
const globalQuoteFun = 'GLOBAL_QUOTE'
const symbolQuote = '&symbol='
const apiKey = '&apikey=XGPBHNB9IWTJ80FR'

const endPoint = baseQuery + globalQuoteFun + symbolQuote + apiKey

let data1
let test1
let test2
let test3

//Load display panels
const loadDisplays = () => {
	let count = localStorage.getItem('Displays')
	for (let i = 0; i < count; i++) {
		loadData(i)
	}
}

//Load data for panel from localStorage
const loadData = id => {
	if (localStorage.getItem('Symbol' + id) != null) {
		createDisplay()
		symbolsText[id].textContent = localStorage.getItem('Symbol' + id)
		pricesText[id].textContent = localStorage.getItem('Price' + id)
		let changePercent = Number(localStorage.getItem('Change' + id).replace('%', ''))
		setChangeColor(changePercent, id)
		changesText[id].textContent = localStorage.getItem('Change' + id)
		console.log('Loaded from local Storage')
	} else {
		console.log('No valid data to load')
	}
}

//Get data by symbol ticker from alphavantage
const addData = () => {
	let symbol = addInput.value
	if (symbol === '') {
		return
	}
	const query = baseQuery + globalQuoteFun + symbolQuote + symbol + apiKey
	fetch(query)
		.then(response => response.json())
		.then(data => {
			data1 = data
			addInput.value = '' //reset input value
			if (data1['Global Quote']['01. symbol'] != undefined) {
				addItem()
			}
		})
		.catch(error => console.error(error + 'Error Catched'))
}

//Add new panel if ticker is valid
const addItem = () => {
	createDisplay()
	addTicker()
}

//Create display hierarchy
const createDisplay = () => {
	let dataDiv = document.createElement('div')
	let displayDiv = document.createElement('div')
	let pSymbol = document.createElement('p')
	let pPrice = document.createElement('p')
	let pChange = document.createElement('p')
	let button = document.createElement('button')
	dataDiv.classList.add('data-item')
	displayDiv.classList.add('data-item__display')
	pSymbol.classList.add('data-item__display__symbol')
	pPrice.classList.add('data-item__display__price')
	pChange.classList.add('data-item__display__change')
	button.classList.add('data-item__display__btn', 'remove-btn')
	wrapper.appendChild(dataDiv)
	wrapper.insertBefore(dataDiv, addDataItem)
	dataDiv.appendChild(displayDiv)
	displayDiv.append(pSymbol, pPrice, pChange, button)
	dataDisplays = document.querySelectorAll('.data-item__display') //Update displays count
	symbolsText = document.querySelectorAll('.data-item__display__symbol') //Updata symbols
	pricesText = document.querySelectorAll('.data-item__display__price') //Update prices
	changesText = document.querySelectorAll('.data-item__display__change') //Update changes
	dataDiv.dataset.id = dataDisplays.length - 1
	button.addEventListener('click', removeItem)
}

//Fill Ticker data for panel
const addTicker = () => {
	let id = localStorage.getItem('Displays')
	if (id == null) {
		id = 0
	}
	symbolsText[id].textContent = data1['Global Quote']['01. symbol']
	pricesText[id].textContent = data1['Global Quote']['05. price']
	let changePercent = Number(data1['Global Quote']['10. change percent'].replace('%', ''))
	setChangeColor(changePercent, id)
	changesText[id].textContent = changePercent + '%'
	localStorage.setItem('Symbol' + id, data1['Global Quote']['01. symbol'])
	localStorage.setItem('Price' + id, data1['Global Quote']['05. price'])
	localStorage.setItem('Change' + id, data1['Global Quote']['10. change percent'])
	localStorage.setItem('Displays', dataDisplays.length)
}

//Remove panel
const removeItem = e => {
	let displayId = Number(e.target.parentNode.parentNode.dataset.id)
	if (displayId != null) {
		wrapper.removeChild(e.target.parentNode.parentNode)
		updateDisplays(displayId)
		//clear localStorage symbol/price/change
		//update localStoragedisplays count
	}
}

const updateDisplays = id => {
	let count = Number(localStorage.getItem('Displays'))
	let lastId = count - 2
	localStorage.setItem('Displays', count - 1)
	if (id > lastId) {
		localStorage.removeItem('Symbol' + id)
		localStorage.removeItem('Price' + id)
		localStorage.removeItem('Change' + id)
		//Remove data from localStorage
	} else {
		dataDisplays = document.querySelectorAll('.data-item__display') //Update displays list
		for (let i = id; i < count - 1; i++) {
			dataDisplays[i].parentNode.dataset.id = i
			let symbol = localStorage.getItem('Symbol' + String(i + 1))
			let price = localStorage.getItem('Price' + String(i + 1))
			let change = localStorage.getItem('Change' + String(i + 1))
			localStorage.setItem('Symbol' + i, symbol)
			localStorage.setItem('Price' + i, price)
			localStorage.setItem('Change' + i, change)
			localStorage.removeItem('Symbol' + String(i + 1))
			localStorage.removeItem('Price' + String(i + 1))
			localStorage.removeItem('Change' + String(i + 1))
		}
	}
}

//Set change fonts colors
function setChangeColor(num, id) {
	changesText = document.querySelectorAll('.data-item__display__change')
	if (num > 0) {
		changesText[id].classList.add('data-item__display__change--up')
		changesText[id].classList.remove('data-item__display__change--down')
	} else {
		changesText[id].classList.add('data-item__display__change--down')
		changesText[id].classList.remove('data-item__display__change--up')
	}
}

loadDisplays()

//Listeners
addBtn.addEventListener('click', addData)
removeBtns.forEach(btn => {
	btn.addEventListener('click', removeItem)
})
