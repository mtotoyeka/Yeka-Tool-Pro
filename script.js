/* =========================================================
   YEKAH TOOL PRO
   GLOBAL JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initMobileMenu();
  initSmoothNavigation();
  initScrollReveal();
  initHeaderScroll();
  initFooterYear();
  initDownloadButtons();
  initModalSystem();
  initThemeToggle();

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navLinks =
    document.querySelector(".nav-links");


  if (!menuToggle || !navLinks) {
    return;
  }


  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

    document.body.classList.toggle(
      "menu-open",
      navLinks.classList.contains("mobile-open")
    );


    const isOpen =
      navLinks.classList.contains("mobile-open");


    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );


    menuToggle.innerHTML =
      isOpen ? "✕" : "☰";

  });


  navLinks
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove(
          "mobile-open"
        );

        document.body.classList.remove(
          "menu-open"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.innerHTML = "☰";

      });

    });

}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

function initSmoothNavigation() {

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


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

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

  const elements =
    document.querySelectorAll(
      ".feature-card, .brand-card, .step, .account-card, .reseller-card, .news-card, .support-box, .download-box"
    );


  if (!elements.length) {
    return;
  }


  elements.forEach(element => {

    element.classList.add("reveal");

  });


  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {

      element.classList.add("visible");

    });

    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "visible"
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function initHeaderScroll() {

  const header =
    document.querySelector(".site-header");


  if (!header) {
    return;
  }


  function updateHeader() {

    if (window.scrollY > 20) {

      header.style.background =
        "rgba(7,7,17,.92)";

      header.style.boxShadow =
        "0 10px 35px rgba(0,0,0,.18)";

    } else {

      header.style.background =
        "rgba(7,7,17,.76)";

      header.style.boxShadow =
        "none";

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

function initFooterYear() {

  const yearElements =
    document.querySelectorAll(
      "#year, #currentYear, [data-current-year]"
    );


  const year =
    new Date().getFullYear();


  yearElements.forEach(element => {

    element.textContent = year;

  });

}


/* =========================================================
   DOWNLOAD BUTTONS
   ========================================================= */

function initDownloadButtons() {

  const buttons =
    document.querySelectorAll(
      "[data-download], #downloadBtn, .download-btn"
    );


  if (!buttons.length) {
    return;
  }


  buttons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        const downloadUrl =
          button.dataset.download;


        /*
          If a real download URL has been
          configured, use it.
        */

        if (
          downloadUrl &&
          downloadUrl !== "#" &&
          downloadUrl !== "coming-soon"
        ) {

          return;

        }


        event.preventDefault();


        showNotification(
          "The latest setup will be available here soon.",
          "info"
        );

      }
    );

  });

}


/* =========================================================
   NOTIFICATION SYSTEM
   ========================================================= */

function showNotification(
  message,
  type = "info"
) {

  let notification =
    document.querySelector(
      ".yekah-notification"
    );


  if (!notification) {

    notification =
      document.createElement("div");

    notification.className =
      "yekah-notification";


    notification.innerHTML = `
      <span class="yekah-notification-icon"></span>
      <span class="yekah-notification-text"></span>
    `;


    document.body.appendChild(
      notification
    );


    const style =
      document.createElement("style");


    style.textContent = `

      .yekah-notification {
        position: fixed;
        left: 50%;
        bottom: 25px;
        z-index: 9999;

        transform:
          translate(-50%, 120px);

        display: flex;
        align-items: center;
        gap: 10px;

        width: min(
          calc(100% - 30px),
          430px
        );

        padding: 13px 16px;

        border:
          1px solid rgba(255,255,255,.1);

        border-radius: 12px;

        background:
          rgba(16,16,29,.96);

        color: #fff;

        box-shadow:
          0 15px 50px rgba(0,0,0,.35);

        backdrop-filter:
          blur(15px);

        font-size: 12px;
        font-weight: 600;

        opacity: 0;

        transition:
          opacity .25s ease,
          transform .25s ease;
      }

      .yekah-notification.show {
        opacity: 1;

        transform:
          translate(-50%, 0);
      }

      .yekah-notification-icon {
        width: 8px;
        height: 8px;

        flex-shrink: 0;

        border-radius: 50%;

        background:
          #00e5ff;

        box-shadow:
          0 0 12px #00e5ff;
      }

      .yekah-notification.success
      .yekah-notification-icon {
        background: #22c55e;
        box-shadow: 0 0 12px #22c55e;
      }

      .yekah-notification.error
      .yekah-notification-icon {
        background: #ef4444;
        box-shadow: 0 0 12px #ef4444;
      }

      .yekah-notification.warning
      .yekah-notification-icon {
        background: #facc15;
        box-shadow: 0 0 12px #facc15;
      }

    `;


    document.head.appendChild(style);

  }


  const text =
    notification.querySelector(
      ".yekah-notification-text"
    );


  text.textContent = message;


  notification.classList.remove(
    "success",
    "error",
    "warning",
    "info",
    "show"
  );


  notification.classList.add(type);


  requestAnimationFrame(() => {

    notification.classList.add("show");

  });


  clearTimeout(
    notification._timeout
  );


  notification._timeout =
    setTimeout(() => {

      notification.classList.remove(
        "show"
      );

    }, 3500);

}


