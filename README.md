# Feet to Squares Converter

Feet to Squares Converter is a Chrome extension that automatically converts mentions of distances in feet into equivalent measurements in "squares" (5 feet per square) and meters. This is particularly useful for tabletop role-playing games or other contexts where distances are commonly measured in squares.

## Features

- Automatically detects and converts distances in feet, such as "10 feet" or "15 ft.", into:
  - Squares (5 feet per square)
  - Meters (rounded to the nearest whole number)
- Works automatically on any page, but you can also limit its access to specific URLs.
- **Popup tool:** Enter a value in feet and instantly see the conversion to squares and meters.

## How It Works

1. The extension observes the webpage for text content and dynamically loaded elements.
2. It identifies distances in feet using a regular expression.
3. Converts the distances into squares and meters\*, appending the converted values in brackets.

- Note: The correct feet to meters conversion is `feet * 0.3048`. To simplify rounding, the extension uses `feet * 0.3`, which is sufficiently accurate for tabletop gaming and matches the convention of 1 square = 1.5 meters.

For example:

- "10 feet" becomes "10 feet [2sq | 3m]"
- "15 ft." becomes "15 ft. [3sq | 4m]"
- "30-foot Cone" becomes "30-foot [6sq | 9m] Cone"

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top-right corner.
4. Click "Load unpacked" and select the folder containing this extension.

## Usage

- The extension works automatically on any webpage.
- To use the popup tool:
  1. Click the extension icon in the Chrome toolbar.
  2. Enter a value in feet to see the conversion to squares and meters instantly.

## Permissions

This extension requires the following permissions:

- `activeTab`: To execute the script on the active tab.
- `<all_urls>`: To match and modify content on all webpages.

## Files

- `manifest.json`: Defines the extension's metadata and permissions.
- `force.js`: Handles the browser action click event to inject the content script.
- `content.js`: Contains the logic for detecting and converting distances.
- `popup.html`, `popup.css`, `popup.js`: Implements the popup conversion tool.
- `icons/`: Contains the extension's icon.

## License

This project is licensed under the MIT License.
