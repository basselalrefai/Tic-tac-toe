// Gameboard Module
const gameBoardMod = (function() {
	let gameboard = [];
	function render() {
		const gameboardDiv = document.querySelector('.gameboard-grid-container');
		for (let i = 0; i < 9; i++) {
			let cell = document.createElement('div');
			cell.setAttribute('data-index', `${i}`);
			cell.classList.add('cell');
			gameboard.push(null);
			gameboardDiv.appendChild(cell);
		}
	}
	return { gameboard, render };
})();

//State Module
const gameStateMod = (function() {
	let playing = false;
	let vsAi = false;
	let vsPlayer = false;
	let p1Counter = 0;
	let p2Counter = 0;
	let winner = '';
	let loser = '';
	let tie = false;

	const startGame = (opponent) => {
		playing = true;
		if (opponent === 'ai') {
			vsAi = true;
		} else {
			vsPlayer = true;
		}
	};

	const endGame = (result, whoWon, whoLost) => {
		if (result === 'tie') {
			tie = true;
		} else if (result === 'p1Win') {
			winner += whoWon;
			loser += whoLost;
			p1Counter++;
		} else if (result === 'p2Win') {
			winner += whoWon;
			loser += whoLost;
			p2Counter++;
		}
	};

	const resetGame = () => {
		p1Counter = 0;
		p2Counter = 0;
		vsAi = false;
		vsPlayer = false;
		winner = '';
		loser = '';
		tie = false;
	};

	const nextRound = () => {
		for (let i = 0; i < 9; i++) {
			let cells = document.querySelectorAll('.cell');
			cells.forEach((cell) => (cell.textContent = ''));
		}
	};

	return { startGame, endGame, resetGame, nextRound };
})();

//Player Factory
const Player = (name, symbol, playerNum) => {
	let isX = false;
	let isO = false;
	if (symbol.toLowerCase() === 'x') {
		isX = true;
	} else {
		isO = true;
	}

	if (playerNum > 2) throw new Error('Something is wrong the code sees three players');

	return { name, isX, isO, playerNum };
};

window.addEventListener('load', gameBoardMod.render);
