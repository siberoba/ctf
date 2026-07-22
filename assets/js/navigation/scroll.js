document.querySelectorAll("a").forEach((anchor) => {
	anchor.addEventListener("click", (e) => {
		const href = anchor.getAttribute("href");

		if (!href || !href.startsWith("#")) {
			return;
		}

		e.preventDefault();

		const target = document.querySelector(href);

		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});
