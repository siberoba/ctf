import { renderLayout } from "../layout.js";
import { categories, challenges } from "../data/challenges.js";
import { isSolved, markSolved, isHintRevealed, revealHint } from "../lib/storage.js";
import { checkFlag } from "../lib/crypto.js";
import { showToast } from "../lib/toast.js";

renderLayout("");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const challenge = challenges.find((c) => c.id === id);
const category = challenge ? categories.find((c) => c.slug === challenge.category) : null;

function difficultyBadge(diff) {
	return `<span class="badge badge-${diff}">${diff}</span>`;
}

function fileIcon(name) {
	const ext = name.split(".").pop().toLowerCase();
	const map = {
		pdf: "bxs-file-pdf",
		zip: "bxs-file-archive",
		rar: "bxs-file-archive",
		jpg: "bxs-file-image",
		jpeg: "bxs-file-image",
		png: "bxs-file-image",
		gif: "bxs-file-image",
		txt: "bxs-file-txt",
		pcap: "bxs-data",
		pcapng: "bxs-data",
	};
	return map[ext] || "bxs-file";
}

function renderNotFound() {
	document.getElementById("breadcrumb-current").textContent = "Görev bulunamadı";
	document.getElementById("detail-root").innerHTML = `
		<div class="empty-state" style="grid-column: 1 / -1;">
			<i class='bx bx-error-circle'></i>
			<p>Bu görev bulunamadı. <a href="index.html" style="color:var(--gold)">Panel'e dön</a></p>
		</div>
	`;
}

function render() {
	if (!challenge) {
		renderNotFound();
		return;
	}

	document.title = `Siber Oba CTF - ${challenge.title}`;
	document.getElementById("breadcrumb-cat").textContent = category ? category.name : challenge.category;
	document.getElementById("breadcrumb-cat").href = `category?cat=${encodeURIComponent(challenge.category)}`;
	document.getElementById("breadcrumb-current").textContent = challenge.title;

	const solved = isSolved(challenge.id);

	const filesHtml =
		challenge.files && challenge.files.length
			? `
			<h3 style="margin-bottom:0.75rem;font-size:1.05rem;">Ek Dosyalar</h3>
			<ul class="files-list">
				${challenge.files
					.map(
						(f) => `
					<li>
						<a href="${f.url}" download>
							<i class='bx ${fileIcon(f.name)}'></i>
							<span>${f.name}</span>
						</a>
					</li>`,
					)
					.join("")}
			</ul>
		`
			: "";

	const linkHtml = challenge.link
		? `<a class="btn btn-secondary external-link-btn" href="${challenge.link}" target="_blank" rel="noopener">
				<i class='bx bx-link-external'></i> Hedefe Git
			</a>`
		: "";

	const hintHtml = challenge.hint
		? `
			<div class="hint-box">
				<button class="hint-toggle" id="hint-toggle">
					<i class='bx bx-bulb'></i> İpucunu Göster
				</button>
				<div class="hint-content" id="hint-content">${challenge.hint}</div>
			</div>
		`
		: "";

	document.getElementById("detail-root").innerHTML = `
		<div class="detail-main">
			<div class="badges-row">
				<span class="badge badge-category">${category ? category.name : challenge.category}</span>
				<span class="badge badge-points">${challenge.points} puan</span>
				${difficultyBadge(challenge.difficulty)}
				${solved ? `<span class="badge badge-solved"><i class='bx bx-check'></i> Çözüldü</span>` : ""}
			</div>
			<h1>${challenge.title}</h1>
			<div class="detail-description">${challenge.description}</div>
			${linkHtml}
			${filesHtml}
			${hintHtml}

			<h3 style="margin-bottom:0.5rem;font-size:1.05rem;">Flag Gönder</h3>
			${
				solved
					? `<div class="solved-banner"><i class='bx bxs-check-circle'></i> Bu görevi zaten çözdünüz. Tebrikler!</div>`
					: `
				<form class="flag-form" id="flag-form" autocomplete="off">
					<input type="text" id="flag-input" placeholder="${challenge.flagFormat || "SIBEROBA{...}"}" />
					<button type="submit" class="btn btn-primary">
						<i class='bx bx-send'></i> Gönder
					</button>
					<div class="flag-feedback" id="flag-feedback"></div>
				</form>
			`
			}
		</div>
		<aside class="detail-side">
			<div class="info-row"><span>Modül</span><span>${category ? category.name : challenge.category}</span></div>
			<div class="info-row"><span>Puan</span><span>${challenge.points}</span></div>
			<div class="info-row"><span>Zorluk</span><span style="text-transform:capitalize">${challenge.difficulty}</span></div>
			<div class="info-row"><span>Durum</span><span>${solved ? "Çözüldü ✅" : "Çözülmedi"}</span></div>
			<a href="category?cat=${encodeURIComponent(challenge.category)}" class="btn btn-secondary btn-sm" style="text-align:center;">
				<i class='bx bx-arrow-back'></i> Modüle Dön
			</a>
		</aside>
	`;

	wireHint();
	wireFlagForm();
}

function wireHint() {
	const toggle = document.getElementById("hint-toggle");
	const content = document.getElementById("hint-content");
	if (!toggle || !content) return;

	if (isHintRevealed(challenge.id)) {
		content.classList.add("open");
		toggle.innerHTML = `<i class='bx bx-bulb'></i> İpucunu Gizle`;
	}

	toggle.addEventListener("click", () => {
		const isOpen = content.classList.toggle("open");
		toggle.innerHTML = isOpen ? `<i class='bx bx-bulb'></i> İpucunu Gizle` : `<i class='bx bx-bulb'></i> İpucunu Göster`;
		if (isOpen) revealHint(challenge.id);
	});
}

function wireFlagForm() {
	const form = document.getElementById("flag-form");
	if (!form) return;

	const input = document.getElementById("flag-input");
	const feedback = document.getElementById("flag-feedback");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const value = input.value.trim();
		if (!value) return;

		const submitBtn = form.querySelector("button[type=submit]");
		submitBtn.disabled = true;

		try {
			const caseSensitive = challenge.caseSensitive !== false;
			const correct = await checkFlag(value, challenge.flagHash, caseSensitive);

			if (correct) {
				markSolved(challenge.id);
				feedback.className = "flag-feedback show success";
				feedback.textContent = `Doğru! +${challenge.points} puan kazandınız.`;
				showToast(`"${challenge.title}" çözüldü! +${challenge.points} puan`, "success");
				setTimeout(() => render(), 900);
			} else {
				feedback.className = "flag-feedback show error";
				feedback.textContent = "Yanlış flag, tekrar deneyin.";
				input.classList.add("error-shake");
				setTimeout(() => input.classList.remove("error-shake"), 400);
				showToast("Yanlış flag", "error");
			}
		} catch (err) {
			console.error(err);
			feedback.className = "flag-feedback show error";
			feedback.textContent = "Bir hata oluştu, tekrar deneyin.";
		} finally {
			submitBtn.disabled = false;
		}
	});
}

render();
