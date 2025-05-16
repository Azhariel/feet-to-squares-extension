// Select the body of the document where we will perform the replacements.
// We use a MutationObserver to handle dynamically loaded content.
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.addedNodes) {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.TEXT_NODE) {
					replaceFeetWithSquares(node);
				} else if (node.nodeType === Node.ELEMENT_NODE) {
					// Check for text nodes within added elements
					node.querySelectorAll('*').forEach((element) => {
						element.childNodes.forEach((childNode) => {
							if (childNode.nodeType === Node.TEXT_NODE) {
								replaceFeetWithSquares(childNode);
							}
						});
					});
				}
			});
		}
	});
});

// Start observing the document body for changes.
observer.observe(document.body, {
	childList: true, // Observe direct children
	subtree: true, // Observe all descendants
	characterData: false, // No need to observe character data changes within existing nodes for this
});

// Also run the replacement on the initial page load
replaceFeetWithSquares(document.body);

function round(value, step) {
	step || (step = 1.0);
	var inv = 1.0 / step;
	return Math.round(value * inv) / inv;
}

function replaceFeetWithSquares(node) {
	// Only process text nodes that are not in script or style elements
	if (
		node.nodeType === Node.TEXT_NODE &&
		node.parentNode &&
		node.parentNode.tagName !== 'SCRIPT' &&
		node.parentNode.tagName !== 'STYLE'
	) {
		const originalText = node.nodeValue;
		// Regex to find distances. It captures the number.
		// (\d+) - captures one or more digits
		// \s* - matches zero or more whitespace characters
		// (feet|pés|ft\.|foot) - matches "feet", "pés", "ft." or "foot" (case insensitive)
		// The 'gi' flags mean global (find all matches) and case insensitive.

		const regex = /(\d+)\s*(feet|pés|ft\.|-foot)(?!\s*\[\d+\s*sq\s*\|\s*\d+m\])/gi;
		let newText = '';
		let lastIndex = 0;
		let match;

		while ((match = regex.exec(originalText)) !== null) {
			const feet = parseInt(match[1], 10);
			const squares = Math.floor(feet / 5);
			const meters = feet * 0.3;
			const replacement = `${match[0]} [${squares}sq | ${meters}m]`;

			// Append text before the match and the replacement
			newText += originalText.slice(lastIndex, match.index) + replacement;
			lastIndex = match.index + match[0].length;
		}

		// Append remaining text after the last match
		newText += originalText.slice(lastIndex);

		// If the text has changed, update the node's value
		if (newText !== originalText) {
			node.nodeValue = newText;
		}
	} else if (node.nodeType === Node.ELEMENT_NODE) {
		// If it's an element node, iterate through its child nodes
		node.childNodes.forEach((childNode) => {
			replaceFeetWithSquares(childNode);
		});
	}
}
