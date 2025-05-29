type Rarity = 'common' | 'uncommon' | 'rare' | 'very_rare' | 'legendary';

interface LootItem {
	rarity: Rarity;
	value: number;
	consumable: boolean;
	scroll: boolean;
}

const RARITY_VALUES: Record<Rarity, number> = {
	common: 100,
	uncommon: 400,
	rare: 4000,
	very_rare: 40000,
	legendary: 200000,
};

const TIER_DISTR: Record<number, Record<Rarity, number>> = {
	1: { common: 6, uncommon: 4, rare: 1, very_rare: 0, legendary: 0 },
	2: { common: 10, uncommon: 17, rare: 6, very_rare: 1, legendary: 0 },
	3: { common: 3, uncommon: 7, rare: 11, very_rare: 7, legendary: 2 },
	4: { common: 0, uncommon: 0, rare: 5, very_rare: 11, legendary: 9 },
};

/** Mapeia nível (1–20) para tier (1–4) */
function tierPorLevel(level: number): number {
	if (level <= 4) return 1;
	if (level <= 10) return 2;
	if (level <= 16) return 3;
	return 4;
}

/** Gera um loot cujo valor total tenta ficar próximo de level * 500 GP */
function gerarLoot(level: number): { items: LootItem[]; totalValue: number } {
	const budget = level * 500;
	const tier = tierPorLevel(level);
	const dist = TIER_DISTR[tier];

	// Prepara as listas de raridade e seus pesos normalizados
	const rarities = Object.keys(dist) as Rarity[];
	const totalSlots = rarities.reduce((sum, r) => sum + dist[r], 0);
	const weights = rarities.map((r) => dist[r] / totalSlots);

	const items: LootItem[] = [];
	let spent = 0;

	// Função auxiliar para escolher com prob. ponderada
	function pickRarity(): Rarity {
		const rnd = Math.random();
		let acc = 0;
		for (let i = 0; i < rarities.length; i++) {
			acc += weights[i];
			if (rnd <= acc) return rarities[i];
		}
		return rarities[rarities.length - 1];
	}

	// Gera enquanto couber ao menos um item common
	while (spent + RARITY_VALUES.common <= budget) {
		const rarity = pickRarity();
		let value = RARITY_VALUES[rarity];

		// Se estourar orçamento, pula esta iteração
		if (spent + value > budget) continue;

		// Flags: exemplo de chance de ser consumível ou pergaminho
		const consumable = Math.random() < 0.2; // 20% de chance
		const scroll = Math.random() < 0.1; // 10% de chance

		// Ajusta valor conforme tipo
		if (consumable && !scroll) {
			value = value / 2;
		}
		if (scroll) {
			value = value * 2;
		}

		items.push({ rarity, value: Math.floor(value), consumable, scroll });
		spent += value;
	}

	return { items, totalValue: spent };
}

// --- Exemplo de uso ---
const nivel = 4;
const lootResult = gerarLoot(nivel);
console.log(`Nível ${nivel} → Valor total: ${lootResult.totalValue} GP`);
lootResult.items.forEach((it, idx) => {
	console.log(
		`${idx + 1}. [${it.rarity}] ${it.value} GP` +
			(it.consumable ? ' (Consumível)' : '') +
			(it.scroll ? ' (Pergaminho)' : '')
	);
});
