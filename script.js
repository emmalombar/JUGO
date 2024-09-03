//preload
window.addEventListener("load", function () {
  document.getElementById("preloader").style.display = "none";
});

//Reinicio scroll
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Script para manejar la nav y animaciones
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const contents = document.querySelectorAll(".contents");

  navItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      // Elimina 'show' de todas las secciones y 'active' de todos los items del menú
      contents.forEach((content) => {
        content.classList.remove("show");
        // Resetea la animación al quitar la clase 'show'
        const animatedTexts = content.querySelectorAll(".animado-h2");
        const animatedParagraphs = content.querySelectorAll(".animado-p");
        const animatedImages = content.querySelectorAll(".animado-img");
        animatedTexts.forEach((text) => text.classList.remove("visible-h2"));
        animatedParagraphs.forEach((paragraph) =>
          paragraph.classList.remove("visible-p")
        );
        animatedImages.forEach((image) =>
          image.classList.remove("visible-img")
        );
      });
      navItems.forEach((item) => item.classList.remove("active"));

      // Obtiene la sección correspondiente y subraya el item del menú correspondiente
      const sectionId = item.getAttribute("data-section");
      const section = document.getElementById(sectionId + "-section");

      if (section) {
        section.classList.add("show");
        item.classList.add("active");

        // Verifica y anima los textos y párrafos visibles en la sección
        animateTextInSection(section);
      }
    });
  });

  // Selecciona la primera sección por defecto
  document.querySelector('.nav-item[data-section="inicio"]').click();
});

// Función para animar los textos y párrafos en la sección visible
function animateTextInSection(section) {
  const animatedTexts = section.querySelectorAll(".animado-h2");
  const animatedParagraphs = section.querySelectorAll(".animado-p");
  const animatedImages = section.querySelectorAll(".animado-img");

  animatedTexts.forEach((text) => {
    if (isInViewport(text)) {
      text.classList.add("visible-h2");
    }
  });

  animatedParagraphs.forEach((paragraph) => {
    if (isInViewport(paragraph)) {
      paragraph.classList.add("visible-p");
    }
  });

  animatedImages.forEach((image) => {
    if (isInViewport(image)) {
      image.classList.add("visible-img");
    }
  });
}

// Verificar si un elemento está en la vista
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight && rect.bottom >= 0;
}

// Animar textos y párrafos al hacer scroll
document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".contents.show");

  sections.forEach((section) => {
    animateTextInSection(section);
  });
});

// Anima textos y párrafos visibles en la carga inicial
window.addEventListener("load", function () {
  const sections = document.querySelectorAll(".contents.show");

  sections.forEach((section) => {
    animateTextInSection(section);
  });
});
