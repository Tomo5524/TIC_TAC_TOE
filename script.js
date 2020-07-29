
// factories
// player

const Player = (name,symbol) => {

	let win_cnt = 0
	const getWin = () => {
		win_cnt++
	}

	return {name,symbol,getWin}
}

// each cell has its coordinate and symbol
// const Spot = (loc) => {
// 	return {loc}
// }

// this is accessible globally
// const printHiya = () => {
// 	console.log('logic hiya')
// }

const Menu = (function() {

	// const MenuObj = {
	// 	these objecs can be accessed globally
	// 	level : 'hard',
	// 	multi_player: false
	// 	p1 : {}, // store name and symbol
	// 	p2 : {}
	// }

	// these buttons should be called without function?
	
	const btn = document.querySelectorAll('.select-difficulity');
	let level
	for (let i = 0 ; i < btn.length; i++) {
		// console.log(btn[i])
	   	btn[i].addEventListener('click',(e) => {
		   	
		   	if (e.target.classList[1] === 'bg-green'){
		   		level = 'easy'
		   		// MenuObj.level = 'easy'
		   	}
		   	else if (e.target.classList[1] === 'bg-yellow'){
		   		level = 'noraml'
		   	}
		   	else if (e.target.classList[1] === 'bg-red'){
		   		level = 'hard'
		   	}
		   	

		   	// with this you are able to call from outside of scope
		   	// GameBoard.createTile()
		   	GamePlay.getAI_level(level)	   
	   })
	};   

	
	// get Player's number
	let multi_player 
	const single_player = document.querySelector('.single-player');
	const two_player = document.querySelector('.two-players');
	// console.log(single_player)
	let player_arr = [single_player,two_player]
	let single_mode;
	player_arr.forEach(node => node.addEventListener("click", (e) => {
		
		if (e.target.classList[1] === 'fa-user'){
			multi_player = false
			// MenuObj.multi_player = false
		}
		else if (e.target.classList[1] === 'fa-user-friends'){
			multi_player = true
		}
		GamePlay.getPlayersNum(multi_player)
		getName(multi_player)
		// return chosen_player
	}));
	

	// having so many variables is ugly, any solution?
	const players_btn = document.querySelector('.players-btn');
	const level_difficulty = document.querySelector('.Pick-AI-difficulity');
	const name_div = document.createElement('div');
	name_div.setAttribute('class', 'name-input flex flex-center padding')

	// create input text 
	const name_input_p1 = document.createElement('input');
	name_input_p1.setAttribute('type', 'text');
	name_input_p1.setAttribute('name', 'text');
	name_input_p1.setAttribute('placeholder', 'Enter Player1 name');
	name_input_p1.setAttribute('class', 'player-input p1 padding')

	const name_input_p2 = document.createElement('input');
	name_input_p2.setAttribute('type', 'text');
	name_input_p2.setAttribute('name', 'text');
	name_input_p2.setAttribute('placeholder', 'Enter Player2 name');
	name_input_p2.setAttribute('class', 'player-input p2 padding')

	// these can be accessed only locally
	// outside function to keep track of status,
	// if it was inside funciton, everytime funciton gets called, it will reset its status
	let p1_display = false;
	let p2_display = false;

	function getName(multi_player){		

		// (!p1_display && !p2_display) needs this logic for the first selction
		if (!multi_player && !p1_display){
			if (p2_display){
				// name_input_p2.classList.remove('p2') // does not remove the whole thing
				name_input_p2.parentNode.removeChild(name_input_p2);
				Display(level_difficulty)
			}
			else{
				name_div.appendChild(name_input_p1)
			}
			p1_display = true;
			p2_display = false;
			
			players_btn.appendChild(name_div)
			console.log(p1_display)
			console.log(p2_display)
		}

		else if (multi_player && !p2_display){
			if (p1_display){
				name_div.appendChild(name_input_p2)
			}
			else{
				name_div.appendChild(name_input_p1)
				name_div.appendChild(name_input_p2)
			}			
			p1_display = false;
			p2_display = true;

			console.log(p1_display)
			console.log(p2_display)
			
			players_btn.appendChild(name_div)
			Close(level_difficulty)
		}
	}


	// handle ready button
	const ready_btn = document.querySelector('.ready-btn');
	const menu = document.querySelector('.menu');
	// add event lister to ready button
	ready_btn.addEventListener("click", (e) => {

		// instantiate a player object 
		let p1Name = name_input_p1.value !== "" ? name_input_p1.value : "PLAYER 1"
		GamePlay.GamePlayObj.p1 = Player(p1Name.toUpperCase(), "X")

		let p2Name = name_input_p2.value !== "" ? name_input_p2.value : "PLAYER 2"
		GamePlay.GamePlayObj.p2 = Player(p2Name.toUpperCase(), "O")


		GameBoard.createTile() // create board
		GameBoard.displayPlayers()
		Close(menu) // close menu
	});

	function Close(item){
		// console.log(menu)
		item.classList.add('no-display')
	}
	// same as above
	// const Close = (item) => {
	// 	item.classList.add('no-display')
	// }

	function Display(item){
		item.classList.remove('no-display')
	}
	
	// return 


})();

