//preload
window.addEventListener("load", function () {
  document.getElementById("preloader").style.display = "none";
});

//Reinicio scroll
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Script para manejar la navbar

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const contents = document.querySelectorAll(".contents");

  navItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      // Elimina 'show' de todas las secciones y 'active' de todos los items del menú
      contents.forEach((content) => content.classList.remove("show"));
      navItems.forEach((item) => item.classList.remove("active"));

      // Obtiene la sección correspondiente y subraya el item del menú correspondiente
      const sectionId = item.getAttribute("data-section");
      const section = document.getElementById(sectionId + "-section");

      if (section) {
        section.classList.add("show");
        item.classList.add("active");
      }
    });
  });

  // Opcional: selecciona la primera sección por defecto
  document.querySelector('.nav-item[data-section="inicio"]').click();
});

//animacion texto izq-der
document.addEventListener("scroll", function () {
  const animatedText = document.querySelector(".animado");
  const textPosition = animatedText.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.5;

  if (textPosition < screenPosition) {
    animatedText.classList.add("visible");
  }
});