//preload
document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});


// Reajuste del scroll
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Script para manejar la nav y animaciones
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const contents = document.querySelectorAll(".contents");
  const contentContainer = document.querySelector(".content-container");

  navItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      // Elimina 'show' de todas las secciones y 'active' de todos los items del menú
      contents.forEach((content) => {
        content.classList.remove("show");
        resetAnimations(content);
      });
      navItems.forEach((item) => item.classList.remove("active"));

      // Obtiene la sección correspondiente y subraya el item del menú correspondiente
      const sectionId = item.getAttribute("data-section");
      const section = document.getElementById(sectionId + "-section");

      if (section) {
        section.classList.add("show");
        item.classList.add("active");

        // Ajusta el tamaño del contenedor según la sección activa
        adjustContentContainerSize(section);


                // Desplaza la ventana para que la sección esté en la parte superior
                window.scrollTo({
                  top: section.offsetTop,
                  behavior: 'smooth' // Opcional, para un desplazamiento suave
                });
                
        // Verifica y anima los textos y párrafos visibles en la sección
        animateTextInSection(section);
      }
    });
  });

  // Añade un evento al logo para que también haga clic en el botón de inicio
  const logo = document.getElementById("logojugo");
  if (logo) {
    logo.addEventListener("click", function (event) {
      event.preventDefault();
      const inicioNavItem = document.querySelector(
        '.nav-item[data-section="inicio"]'
      );
      if (inicioNavItem) {
        inicioNavItem.click(); // Simula un clic en el item de la navbar
      }
    });
  }

  // Selecciona la primera sección por defecto
  document.querySelector('.nav-item[data-section="inicio"]').click();
});

// Función para reiniciar animaciones
function resetAnimations(content) {
  const animatedTexts = content.querySelectorAll(".animado-h2");
  const animatedParagraphs = content.querySelectorAll(".animado-p");
  const animatedImages = content.querySelectorAll(".animado-img");

  animatedTexts.forEach((text) => text.classList.remove("visible-h2"));
  animatedParagraphs.forEach((paragraph) =>
    paragraph.classList.remove("visible-p")
  );
  animatedImages.forEach((image) => image.classList.remove("visible-img"));
}

// Ajustar el tamaño del contenedor según la sección activa
function adjustContentContainerSize(section) {
  const sectionHeight = section.scrollHeight;
  document.querySelector(
    ".content-container"
  ).style.height = `${sectionHeight}px`;
}

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

//Cosas para el mail
$("#form").on("submit", function (event) {
  event.preventDefault(); // prevent reload

  var formData = new FormData(this);
  formData.append("service_id", "service_01");
  formData.append("template_id", "template_scofvoc");
  formData.append("user_id", "IeqgYoMgXz0AUW-pJ");

  $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
    type: "POST",
    data: formData,
    contentType: false, // auto-detection
    processData: false, // no need to parse formData to string
  })
    .done(function () {
      alert("Tu mensaje fue enviado, nos contactaremos en breve.");
    })
    .fail(function (error) {
      alert("Oops... " + JSON.stringify(error));
    });
});

/*-------------------------------------------------------------------------------*/
//NAVBAR responsive
document.querySelector(".menu-icon").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("nav-active");
});

// Cerrar el menú cuando se selecciona una opción
document.querySelectorAll(".menu li").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".menu").classList.remove("nav-active");
  });
});
