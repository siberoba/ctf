const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const backdrop = document.querySelector(".nav-backdrop");

function openMenu() {
	navLinks.classList.add("active");
	backdrop.classList.add("active");
	document.body.style.overflow = "hidden";
}

function closeMenu() {
	navLinks.classList.remove("active");
	backdrop.classList.remove("active");
	document.body.style.overflow = "";
}

menuToggle.addEventListener("click", () => {
	if (navLinks.classList.contains("active")) {
		closeMenu();
	} else {
		openMenu();
	}
});

backdrop.addEventListener("click", closeMenu);

navItems.forEach((link) => {
	link.addEventListener("click", closeMenu);
});
