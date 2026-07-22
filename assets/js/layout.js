/**
 * Ortak header / footer bileşeni.
 * Sayfalarda <div data-include="header"></div> ve
 * <div data-include="footer"></div> yer tutucularını doldurur.
 *
 * `basePath` parametresi, sayfanın repo köküne göre derinliğini belirtir.
 * Kök dizindeki sayfalar için "" , /admin/ gibi bir alt klasördeki
 * sayfalar için "../" verilmelidir.
 */

export function renderLayout(basePath = "") {
	const header = document.querySelector('[data-include="header"]');
	const footer = document.querySelector('[data-include="footer"]');

	if (header) {
		header.innerHTML = `
			<nav>
				<div class="nav-container">
					<a href="${basePath}index.html" class="logo" style="text-decoration:none;color:inherit;">
						<picture>
							<source srcset="${basePath}assets/img/logo.webp" type="image/webp" />
							<img src="${basePath}assets/img/logo.png" alt="Siber Oba Logo" width="50" height="50" loading="eager" decoding="async" />
						</picture>
						<span>Siber Oba <span style="color:var(--gold)">CTF</span></span>
					</a>
					<ul class="nav-links">
						<li><a href="${basePath}index.html" class="nav-link" data-nav="dashboard">Panel</a></li>
						<li><a href="${basePath}profile.html" class="nav-link" data-nav="profile">Profilim</a></li>
						<li><a href="https://siberoba.github.io/" class="nav-link" target="_blank" rel="noopener">Ana Site</a></li>
					</ul>
					<button class="menu-toggle" aria-label="Menü">☰</button>
				</div>
			</nav>
			<div class="nav-backdrop"></div>
		`;
	}

	if (footer) {
		footer.innerHTML = `
			<footer>
				<div class="footer-container">
					<div class="footer-grid">
						<div class="footer-column">
							<div class="logo" style="margin-bottom: 1rem">
								<picture>
									<source srcset="${basePath}assets/img/logo.webp" type="image/webp" />
									<img src="${basePath}assets/img/logo.png" alt="Siber Oba Logo" width="50" height="50" loading="lazy" decoding="async" />
								</picture>
								<span>Siber Oba CTF</span>
							</div>
							<p>Türkiye'nin modern siber güvenlik topluluğu tarafından hazırlanan pratik yapma platformu.</p>
						</div>
						<div class="footer-column">
							<h4>Hızlı Bağlantılar</h4>
							<div class="link-grid">
								<a href="${basePath}index">Panel</a>
								<a href="${basePath}profile">Profilim</a>
								<a href="https://siberoba.github.io/" target="_blank" rel="noopener">Ana Site</a>
							</div>
						</div>
						<div class="footer-column">
							<h4>Sosyal Medya</h4>
							<div class="social-links">
								<a href="https://github.com/siberoba" class="social-link" title="GitHub"><i class="bxl bx-github"></i></a>
								<a href="https://www.linkedin.com/company/siberoba" class="social-link" title="LinkedIn"><i class="bxl bx-linkedin"></i></a>
								<a href="https://www.youtube.com/@siberoba" class="social-link" title="YouTube"><i class="bxl bx-youtube"></i></a>
							</div>
						</div>
					</div>
					<div class="footer-bottom">
						<p>&copy; 2025 Siber Oba. Tüm hakları saklıdır.</p>
					</div>
				</div>
			</footer>
		`;
	}

	wireMobileMenu();
	highlightActiveNav();
}

function wireMobileMenu() {
	const menuToggle = document.querySelector(".menu-toggle");
	const navLinks = document.querySelector(".nav-links");
	const backdrop = document.querySelector(".nav-backdrop");
	if (!menuToggle || !navLinks || !backdrop) return;

	const open = () => {
		navLinks.classList.add("active");
		backdrop.classList.add("active");
		document.body.style.overflow = "hidden";
	};
	const close = () => {
		navLinks.classList.remove("active");
		backdrop.classList.remove("active");
		document.body.style.overflow = "";
	};

	menuToggle.addEventListener("click", () => {
		navLinks.classList.contains("active") ? close() : open();
	});
	backdrop.addEventListener("click", close);
	navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

function highlightActiveNav() {
	const page = document.body.dataset.page;
	if (!page) return;
	const link = document.querySelector(`[data-nav="${page}"]`);
	if (link) link.classList.add("active");
}
