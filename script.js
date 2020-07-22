
// factories
// player

const Player = (name) => {

	let win_cnt = 0
	const getWin = () => {
		win_cnt++
	}

	return {name,getWin}
}

// each cell has its coordinate and symbol
const spot = (loc,symbol) => {
	return {loc,symbol}
}

const GameBoard = (function() {

	// An empty square is represented by a space character.
	let gameBoard = ['','','','','','','','',''];

	// create symbol
	const symbol_x = document.createElement('p');
	symbol_x.innerHTML = 'X'
	symbol_x.setAttribute('class', 'flex flex-center align-center');


	const createTile = () => {
		const container = document.querySelector('.container')
		const tile = document.createElement('div');
		tile.setAttribute('class', 'tile text-center no-display');
		container.appendChild(tile)
		let cnt = 0;
		for (let i = 0; i < 3; i++){
			row = document.createElement('div');
			row.setAttribute('class', 'row flex');
			for (let j = 0; j < 3; j++){
				col = document.createElement('div');
				col.setAttribute('class', 'col border');
				col.setAttribute('id', cnt.toString());
				row.appendChild(col)
				cnt++
				col.addEventListener('click',(e) => {
					console.log(col)
					console.log(e)
					col.appendChild(symbol_x)
				})


			}
			tile.appendChild(row)
		}	
		tile.classList.remove('no-display')
	}


	return {gameBoard,createTile}




})();
	

const GamePlay = (function() {

	// display symbols



})();






	
const getLevel = (function () {
	// get element
	const menu = document.querySelector('.menu');
	// console.log(menu)

	const btn = document.querySelectorAll('.select-difficulity');


	let level
	for (let i = 0 ; i < btn.length; i++) {
		// console.log(btn[i])
	   	btn[i].addEventListener('click', (e) => {
		   	// let diffuculity = 
		   	console.log(e.target.classList)
		   	if (e.target.classList[1] === 'bg-green'){
		   		level = 'easy'
		   	}

		   	else if (e.target.classList[1] === 'bg-yellow'){
		   		level = 'noraml'
		   	}

		   	else if (e.target.classList[1] === 'bg-red'){
		   		level = 'hard'
		   	}
		   	CloseMenu(menu)
		   	// with this you are able to call from outside of scope
		   	GameBoard.createTile()
		   	// display_tile()

		   	// AI(level)
	   })
	}

	function CloseMenu(menu){
		// console.log(menu)
		menu.classList.add('no-display')
	}
	function OpenMenu(){
		menu.classList.remove('no-display')
	}
	

})();
