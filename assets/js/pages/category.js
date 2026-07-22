import { loadData } from "../data/loader.js";
import { getSolvedIds } from "../lib/storage.js";

const { categories, challenges } = await loadData();

const params = new URLSearchParams(window.location.search);
const slug = params.get("cat");
const category = categories.find((c) => c.slug === slug);

function difficultyBadge(diff) {
	return `<span class="badge badge-${diff}">${diff}</span>`;
}

function render() {
	const headerEl = document.getElementById("cat-header");
	const breadcrumbEl = document.getElementById("breadcrumb-current");
	const grid = document.getElementById("challenge-grid");

	if (!category) {
		headerEl.innerHTML = `<h1><i class='bx bx-error-circle'></i> Kategori bulunamadı</h1><p>Bu bağlantı geçersiz olabilir.</p>`;
		grid.innerHTML = `
			<div class="empty-state">
				<i class='bx bx-error-circle'></i>
				<p>Aradığınız kategori mevcut değil. <a href="index.html" style="color:var(--gold)">Panel'e dön</a></p>
			</div>`;
		return;
	}

	document.title = `Siber Oba CTF - ${category.name}`;
	breadcrumbEl.textContent = category.name;

	headerEl.innerHTML = `
		<h1><i class='bx ${category.icon}' style="color:var(--gold)"></i> ${category.name}</h1>
		<p>${category.description}</p>
	`;

	const solvedIds = new Set(getSolvedIds());
	const catChallenges = challenges.filter((c) => c.category === category.slug);

	if (!catChallenges.length) {
		grid.innerHTML = `
			<div class="empty-state">
				<i class='bx bx-folder-open'></i>
				<p>Bu modülde henüz görev eklenmemiş. Yakında burada olacak!</p>
			</div>`;
		return;
	}

	grid.innerHTML = catChallenges
		.map((c) => {
			const solved = solvedIds.has(c.id);
			return `
				<a class="challenge-card ${solved ? "solved" : ""}" href="challenge?id=${encodeURIComponent(c.id)}">
					${solved ? `<i class='bx bxs-check-circle solved-flag'></i>` : ""}
					<h3>${c.title}</h3>
					<p class="ch-desc">${stripHtml(c.description)}</p>
					<div class="ch-tags">
						<span class="badge badge-points">${c.points} puan</span>
						${difficultyBadge(c.difficulty)}
						${solved ? `<span class="badge badge-solved"><i class='bx bx-check'></i> Çözüldü</span>` : ""}
					</div>
				</a>
			`;
		})
		.join("");
}

function stripHtml(html) {
	const tmp = document.createElement("div");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
}

render();
