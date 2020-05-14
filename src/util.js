// util.js - Helper functions for hex string to ascii string conversion

export function decodeFromHex(hex) {
	if (!hex || hex.length < 4 || hex[0] !== "0" || hex[1] !== "x" || hex.length % 2 !== 0) {
		console.log(`Invalid hex string: ${hex}`);
		return "";
	} else {
		let result = "";

		for (let i = 2; i<hex.length; i+=2) {
			let n = parseInt(hex.slice(i, i+2), 16);
			result += String.fromCharCode(n);
		}

		try {
			return JSON.parse(result);
		} catch (e) {
			return "Error: message could not be decrypted";
		}
	}
}

export function encodeToHex(string) {
	let hexEncodedMessage = "0x";

	try {
		for (let c of string) {
			hexEncodedMessage += c.charCodeAt(0).toString(16);
		}
	} catch(e) {
		
	}

	return hexEncodedMessage;
}

export function getMsgDate(e) {
	let temp_hour, temp_mins;
	e.getHours() < 10 ? temp_hour = '0' + e.getHours() : temp_hour = e.getHours();
	e.getMinutes() < 10 ? temp_mins = '0' + e.getMinutes() : temp_mins = e.getMinutes();
	return e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate() + ' ' + temp_hour + ':' + temp_mins;
}
