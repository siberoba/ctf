import { renderLayout } from "../layout.js";
import { categories, challenges } from "../data/challenges.js";
import { getSolvedIds } from "../lib/storage.js";

renderLayout("");

function render() {
	const solvedIds = new Set(getSolvedIds());
	const totalChallenges = challenges.length;
	const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0);
	const solvedChallenges = challenges.filter((c) => solvedIds.has(c.id));
	const earnedPoints = solvedChallenges.reduce((sum, c) => sum + c.points, 0);
	const percent = totalChallenges ? Math.round((solvedChallenges.length / totalChallenges) * 100) : 0;

	document.getElementById("summary").innerHTML = `
		<div class="summary-card">
			<div class="value">${solvedChallenges.length}/${totalChallenges}</div>
			<div class="label">Çözülen Görev</div>
		</div>
		<div class="summary-card">
			<div class="value">${earnedPoints}</div>
			<div class="label">Kazanılan Puan</div>
		</div>
		<div class="summary-card">
			<div class="value">${totalPoints}</div>
			<div class="label">Toplam Puan</div>
		</div>
		<div class="summary-card">
			<div class="value">${categories.length}</div>
			<div class="label">Modül</div>
		</div>
	`;

	document.getElementById("overall-progress").style.width = `${percent}%`;
	document.getElementById("overall-progress-label").textContent = `${percent}% tamamlandı`;

	const grid = document.getElementById("category-grid");

	if (!categories.length) {
		grid.innerHTML = `
			<div class="empty-state">
				<i class='bx bx-folder-open'></i>
				<p>Henüz bir kategori eklenmemiş. assets/js/data/challenges.js dosyasını düzenleyin.</p>
			</div>`;
		return;
	}

	grid.innerHTML = categories
		.map((cat) => {
			const catChallenges = challenges.filter((c) => c.category === cat.slug);
			const catSolved = catChallenges.filter((c) => solvedIds.has(c.id));
			const catPercent = catChallenges.length ? Math.round((catSolved.length / catChallenges.length) * 100) : 0;

			return `
				<a class="category-card" href="category?cat=${encodeURIComponent(cat.slug)}">
					<div class="cat-icon"><i class='bx ${cat.icon}'></i></div>
					<h3>${cat.name}</h3>
					<p>${cat.description}</p>
					<div class="cat-progress-track">
						<div class="cat-progress-fill" style="width:${catPercent}%"></div>
					</div>
					<div class="cat-meta">
						<span>${catChallenges.length} görev</span>
						<span class="done">${catSolved.length} çözüldü</span>
					</div>
				</a>
			`;
		})
		.join("");
}

render();
