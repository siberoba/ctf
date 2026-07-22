/**
 * Basit toast bildirim sistemi.
 * Kullanım: showToast("Mesaj", "success" | "error" | "info")
 */

function ensureRoot() {
	let root = document.getElementById("toast-root");
	if (!root) {
		root = document.createElement("div");
		root.id = "toast-root";
		document.body.appendChild(root);
	}
	return root;
}

export function showToast(message, type = "info", duration = 3500) {
	const root = ensureRoot();
	const toast = document.createElement("div");
	toast.className = `toast ${type}`;
	toast.textContent = message;
	root.appendChild(toast);

	setTimeout(() => {
		toast.style.opacity = "0";
		toast.style.transition = "opacity 0.3s ease";
		setTimeout(() => toast.remove(), 300);
	}, duration);
}
