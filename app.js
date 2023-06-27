// 定義配對項目
const items = [
	{value: "密碼保護", id: 1},
	{value: "雙重認證", id: 2},
	{value: "網上買賣要小心詐騙", id: 3},
	{value: "保持網絡安全", id: 4},
	{value: "不要隨便點擊不明來源的連結", id: 5},
	{value: "謹慎打開陌生人發送的文件", id: 6},
	{value: "使用安全的Wi-Fi網絡", id: 7},
	{value: "定期更改密碼", id: 8},
];

// 複製配對項目並合併成一個新的陣列
const items2 = [
	{value: "私人或機密資料", id: 1},
	{value: "為每個賬戶設立", id: 2},
	{value: "看到投資推薦信息時", id: 3},
	{value: "無時無刻", id: 4},
	{value: "收到可疑連結時", id: 5},
	{value: "當收到陌生信息時", id: 6},
	{value: "在戶外使用公共網絡時", id: 7},
	{value: "個人賬戶必須", id: 8},
];

// 複製配對項目並合併成一個新的陣列
const cards = [...items, ...items2];

// 洗牌函數
function shuffle(array) {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// 初始化遊戲
function initGame() {
	const shuffledCards = shuffle(cards);
	const gameBoard = document.getElementById("game-board");

	shuffledCards.forEach(card => {
		const cardElement = document.createElement("div");
		cardElement.classList.add("card");
		cardElement.dataset.id = card.id;
		cardElement.innerHTML = card.value;
		cardElement.addEventListener("click", handleCardClick);
		gameBoard.appendChild(cardElement);
	});

	// 初始化得分和計時器
	score = 0;
	timer = 60;
	updateScore();
	updateTimer();
	countdown();
}

// 清除遊戲面板
function clearGameBoard() {
	const gameBoard = document.getElementById("game-board");
	gameBoard.innerHTML = "";
}

// 重新開始遊戲
function restartGame() {
	clearGameBoard();
	initGame();
}

// 處理卡片點擊事件
let firstCard = null;
let secondCard = null;
let isProcessing = false;
let score = 0;
let timer = 60;
let countdownInterval = null;

function handleCardClick() {
	if (isProcessing) {
		return;
	}

	if (!firstCard) {
		firstCard = this;
		firstCard.classList.add("matched");
		return;
	}

	secondCard = this;
	secondCard.classList.add("matched");

	if (firstCard.dataset.id === secondCard.dataset.id) {
		firstCard.removeEventListener("click", handleCardClick);
		secondCard.removeEventListener("click", handleCardClick);
		score += 10;
		updateScore();
		firstCard = null;
		secondCard = null;
		
		if (document.querySelectorAll(".matched").length === cards.length) {
			endGame();
		}
	} else {
		isProcessing = true;
		setTimeout(() => {
			firstCard.classList.remove("matched");
			secondCard.classList.remove("matched");
			firstCard = null;
			secondCard = null;
			isProcessing = false;
		}, 1000);
	}
}

function updateScore() {
	document.getElementById("score").innerHTML = score;
}

function updateTimer() {
	document.getElementById("timer").innerHTML = timer;
}

function countdown() {
	countdownInterval = setInterval(() => {
		timer--;
		updateTimer();
		if (timer === 0) {
			clearInterval(countdownInterval);
			endGame();
		}
	}, 1000);
}

function endGame() {
	clearInterval(countdownInterval);
	const gameBoard = document.getElementById("game-board");
	gameBoard.style.display = "none";
	const gameOver = document.getElementById("game-over");
	gameOver.style.display = "block";
	document.getElementById("game-over-score").innerHTML = "你的得分是：" + score;
}

// 初始化遊戲
initGame();

		
