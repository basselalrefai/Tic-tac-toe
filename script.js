//Player Factory
const Player = (name, symbol, playerNum) => {
	if (playerNum > 2) throw new Error('Something is wrong the code sees three players');
	symbol = symbol.toUpperCase();
	return { name, symbol, playerNum };
};

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
	let playerArr = [ Player('Ali', 'x', 1), Player('Moh', 'o', 2) ];
	return { gameboard, render, playerArr };
})();

//State Module
const gameStateMod = (function() {
	let currentPlayer = gameBoardMod.playerArr[0]['symbol'];
	let isPlaying = false;
	let p1Counter = 0;
	let p2Counter = 0;
	const msgDisplay = document.querySelector('.announcement');
	const resetGameBtn = document.querySelector('.reset-btn');
	const nextRoundBtn = document.querySelector('.next-round-btn');
	const p1ScoreDisplay = document.querySelector('.p1-score-num');
	const p2ScoreDisplay = document.querySelector('.p2-score-num');
	const p1Name = document.querySelector('.p1-name');
	const p2Name = document.querySelector('.p2-name');
	p2Name.textContent = `${gameBoardMod.playerArr[1]['name']}: `;
	p1Name.textContent = `${gameBoardMod.playerArr[0]['name']}: `;
	resetGameBtn.addEventListener('click', resetGame);
	nextRoundBtn.addEventListener('click', nextRound);
	let winArray = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	];

	function checkWin() {
		let winner = null;
		winArray.forEach(function(winArray, index) {
			if (
				gameBoardMod.gameboard[winArray[0]] &&
				gameBoardMod.gameboard[winArray[0]] === gameBoardMod.gameboard[winArray[1]] &&
				gameBoardMod.gameboard[winArray[0]] === gameBoardMod.gameboard[winArray[2]]
			)
				winner = gameBoardMod.gameboard[winArray[0]];
		});
		winner ? winner : gameBoardMod.gameboard.includes(null) ? null : 'Tie';
		if (winner) {
			const cells = document.querySelectorAll('.cell');
			for (let i = 0; i < 9; i++) {
				cells[i].removeEventListener('click', cellClickHandler);
			}
		}
		return winner;
	}

	function renderWinner(winner) {
		if (winner === null) {
			return;
		} else if (winner === 'Tie') {
			msgDisplay.textContent = "It's a Tie!";
		} else {
			let winArr = gameBoardMod.playerArr.filter((obj) => (obj['symbol'] === winner ? true : false));
			winArr[0]['playerNum'] === 1 ? p1Counter++ : p2Counter++;
			p1ScoreDisplay.textContent = `${p1Counter}`;
			p2ScoreDisplay.textContent = `${p2Counter}`;
			msgDisplay.textContent = `${winArr[0]['name']} has won.`;
		}
	}

	function cellClickHandler(cell) {
		cell.target.textContent = `${currentPlayer}`;
		let cellId = cell.target.dataset.index;
		gameBoardMod.gameboard[cellId] = currentPlayer;
		if (currentPlayer === 'X') {
			currentPlayer = 'O';
		} else if (currentPlayer === 'O') {
			currentPlayer = 'X';
		}
		checkWin();
		renderWinner(checkWin());
		cell.target.removeEventListener('click', cellClickHandler);
	}

	function startGame() {
		isPlaying = true;
		for (let i = 0; i < gameBoardMod.gameboard.length; i++) {
			let cell = document.querySelector(`[data-index="${i}"]`);
			cell.addEventListener('click', cellClickHandler);
		}
	}

	function nextRound() {
		if (!checkWin()) return;
		const cells = document.querySelectorAll('.cell');
		for (let i = 0; i < gameBoardMod.gameboard.length; i++) {
			gameBoardMod.gameboard[i] = null;
			cells[i].textContent = '';
			msgDisplay.textContent = '';
			cells[i].addEventListener('click', cellClickHandler);
		}
	}

	function resetGame() {
		isPlaying = false;
		p1Counter = 0;
		p2Counter = 0;
		p1ScoreDisplay.textContent = 0;
		p2ScoreDisplay.textContent = 0;
		const cells = document.querySelectorAll('.cell');
		for (let i = 0; i < gameBoardMod.gameboard.length; i++) {
			gameBoardMod.gameboard[i] = null;
			cells[i].textContent = '';
			msgDisplay.textContent = '';
			cells[i].addEventListener('click', cellClickHandler);
		}
	}

	return { startGame };
})();

window.addEventListener('load', gameBoardMod.render);
window.addEventListener('load', gameStateMod.startGame);
