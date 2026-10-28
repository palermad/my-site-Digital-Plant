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

  var tabsRoot = document.querySelector(".tabs");

  if (tabsRoot) {
    var tabs = Array.prototype.slice.call(tabsRoot.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(tabsRoot.querySelectorAll('[role="tabpanel"]'));

    function activate(tab) {
      tabs.forEach(function (item) {
        var selected = item === tab;
        item.setAttribute("aria-selected", selected ? "true" : "false");
        item.setAttribute("tabindex", selected ? "0" : "-1");
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab);
      });
      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === "ArrowLeft") {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        }
        if (next) {
          event.preventDefault();
          next.focus();
          activate(next);
        }
      });
    });
  }

  var carousel = document.querySelector(".shots");

  if (carousel) {
    var vp = carousel.querySelector(".shots-viewport");
    var shots = Array.prototype.slice.call(carousel.querySelectorAll(".shot"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".shots-dots button"));
    var arrows = Array.prototype.slice.call(carousel.querySelectorAll(".shots-btn"));
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0;

    function syncDots() {
      var width = vp.clientWidth || 1;
      var current = Math.round(vp.scrollLeft / width);
      if (current < 0) { current = 0; }
      if (current > shots.length - 1) { current = shots.length - 1; }
      index = current;
      dots.forEach(function (dot, k) {
        dot.setAttribute("aria-selected", k === index ? "true" : "false");
      });
    }

    function goTo(target) {
      var count = shots.length;
      index = ((target % count) + count) % count;
      var left = vp.scrollLeft + (shots[index].getBoundingClientRect().left - vp.getBoundingClientRect().left);
      if (vp.scrollTo) {
        vp.scrollTo({ left: left, behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        vp.scrollLeft = left;
      }
      syncDots();
    }

    arrows.forEach(function (arrow) {
      arrow.addEventListener("click", function () {
        goTo(index + (Number(arrow.getAttribute("data-dir")) || 1));
      });
    });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
      });
    });

    vp.addEventListener("scroll", function () {
      window.requestAnimationFrame(syncDots);
    }, { passive: true });

    vp.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") { event.preventDefault(); goTo(index + 1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); goTo(index - 1); }
    });

    syncDots();
  }

  var flips = document.querySelectorAll(".flip");

  if (flips.length) {
    Array.prototype.forEach.call(flips, function (card) {
      card.addEventListener("click", function () {
        var on = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", on ? "true" : "false");
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
