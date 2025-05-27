function setAnimationDirection(selector = ".animate") {
  const elements = document.querySelectorAll(selector);
  const isMobile = window.innerWidth <= 768;

  elements.forEach((el, index) => {
    el.classList.remove("animate-left", "animate-right", "animate-bottom");

    if (el.classList.contains("fade-left")) {
      el.classList.add("from-left");
    } else if (el.classList.contains("fade-right")) {
      el.classList.add("from-right");
    } else if (el.classList.contains("fade-bottom")) {
      el.classList.add("from-bottom");
    }

    el.classList.add(
      isMobile ? (index % 2 === 0 ? "from-left" : "from-right") : "from-bottom"
    );
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}

window.addEventListener("load", () => {
  setAnimationDirection();
});

window.addEventListener("resize", () => {
  setAnimationDirection();
});

function showMenu() {
  const menu = document.querySelector(".container-dropdown-menu");
  menu.classList.toggle("reveal-menu");
}

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("vwiUFCkOrmXsn8VEA");

  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm('service_5bx4vgb','template_4dsm012', form)
      alert("Message Sent!")
      form.reset();
    } catch (error) {
      alert("Failed to send message: " + error)
    }
  });
});
