
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
const Spot = (loc) => {
	return {loc}
}

const Menu = (function() {

	// how to return level 
	const getLevel = () => {
		// console.log('getLevel')
		// get element
		const menu = document.querySelector('.menu');
		// console.log(menu)
		const btn = document.querySelectorAll('.select-difficulity');


		let level
		for (let i = 0 ; i < btn.length; i++) {
			// console.log(btn[i])
		   	btn[i].addEventListener('click',( e) => {
			   	// let diffuculity = 
			   	// console.log(e.target.classList)
			   	if (e.target.classList[1] === 'bg-green'){
			   		level = 'easy'
			   	}

			   	else if (e.target.classList[1] === 'bg-yellow'){
			   		level = 'noraml'
			   	}

			   	else if (e.target.classList[1] === 'bg-red'){
			   		level = 'hard'
			   	}

			   	// console.log('hiya')
			   	// close menu when ready is clicked
			   	CloseMenu(menu)
			   	// with this you are able to call from outside of scope
			   	GameBoard.createTile()
			   	GamePlay.getAI_level(level)

			   	
			   	
		   })
		}

		return level

	};

	const getPlayers = () => {
		let chosen_player
		const single_player = document.querySelector('.single-player');
		const two_player = document.querySelector('.two-players');
		// console.log(single_player)
		let player_arr = [single_player,two_player]
		player_arr.forEach(node => node.addEventListener("click", (e) => {
			console.log(e)
			if (e.target.classList[1] === 'fa-user'){
				chosen_player = 'single'
			}
			else if (e.target.classList[1] === 'fa-user-friends'){
				chosen_player = 'multi-players'
			}

			

		}));

		return chosen_player
		
	}



	function CloseMenu(menu){
		// console.log(menu)
		menu.classList.add('no-display')
	}
	function OpenMenu(menu){
		menu.classList.remove('no-display')
	}
	
	return {getLevel,getPlayers}


})();

const GameBoard = (function() {

	// An empty square is represented by a space character.
	let gameBoard = [];
	let p1 = true;
	let p2 = false;
	// let symbol = ''

	// create symbol
	const createTile = () => {
		const container = document.querySelector('.container')
		const tile = document.createElement('div');
		tile.setAttribute('class', 'tile text-center no-display');
		container.appendChild(tile)
		for (let i = 0; i < 3; i++){
			row = document.createElement('div');
			row.setAttribute('class', 'row flex');
			for (let j = 0; j < 3; j++){
				col = document.createElement('div');
				col.setAttribute('class', 'col border');
				col.setAttribute('id', gameBoard.length.toString());
				gameBoard.push(col)
				row.appendChild(col)
				
			}
			tile.appendChild(row)
		}	
		tile.classList.remove('no-display')

		// activate all columns
		gameBoard.forEach(node => node.addEventListener("click", (e) => {
			console.log(e.target.id)
			let cur_loc = e.target.id
			renderSymbol(cur_loc)
		}));
	}


	function renderSymbol(cur_loc){
		const symbol_x = document.createElement('p');

		if (p1){
			symbol_x.innerHTML = 'X'
			symbol_x.setAttribute('class', 'symbol flex flex-center align-center');
			gameBoard[cur_loc].appendChild(symbol_x)
		} else if (p2){
			symbol_x.innerHTML = 'O'
			symbol_x.setAttribute('class', 'symbol flex flex-center align-center');
			gameBoard[cur_loc].appendChild(symbol_x)
		}

		// get player turn to determine symbol
		p2 = p1 ? true : false
		p1 = p2 ? false : true 

		// add property and value to Gameboard (cell)
		// gameBoard[cur_loc].symbol = 'X'
		// console.log(gameBoard[cur_loc].symbol)
		
	}

	return {gameBoard,createTile}

})();
	

const GamePlay = (function() {

	let level_p 
	// get turn	
	const getTurn = () => {
		Menu.getPlayers()
	}

	const getAI_level = (level) => {
		console.log(level)
		level_p = level
	}

	const player_num = Menu.getPlayers()
	const level_ = Menu.getLevel()
	console.log(player_num)
	console.log(level_p)

	
	// console.log(AI_level)
	
	return {level_p,getTurn,getAI_level}

})();






	

