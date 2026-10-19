(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var chain = document.querySelector(".chain");

  if (chain) {
    var nodes = Array.prototype.slice.call(chain.querySelectorAll(".chain-node"));
    var panelText = document.querySelector(".chain-panel p");
    var panelOut = document.querySelector(".chain-panel .chains-out");

    function select(node) {
      nodes.forEach(function (item) {
        item.setAttribute("aria-pressed", item === node ? "true" : "false");
      });
      if (panelText) {
        panelText.textContent = node.getAttribute("data-desc") || "";
      }
      if (panelOut) {
        panelOut.textContent = node.getAttribute("data-out") || "";
      }
    }

    nodes.forEach(function (node, index) {
      node.addEventListener("click", function () {
        select(node);
      });
      node.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") {
          next = nodes[index + 1] || nodes[0];
        } else if (event.key === "ArrowLeft") {
          next = nodes[index - 1] || nodes[nodes.length - 1];
        }
        if (next) {
          event.preventDefault();
          next.focus();
          select(next);
        }
      });
    });
  }

  var revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
})();
