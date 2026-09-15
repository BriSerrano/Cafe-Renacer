/* =========================================================
   CAFÉ RENACER — js/main.js
   Cargado con <script src="js/main.js" defer>
   ========================================================= */

(function () {
  "use strict";

  var WHATSAPP = "50660073737";

  /* ---------- Pedidos por WhatsApp ---------- */

  var tuesteElegido = "";

  document.querySelectorAll(".tueste-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var yaActivo = btn.classList.contains("is-active");

      document.querySelectorAll(".tueste-btn").forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });

      if (yaActivo) {
        tuesteElegido = "";
      } else {
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        tuesteElegido = btn.dataset.tueste || btn.textContent.trim();
      }
    });
  });

  document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".product-card");
      var producto = btn.dataset.producto || (card && card.querySelector("h3").textContent.trim());

      var texto = "Hola! Quiero pedir café Renacer de " + producto;
      if (tuesteElegido) texto += " en " + tuesteElegido.toLowerCase();

      window.open(
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto),
        "_blank",
        "noopener"
      );
    });
  });

  /* ---------- Carrusel de datos curiosos ---------- */

  var carousel = document.querySelector(".carousel");
  if (!carousel) return;

  var items = carousel.querySelectorAll(".carousel-item");
  var prev = document.querySelector(".carousel-btn.prev");
  var next = document.querySelector(".carousel-btn.next");
  var index = 0;
  var timer = null;

  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function mostrar(i) {
    index = (i + items.length) % items.length;
    carousel.style.transform = "translateX(-" + index * 100 + "%)";

    items.forEach(function (item, n) {
      // evita que el lector de pantalla y el tabulador entren a los slides ocultos
      item.hidden = false;
      item.setAttribute("aria-hidden", n === index ? "false" : "true");
      item.inert = n !== index;
    });
  }

  function arrancar() {
    if (sinMovimiento) return;
    detener();
    timer = window.setInterval(function () {
      mostrar(index + 1);
    }, 15000);
  }

  function detener() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  if (prev) prev.addEventListener("click", function () { mostrar(index - 1); arrancar(); });
  if (next) next.addEventListener("click", function () { mostrar(index + 1); arrancar(); });

  var contenedor = document.querySelector(".carousel-container");
  if (contenedor) {
    contenedor.addEventListener("mouseenter", detener);
    contenedor.addEventListener("mouseleave", arrancar);
    contenedor.addEventListener("focusin", detener);
    contenedor.addEventListener("focusout", arrancar);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) detener();
    else arrancar();
  });

  mostrar(0);
  arrancar();
})();