/* =========================================================
   MODAL SYSTEM
   ========================================================= */

function initModalSystem() {

  const modalTriggers =
    document.querySelectorAll(
      "[data-modal-open]"
    );


  const modalClosers =
    document.querySelectorAll(
      "[data-modal-close]"
    );


  modalTriggers.forEach(trigger => {

    trigger.addEventListener(
      "click",
      () => {

        const modalId =
          trigger.dataset.modalOpen;


        const modal =
          document.getElementById(
            modalId
          );


        if (!modal) {
          return;
        }


        modal.classList.add("show");

        document.body.classList.add(
          "menu-open"
        );

      }
    );

  });


  modalClosers.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const modal =
          button.closest(".modal");


        if (!modal) {
          return;
        }


        closeModal(modal);

      }
    );

  });


  document
    .querySelectorAll(".modal")
    .forEach(modal => {

      modal.addEventListener(
        "click",
        event => {

          if (
            event.target === modal
          ) {

            closeModal(modal);

          }

        }
      );

    });


  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }


      document
        .querySelectorAll(
          ".modal.show"
        )
        .forEach(modal => {

          closeModal(modal);

        });

    }
  );

}


function closeModal(modal) {

  modal.classList.remove("show");

  document.body.classList.remove(
    "menu-open"
  );

}


/* =========================================================
   THEME TOGGLE
   ========================================================= */

function initThemeToggle() {

  const themeButtons =
    document.querySelectorAll(
      "[data-theme-toggle], #themeToggle"
    );


  if (!themeButtons.length) {
    return;
  }


  const savedTheme =
    localStorage.getItem(
      "yekah_theme"
    );


  if (
    savedTheme === "light" ||
    savedTheme === "dark"
  ) {

    document.documentElement.dataset.theme =
      savedTheme;

  }


  themeButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const current =
          document.documentElement
            .dataset.theme ||
          "dark";


        const next =
          current === "dark"
            ? "light"
            : "dark";


        document.documentElement
          .dataset.theme = next;


        localStorage.setItem(
          "yekah_theme",
          next
        );


        updateThemeButton(
          button,
          next
        );

      }
    );

  });

}


function updateThemeButton(
  button,
  theme
) {

  if (!button) {
    return;
  }


  button.setAttribute(
    "aria-label",
    theme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"
  );


  const icon =
    button.querySelector(
      "[data-theme-icon]"
    );


  if (icon) {

    icon.textContent =
      theme === "dark"
        ? "☀️"
        : "🌙";

  }

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const links =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );


  if (
    !sections.length ||
    !links.length
  ) {
    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          const id =
            entry.target.id;


          links.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
              `#${id}`
            );

          });

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(section => {

    observer.observe(section);

  });

}


/* =========================================================
   CONTACT / WHATSAPP
   ========================================================= */

function initContactActions() {

  document
    .querySelectorAll(
      "[data-whatsapp]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const number =
            button.dataset.whatsapp ||
            "255612021997";


          const message =
            button.dataset.message ||
            "Hello Yekah Tech, I need support with Yekah Tool Pro.";


          const url =
            `https://wa.me/${number}?text=${encodeURIComponent(message)}`;


          window.open(
            url,
            "_blank",
            "noopener,noreferrer"
          );

        }
      );

    });

}


/* =========================================================
   COPY TO CLIPBOARD
   ========================================================= */

function initCopyButtons() {

  document
    .querySelectorAll(
      "[data-copy]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const value =
            button.dataset.copy;


          if (!value) {
            return;
          }


          try {

            await navigator.clipboard.writeText(
              value
            );


            showNotification(
              "Copied to clipboard.",
              "success"
            );

          } catch {

            showNotification(
              "Unable to copy.",
              "error"
            );

          }

        }
      );

    });

}


/* =========================================================
   INITIALIZE OPTIONAL FEATURES
   ========================================================= */

initActiveNavigation();
initContactActions();
initCopyButtons();


/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

window.YekahToolPro = {

  notify:
    showNotification,

  closeModal:
    closeModal

};