const GameBoard = (function() {

	const GameBoardObj = {
		// An empty square is represented by a space character.
		gameBoard : [],
		p1_turn : true,
		p2_turn : false,
		seen : false,
		p1_win : 0,
		p2_win : 0,
		ties : 0,
		rematch_on : false,
		turn_cnt : 1,
	}


	const container = document.querySelector('.container')
	const tile = document.createElement('div'); // make it accesible so rematch btn can access it
	// create symbol
	const createTile = () => {
		tile.setAttribute('class', 'tile text-center no-display');
		container.appendChild(tile)
		for (let i = 0; i < 3; i++){
			row = document.createElement('div');
			row.setAttribute('class', 'row flex');
			for (let j = 0; j < 3; j++){
				col = document.createElement('div');
				col.setAttribute('class', 'col border');
				col.setAttribute('id', GameBoardObj.gameBoard.length.toString());
				GameBoardObj.gameBoard.push(col)
				// add propertry seen to this obj 
				GameBoardObj.gameBoard[GameBoardObj.gameBoard.length-1].seen = false;
				row.appendChild(col)
				
			}
			tile.appendChild(row)
		}	
		tile.classList.remove('no-display')

		// activate all columns
		GameBoardObj.gameBoard.forEach(node => node.addEventListener("click", (e) => {
		
			if (!GameBoardObj.rematch_on){
				// avoid getting error message for duplicates, input is already entered on current cell
				if (!node.seen){
					let cur_loc = e.target.id
					renderSymbol(cur_loc)
					node.seen = true
					// console.log(GameBoardObj.gameBoard[cur_loc].innerHTML)
					// if (!GameBoardObj.gameBoard[cur_loc].seen){
					// 	GameBoardObj.gameBoard[cur_loc].seen =  true;
					// 	// renderSymbol(cur_loc)
					// }			
				}		
			}			
		}));
	}	

	const p1_stats_win = document.createElement('p');
	const p2_stats_win = document.createElement('p');
	const ties_num = document.createElement('p');

	const displayPlayers = () => {

		// have them outside of function so they are accessible locally
		const status_div = document.createElement('div');
		const display_box1 = document.createElement('div');
		const display_box2 = document.createElement('div');
		const display_box3 = document.createElement('div');
		const p1_stats = document.createElement('h2');
		const ties = document.createElement('h2');			
		const p2_stats = document.createElement('h2');
		
		status_div.setAttribute('class', 'status-div flex space-around align-center');

		display_box1.setAttribute('class', 'display-div1');
		display_box2.setAttribute('class', 'display-div2');
		display_box3.setAttribute('class', 'display-div3');		

		p1_stats.setAttribute('class', 'p1_stats');
		p1_stats.innerHTML = GamePlay.GamePlayObj.p1.name;

		p1_stats_win.setAttribute('class', 'p1-wins number-display text-center');
		p1_stats_win.innerHTML = GameBoardObj.p1_win;

		p1_stats.appendChild(p1_stats_win);
		display_box1.appendChild(p1_stats)

		ties.setAttribute('class', 'ties');
		ties.innerHTML = 'Ties'
		
		ties_num.setAttribute('class', 'number-display text-center');
		ties_num.innerHTML = GameBoardObj.ties;

		ties.appendChild(ties_num)
		display_box2.appendChild(ties)

		p2_stats.setAttribute('class', 'p2_stats');
		p2_stats.innerHTML = GamePlay.GamePlayObj.p2.name

		p2_stats_win.setAttribute('class', 'number-display text-center');
		p2_stats_win.innerHTML = GameBoardObj.p2_win;

		p2_stats.appendChild(p2_stats_win)
		display_box3.appendChild(p2_stats)

		container.appendChild(status_div)
		status_div.appendChild(display_box1)
		status_div.appendChild(display_box2)
		status_div.appendChild(display_box3)
		
		return {p1_stats,p1_stats_win}
	}

	function renderSymbol(cur_loc){
		const symbol_x = document.createElement('p');

		if (GameBoardObj.p1_turn){
			symbol_x.innerHTML = GamePlay.GamePlayObj.p1.symbol
			GameBoardObj.gameBoard[cur_loc].symbol = GamePlay.GamePlayObj.p1.symbol
			symbol_x.setAttribute('class', 'symbol flex flex-center align-center');
			GameBoardObj.gameBoard[cur_loc].appendChild(symbol_x)
			if (GamePlay.winCheck(GamePlay.GamePlayObj.p1.symbol)){
				displayWin(GamePlay.GamePlayObj.p1.name)
			}

			else if (GameBoard.GameBoardObj.turn_cnt === 9){
				displayWin('tie')
			}
		} else if (GameBoardObj.p2_turn){
			symbol_x.innerHTML = GamePlay.GamePlayObj.p2.symbol
			GameBoardObj.gameBoard[cur_loc].symbol = GamePlay.GamePlayObj.p2.symbol
			symbol_x.setAttribute('class', 'symbol flex flex-center align-center');
			GameBoardObj.gameBoard[cur_loc].appendChild(symbol_x)
			if (GamePlay.winCheck(GamePlay.GamePlayObj.p2.symbol)){
				displayWin(GamePlay.GamePlayObj.p2.name)
			}
			else if (GameBoard.GameBoardObj.turn_cnt === 9){
				displayWin('tie')
			}
		}

		// get player turn to determine symbol
		GameBoardObj.p1_turn = GameBoardObj.p2_turn ? true : false
		GameBoardObj.p2_turn = !GameBoardObj.p1_turn ? true : false

		// increment turn
		GameBoardObj.turn_cnt++
	}

	// rematch itmes
	const rematch_div = document.createElement('div');
	rematch_div.setAttribute('class', 'rematch-div');
	const rematch_btn = document.createElement('button');
	rematch_btn.setAttribute('class', 'rematch-btn');
	rematch_btn.innerHTML = 'REMATCH';
	let already_played = false;

	// add addEventListener to rematch_btn
	// this prvents users from entering input after the game is over
	rematch_btn.addEventListener("click", (e) => {
		GameBoardObj.rematch_on = false;
		resetBoard()
		result_div.removeChild(result_div.lastElementChild)
		rematch_div.removeChild(rematch_div.lastElementChild)
		// rematch_div.classList.add('no-display')
		// result_div.classList.add('no-display')
		already_played = true;
		// reset board
		// nodisplay rematch-btn
	});

	const result_div = document.createElement('div');
	result_div.setAttribute('class', 'result-div');
	const result_text = document.createElement('h2');
	result_text.setAttribute('class', 'result_text text-center');
	tile.appendChild(result_div)
	rematch_div.appendChild(rematch_btn)
	result_div.appendChild(result_text)
	

	function displayWin(name){
		// container.classList.add("bg-change")
		tile.appendChild(rematch_div)
		GameBoardObj.rematch_on = true;

		if (name === GamePlay.GamePlayObj.p1.name){
			// get all variavles outside of function
			result_text.innerHTML = GamePlay.GamePlayObj.p1.name + " Win!"			
			GameBoardObj.p1_win++
			p1_stats_win.innerHTML = GameBoardObj.p1_win;
		}
		else if (name === GamePlay.GamePlayObj.p2.name){
			result_text.innerHTML = GamePlay.GamePlayObj.p2.name + " Win!"			
			GameBoardObj.p2_win++
			p2_stats_win.innerHTML = GameBoardObj.p2_win;
		}

		// tie
		else if (name === 'tie'){
			result_text.innerHTML = 'Tie!'		
			GameBoardObj.ties++
			ties_num.innerHTML = GameBoardObj.ties;
		}

		if (already_played){
			rematch_div.appendChild(rematch_btn)
			result_div.appendChild(result_text)
		}
	}

	const resetBoard = () =>{
		// for (let i = 0; i < GameBoardObj.gameBoard.length; i++){
		// 	GameBoardObj.gameBoard[i].symbol = ''
		// 	while (GameBoardObj.gameBoard[i].lastElementChild) {
		// 	    GameBoardObj.gameBoard[i].removeChild(GameBoardObj.gameBoard[i].lastElementChild);
		// 	}
		// }
		GameBoardObj.gameBoard.forEach(node => {
			// update gameBoard as well
			node.seen = false;

			// board is not updated
			node.symbol = ''
			GameBoardObj.turn_cnt = 1;
			// remove all child 
			while (node.lastElementChild) {
			    node.removeChild(node.lastElementChild);
			}
		});
	}

	// these functions are accessible globally
	return {GameBoardObj,displayPlayers,createTile}

})();
	

