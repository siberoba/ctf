const animatedEls = document.querySelectorAll(".project-card, .stat-card");

if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.animation = "fadeInUp .6s ease-out forwards";
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: "0px 0px -100px 0px",
		},
	);

	animatedEls.forEach((el) => observer.observe(el));
} else {
	// No IntersectionObserver support: just show the content instead of leaving it at opacity:0
	animatedEls.forEach((el) => (el.style.opacity = "1"));
}
