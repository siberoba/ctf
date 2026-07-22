/**
 * SubtleCrypto tabanlı SHA-256 yardımcıları.
 * Bayrak (flag) değerleri asla düz metin olarak repoda tutulmaz;
 * sadece SHA-256 hash'i saklanır ve kullanıcının girdiği metnin
 * hash'i bununla karşılaştırılır.
 */

/**
 * Verilen metnin SHA-256 hex hash'ini döndürür.
 * @param {string} message
 * @returns {Promise<string>} 64 karakterlik hex string (küçük harf)
 */
export async function sha256Hex(message) {
	const data = new TextEncoder().encode(message);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return [...new Uint8Array(digest)]
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

/**
 * Kullanıcının girdiği flag'i, challenge tanımındaki hash ile karşılaştırır.
 * @param {string} input Kullanıcının girdiği metin
 * @param {string} expectedHash Beklenen sha256 hex hash
 * @param {boolean} caseSensitive Varsayılan true
 */
export async function checkFlag(input, expectedHash, caseSensitive = true) {
	const normalizedInput = input.trim();
	const value = caseSensitive ? normalizedInput : normalizedInput.toLowerCase();
	const hash = await sha256Hex(value);
	return hash.toLowerCase() === expectedHash.toLowerCase();
}
