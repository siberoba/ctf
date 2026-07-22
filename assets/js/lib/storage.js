/**
 * Tarayıcı localStorage üzerinden ilerleme takibi.
 * Backend olmadığı için ilerleme her tarayıcıya özeldir.
 * Kullanıcılar "Dışa Aktar / İçe Aktar" özelliğiyle ilerlemelerini
 * farklı bir cihaza taşıyabilir (bkz. profile export/import).
 */

const STORAGE_KEY = "siberoba_ctf_progress_v1";

function readRaw() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { solved: {}, hints: {} };
		const parsed = JSON.parse(raw);
		return {
			solved: parsed.solved || {},
			hints: parsed.hints || {},
		};
	} catch (e) {
		console.warn("CTF progress okunamadı, sıfırlanıyor.", e);
		return { solved: {}, hints: {} };
	}
}

function writeRaw(data) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isSolved(id) {
	const data = readRaw();
	return Boolean(data.solved[id]);
}

export function markSolved(id) {
	const data = readRaw();
	data.solved[id] = { ts: Date.now() };
	writeRaw(data);
}

export function getSolvedIds() {
	const data = readRaw();
	return Object.keys(data.solved);
}

export function isHintRevealed(id) {
	const data = readRaw();
	return Boolean(data.hints[id]);
}

export function revealHint(id) {
	const data = readRaw();
	data.hints[id] = true;
	writeRaw(data);
}

export function resetProgress() {
	localStorage.removeItem(STORAGE_KEY);
}

export function exportProgress() {
	return readRaw();
}

export function importProgress(json) {
	const parsed = typeof json === "string" ? JSON.parse(json) : json;
	writeRaw({
		solved: parsed.solved || {},
		hints: parsed.hints || {},
	});
}
