
// factories
// player

const Player = (name) => {
	return {name,symbol}
}

// each cell has its coordinate and symbol
// const spot = (x,y) => {
// 	let symbol 
// 	return {x,y,symbol}
// }

const GameBoard = () => {

	let gameBoard = [0,1,2,3,4,5,6,7,8];

}


// module
// createtile
// main

function createTile(){
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
		}
		tile.appendChild(row)
	}
	tile.classList.remove('no-display')
}

function CloseMenu(menu){
	console.log(menu)
	menu.classList.add('no-display')
}

function OpenMenu(){
	menu.classList.remove('no-display')
}

	
function main(){
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
		   	createTile()
		   	// display_tile()

		   	// AI(level)
	   })
	}
	

}

main()