const GamePlay = (function() {

	const GamePlayObj = {
		// these objecs can be accessed globally
		AI_level: 'normal',
		multi_player: false,
		p1 : {}, // store name and symbol
		p2 : {}
	}

	// having variable here makes this board updated all the time
	// getting gameboard through argument is not updated
	const board = GameBoard.GameBoardObj.gameBoard
	
	const get_p1 = (player) => {
		GamePlayObj.p1 = player
	}

	const get_p2 = (player) => {
		GamePlayObj.p2 = player
	}

	const getAI_level = (level) => {
		GamePlayObj.AI_level = level
	}

	const getPlayersNum = (players) => {
		GamePlayObj.multi_player = players ? true : false;
	}

	
	const winCheck = (player_symbol) => {
		if (
            (board[0].symbol === player_symbol && board[1].symbol === player_symbol && board[2].symbol === player_symbol) ||
            (board[3].symbol === player_symbol && board[4].symbol === player_symbol && board[5].symbol === player_symbol) ||
            (board[6].symbol === player_symbol && board[7].symbol === player_symbol && board[8].symbol === player_symbol) ||
            (board[0].symbol === player_symbol && board[3].symbol === player_symbol && board[6].symbol === player_symbol) ||
            (board[1].symbol === player_symbol && board[4].symbol === player_symbol && board[7].symbol === player_symbol) ||
            (board[2].symbol === player_symbol && board[5].symbol === player_symbol && board[8].symbol === player_symbol) ||
            (board[0].symbol === player_symbol && board[4].symbol === player_symbol && board[8].symbol === player_symbol) ||
            (board[2].symbol === player_symbol && board[4].symbol === player_symbol && board[6].symbol === player_symbol)
          ) {
            return true;
          } 
          else {      
            return false;
          }
	}
	
	
	return {GamePlayObj,
			board,
			get_p1,
			get_p2,
			getAI_level,
			getPlayersNum,
			winCheck
			}

})();






	

