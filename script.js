/* ==========================================================================
   HV MÍDIA — SCRIPT.JS
   ==========================================================================
   Plain vanilla JavaScript, no dependencies, no build step.
   Sections:
     1. Footer year
     2. Nav: scroll background + mobile menu toggle
     3. Portfolio tabs (Photography / Filmmaking)
     4. Reveal-on-scroll animations
     5. Video cards: hover-to-play (desktop) / tap-to-play (mobile)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     1. FOOTER YEAR — keeps the copyright year always current.
     ------------------------------------------------------------------------ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     2. NAV — adds a background once the page is scrolled, and controls the
        mobile hamburger menu open/close state.
     ------------------------------------------------------------------------ */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  function onScroll() {
    if (window.scrollY > 24) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close the mobile menu whenever a nav link is tapped */
    document.querySelectorAll('.nav__links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. PORTFOLIO TABS — switches between the Photography grid and the
        Filmmaking grid. Add more tabs by adding a .tabs__btn with a
        matching data-tab value and a grid with that id, e.g. "grid-photo".
     ------------------------------------------------------------------------ */
  var tabButtons = document.querySelectorAll('.tabs__btn');
  var grids = {
    photo: document.getElementById('grid-photo'),
    film: document.getElementById('grid-film')
  };

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');

      tabButtons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });

      Object.keys(grids).forEach(function (key) {
        if (!grids[key]) return;
        if (key === target) {
          grids[key].removeAttribute('hidden');
        } else {
          grids[key].setAttribute('hidden', '');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     4. REVEAL-ON-SCROLL — fades + lifts any element with the `.reveal`
        class into view once it enters the viewport. Uses IntersectionObserver
        for performance (no scroll-event math).
     ------------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback for very old browsers: just show everything */
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------------
     5. VIDEO CARDS — premium hover-to-preview behaviour.
        Desktop: mouseenter fades the thumbnail into the video and plays it;
                 mouseleave pauses it and resets back to the thumbnail.
        Mobile:  tapping a card plays its preview; tapping anywhere else
                 (or another card) stops it. Cards are also opened/closed
                 via keyboard (Enter/Space) for accessibility.
     ------------------------------------------------------------------------ */
  var videoCards = document.querySelectorAll('.card--video');

  function playCard(card) {
    var video = card.querySelector('.card__video');
    if (!video) return;
    card.classList.add('is-active');
    /* play() returns a promise that can reject if the browser blocks
       autoplay — we catch it silently so it never throws console errors */
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function () { /* autoplay blocked, ignore */ });
    }
  }

  function stopCard(card) {
    var video = card.querySelector('.card__video');
    card.classList.remove('is-active');
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  var isTouchDevice = window.matchMedia('(hover: none)').matches;

  videoCards.forEach(function (card) {
    if (!isTouchDevice) {
      /* --- Desktop: hover in/out --- */
      card.addEventListener('mouseenter', function () { playCard(card); });
      card.addEventListener('mouseleave', function () { stopCard(card); });
      card.addEventListener('focus', function () { playCard(card); });
      card.addEventListener('blur', function () { stopCard(card); });
    } else {
      /* --- Mobile: tap to toggle preview, tapping outside stops it --- */
      card.addEventListener('click', function (e) {
        var alreadyActive = card.classList.contains('is-active');
        /* stop every other card first so only one preview plays at a time */
        videoCards.forEach(stopCard);
        if (!alreadyActive) {
          playCard(card);
          e.preventDefault(); // first tap previews, second tap follows link/behaviour
        }
      });
    }
  });

  /* Tapping outside any video card (mobile) stops all active previews */
  document.addEventListener('click', function (e) {
    if (!isTouchDevice) return;
    var tappedInsideCard = e.target.closest('.card--video');
    if (!tappedInsideCard) {
      videoCards.forEach(stopCard);
    }
  });

});
