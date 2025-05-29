const feetInput = document.getElementById('feetInput');
const squaresOutput = document.getElementById('squaresOutput');
const metersOutput = document.getElementById('metersOutput');

feetInput.addEventListener('input', function () {
	const feet = parseFloat(feetInput.value) || 0;
	const squares = feet / 5;
	const meters = feet * 0.3;
	squaresOutput.textContent = `🟫 Squares: ${squares}`;
	metersOutput.textContent = `📏 Meters: ${meters}`;
});
