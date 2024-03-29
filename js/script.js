let game = document.querySelector('.game');
let res = document.querySelector('.res');
let btnGame = document.querySelector('.new-game');
let cells = document.querySelectorAll('.cell');
let step = false;
let count = 0;
let circle = `<svg class="circle">
				<circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round" />
			</svg>`;
let cross = `<svg class="cross">
				<line class="first" x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
				<line class="second" x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
			</svg>`;

function stepCross(target) {
	target.innerHTML = cross;
	target.classList.add('x');
	count++;
}
function stepZero(target) {
	target.innerHTML = circle;
	target.classList.add('o');
	count++;
}

function init(e) {
	if (!step) stepCross(e.target);
	else stepZero(e.target);
	step = !step;
	win();
}

function newGame() {
	step = false;
	count = 0;
	res.innerText = '';
	cells.forEach(item => {
		item.innerHTML = '';
		item.classList.remove('x', 'o', 'active');
	});
	game.addEventListener('click', init);
}

function win() {
	let comb = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < comb.length; i++) {

		if (cells[comb[i][0]].classList.contains('x') &&
			cells[comb[i][1]].classList.contains('x') &&
			cells[comb[i][2]].classList.contains('x')) {
			setTimeout(() => {
				cells[comb[i][0]].classList.add('active');
				cells[comb[i][1]].classList.add('active');
				cells[comb[i][2]].classList.add('active');
				res.innerText = 'Wins X';
			}, 1500);
			game.removeEventListener('click', init);
		}

		else if (cells[comb[i][0]].classList.contains('o') &&
			cells[comb[i][1]].classList.contains('o') &&
			cells[comb[i][2]].classList.contains('o')) {
			setTimeout(() => {
				cells[comb[i][0]].classList.add('active');
				cells[comb[i][1]].classList.add('active');
				cells[comb[i][2]].classList.add('active');
				res.innerText = 'Wins O';
			}, 1500);
			game.removeEventListener('click', init);
		}

		else if (count == 9) {
			res.innerText = 'Draw';
			game.removeEventListener('click', init);
		}

	}

}

btnGame.addEventListener('click', newGame);
game.addEventListener('click', init);
