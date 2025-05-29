// Get references to the HTML elements
const generateNpcNameBtn = document.getElementById('generateNpcNameBtn');
const npcNameOutput = document.getElementById('npcNameOutput');
const rollLootBtn = document.getElementById('rollLootBtn');
const lootOutput = document.getElementById('lootOutput');
const levelSlider = document.getElementById('levelSlider');
const currentLevelDisplay = document.getElementById('currentLevel');

// Get all collapsible headers
const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

// --- Placeholder Tables (Replace with your Dungeon Master Guide data!) ---

const npcNames = [
	'Elara Stonehand',
	'Kaelen Swiftblade',
	'Gorok the Stout',
	'Seraphina Whisperwind',
	'Thorn Ironhide',
	'Lyra Meadowlight',
	'Borin Stonebeard',
	'Faelan Shadowbrook',
	'Grizelda Grimefang',
	'Roric Brightshield',
	// Add more NPC names here
];

// Loot items are now objects to allow for different types (e.g., gold vs. specific items)
const lootItems = [
	{ type: 'gold', baseAmount: 5, description: 'gold coins' }, // Base gold amount
	{ type: 'item', name: 'Rusty Iron Sword', description: 'A rusty iron sword' },
	{ type: 'item', name: 'Vial of Healing', description: 'A shimmering vial of healing', rarity: 'Uncommon' },
	{
		type: 'item',
		name: 'Dragon Scale Shield',
		description: 'A formidable shield made from dragon scales',
		rarity: 'Rare',
	},
	{ type: 'item', name: 'Minor Illusion Scroll', description: 'A rolled parchment with a minor illusion spell' },
	{ type: 'item', name: 'Polished Moonstone Pendant', description: 'A polished moonstone pendant', rarity: 'Uncommon' },
	{ type: 'item', name: 'Glowing Longbow', description: 'A glowing longbow that hums faintly', rarity: 'Epic' },
	{
		type: 'item',
		name: "Hero's Plate Armor",
		description: 'Plate armor imbued with the spirit of a fallen hero',
		rarity: 'Legendary',
	},
	{ type: 'item', name: 'Stale Rations', description: 'A stale loaf of bread and a waterskin' },
	{
		type: 'item',
		name: 'Carved Wooden Bird',
		description: 'A small, intricately carved wooden bird that occasionally chirps',
		rarity: 'Rare',
	},
	// Add more loot items here. For items, you can add 'rarity' or other properties as needed.
];

// --- End Placeholder Tables ---

// Initialize the displayed level
currentLevelDisplay.textContent = levelSlider.value;

// Event listener for the level slider to update the displayed value
levelSlider.addEventListener('input', () => {
	currentLevelDisplay.textContent = levelSlider.value;
});

// Function to get a random item from an array
function getRandomItem(arr) {
	if (!arr || arr.length === 0) {
		return null; // Return null if array is empty or invalid
	}
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

// Event listener for Generate NPC Name button
generateNpcNameBtn.addEventListener('click', () => {
	const name = getRandomItem(npcNames);
	npcNameOutput.textContent = name || 'No NPC names available.';
});

// Event listener for Roll Random Loot button
rollLootBtn.addEventListener('click', () => {
	const selectedLoot = getRandomItem(lootItems);
	let resultText = 'No loot available.';

	if (selectedLoot) {
		const currentLevel = parseInt(levelSlider.value, 10);

		if (selectedLoot.type === 'gold') {
			// Scale gold based on level: baseAmount * level * (random factor for variance)
			// Example: Level 1 gold is 5-15, Level 4 gold is 20-60
			const minGold = selectedLoot.baseAmount * currentLevel;
			const maxGold = selectedLoot.baseAmount * currentLevel * 3; // Adjust multiplier for desired range
			const actualGold = Math.floor(Math.random() * (maxGold - minGold + 1)) + minGold;
			resultText = `${actualGold} ${selectedLoot.description}`;
		} else if (selectedLoot.type === 'item') {
			// For items, you might want to add more complex logic here
			// e.g., filtering by rarity based on level, or adding enchantments
			resultText = `${selectedLoot.name}`;
			if (selectedLoot.rarity) {
				resultText += ` (Rarity: ${selectedLoot.rarity})`;
			}
			if (selectedLoot.description) {
				resultText += `: ${selectedLoot.description}`;
			}
		} else {
			resultText = 'Unknown loot type.';
		}
	}
	lootOutput.textContent = resultText;
});

// --- Collapsible Logic ---
collapsibleHeaders.forEach((header) => {
	header.addEventListener('click', () => {
		const targetId = header.dataset.target;
		const content = document.getElementById(targetId);
		const arrow = header.querySelector('.arrow');

		if (content.classList.contains('active')) {
			content.classList.remove('active');
			arrow.classList.remove('rotated');
		} else {
			// Optional: Close other open sections if you want only one open at a time
			// document.querySelectorAll('.collapsible-content.active').forEach(openContent => {
			//     openContent.classList.remove('active');
			//     openContent.previousElementSibling.querySelector('.arrow').classList.remove('rotated');
			// });
			content.classList.add('active');
			arrow.classList.add('rotated');
		}
	});
});
