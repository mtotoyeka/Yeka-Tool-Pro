
// ============================================
// YEKA TOOL PRO - GLOBAL SCRIPT
// ============================================

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================

    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            navToggle.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.classList.remove("open");
            });
        });
    }


    // ==========================================
    // CURRENT YEAR
    // ==========================================

    const yearElements = document.querySelectorAll("[data-current-year]");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ==========================================
    // DOWNLOAD BUTTON
    // ==========================================

    document.querySelectorAll("[data-download]").forEach(button => {

        button.addEventListener("click", event => {

            const downloadUrl =
                button.getAttribute("data-download");

            if (!downloadUrl || downloadUrl === "#") {

                event.preventDefault();

                alert(
                    "The latest Yeka Tool Pro setup will be available here soon."
                );

                return;
            }

        });

    });


    // ==========================================
    // PASSWORD VISIBILITY
    // ==========================================

    document.querySelectorAll("[data-password-toggle]").forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.getAttribute("data-password-toggle");

            const input =
                document.getElementById(targetId);

            if (!input) {
                return;
            }

            if (input.type === "password") {

                input.type = "text";

                button.textContent = "Hide";

            } else {

                input.type = "password";

                button.textContent = "Show";

            }

        });

    });


    // ==========================================
    // COPY UID / TEXT
    // ==========================================

    document.querySelectorAll("[data-copy]").forEach(button => {

        button.addEventListener("click", async () => {

            const value =
                button.getAttribute("data-copy");

            if (!value) {
                return;
            }

            try {

                await navigator.clipboard.writeText(value);

                const original =
                    button.textContent;

                button.textContent = "Copied!";

                setTimeout(() => {
                    button.textContent = original;
                }, 1500);

            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        });

    });


    // ==========================================
    // WHATSAPP SUPPORT
    // ==========================================

    document.querySelectorAll("[data-whatsapp]").forEach(button => {

        button.addEventListener("click", () => {

            const phone =
                button.getAttribute("data-whatsapp")
                || "255612021997";

            const message =
                button.getAttribute("data-message")
                || "Hello Yeka Tool Pro, I need support.";

            const url =
                "https://wa.me/"
                + phone
                + "?text="
                + encodeURIComponent(message);

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });


    // ==========================================
    // FADE-IN ON SCROLL
    // ==========================================

    const animatedElements =
        document.querySelectorAll(
            ".feature-card, .admin-card, .stat-card, .section-title"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    }


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href.split("/")
                .pop()
                .toLowerCase();

        if (
            linkPage === currentPage
            ||
            (
                currentPage === ""
                && linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

});
