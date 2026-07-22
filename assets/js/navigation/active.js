const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

if (sections.length) {
    const updateActiveLink = () => {
        let current = "";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.id;
            }
        });

        navItems.forEach(link => {
            const hash = new URL(link.href, window.location.origin).hash.slice(1);
            link.classList.toggle("active", Boolean(current) && hash === current);
        });
    };

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
}