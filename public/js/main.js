(function () {
  'use strict';

  function setupNav() {
    var toggle = document.querySelector('.nav-toggle');
    var panel = document.getElementById('nav-panel');
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      var openLabel = window.PortfolioI18n ? window.PortfolioI18n.t('nav.open') : 'Ouvrir le menu';
      var closeLabel = window.PortfolioI18n ? window.PortfolioI18n.t('nav.close') : 'Fermer le menu';
      toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
      document.body.classList.toggle('nav-open', open);
      if (open) {
        var first = panel.querySelector('a');
        if (first) first.focus();
      } else {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!panel.classList.contains('is-open'));
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) {
        setOpen(false);
      }
    });
  }

  function setupReveal() {
    var nodes = document.querySelectorAll('[data-reveal]');
    if (!nodes.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (node) {
        node.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    nodes.forEach(function (node) {
      node.classList.add('reveal');
      observer.observe(node);
    });
  }

  function setupLightbox() {
    var existing = document.getElementById('lightbox');
    if (existing) return existing;

    var dialog = document.createElement('div');
    dialog.id = 'lightbox';
    dialog.className = 'lightbox';
    dialog.hidden = true;
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    function i18nText(key, fallback) {
      return window.PortfolioI18n ? window.PortfolioI18n.t(key) : fallback;
    }

    dialog.setAttribute('aria-label', i18nText('lightbox.label', 'Aperçu agrandi'));
    dialog.innerHTML =
      '<button type="button" class="lightbox__close" aria-label="">&times;</button>' +
      '<figure class="lightbox__figure">' +
      '<img class="lightbox__img" alt="">' +
      '<figcaption class="lightbox__caption"></figcaption>' +
      '</figure>';
    document.body.appendChild(dialog);

    var img = dialog.querySelector('.lightbox__img');
    var caption = dialog.querySelector('.lightbox__caption');
    var closeBtn = dialog.querySelector('.lightbox__close');
    var lastFocus = null;

    function syncLightboxCopy() {
      dialog.setAttribute('aria-label', i18nText('lightbox.label', 'Aperçu agrandi'));
      closeBtn.setAttribute('aria-label', i18nText('lightbox.close', "Fermer l'aperçu"));
    }

    function close() {
      dialog.hidden = true;
      dialog.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    function open(src, label) {
      lastFocus = document.activeElement;
      syncLightboxCopy();
      img.src = src;
      img.alt = label || i18nText('lightbox.label', 'Aperçu projet');
      caption.textContent = label || '';
      dialog.hidden = false;
      dialog.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    syncLightboxCopy();
    document.addEventListener('portfolio:langchange', syncLightboxCopy);

    closeBtn.addEventListener('click', close);
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) close();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !dialog.hidden) close();
    });

    dialog._open = open;
    dialog._close = close;
    return dialog;
  }

  function setupMarquees() {
    var roots = document.querySelectorAll('[data-marquee]');
    if (!roots.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lightbox = setupLightbox();

    roots.forEach(function (root) {
      var track = root.querySelector('[data-marquee-track]');
      if (!track || !track.children.length) return;

      var originals = Array.prototype.slice.call(track.children);
      originals.forEach(function (node) {
        var clone = node.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });

      function refreshItemAria() {
        var enlarge = window.PortfolioI18n
          ? window.PortfolioI18n.t('marquee.enlarge')
          : 'Agrandir';
        Array.prototype.forEach.call(track.querySelectorAll('.marquee__item'), function (item) {
          item.setAttribute('role', 'button');
          item.setAttribute('tabindex', '0');
          var label = (item.querySelector('figcaption') || {}).textContent || '';
          item.setAttribute('aria-label', enlarge + ' : ' + label.trim());
        });
      }

      refreshItemAria();
      document.addEventListener('portfolio:langchange', refreshItemAria);

      var offset = 0;
      var baseSpeed = 0.45;
      var velocity = 0;
      var dragging = false;
      var didDrag = false;
      var lastX = 0;
      var startX = 0;
      var halfWidth = 0;
      var rafId = 0;

      function measure() {
        halfWidth = track.scrollWidth / 2;
      }

      function wrapOffset() {
        if (!halfWidth) return;
        if (offset <= -halfWidth) offset += halfWidth;
        if (offset > 0) offset -= halfWidth;
      }

      function render() {
        track.style.transform = 'translate3d(' + offset + 'px, 0, 0)';
      }

      function tick() {
        if (!dragging) {
          if (Math.abs(velocity) > 0.05) {
            offset += velocity;
            velocity *= 0.94;
          } else if (!reduced) {
            offset -= baseSpeed;
            velocity = 0;
          }
          wrapOffset();
          render();
        }
        rafId = window.requestAnimationFrame(tick);
      }

      function onPointerDown(event) {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        dragging = true;
        didDrag = false;
        velocity = 0;
        lastX = event.clientX;
        startX = event.clientX;
        root.classList.add('is-dragging');
        track.setPointerCapture(event.pointerId);
      }

      function onPointerMove(event) {
        if (!dragging) return;
        var dx = event.clientX - lastX;
        lastX = event.clientX;
        if (Math.abs(event.clientX - startX) > 8) didDrag = true;
        offset += dx;
        velocity = dx;
        wrapOffset();
        render();
      }

      function onPointerUp(event) {
        if (!dragging) return;
        dragging = false;
        root.classList.remove('is-dragging');
        try {
          track.releasePointerCapture(event.pointerId);
        } catch (_err) {
          /* ignore */
        }
      }

      function openFromItem(item) {
        if (!item || didDrag) return;
        var image = item.querySelector('img');
        var cap = item.querySelector('figcaption');
        if (!image || !image.src) return;
        lightbox._open(image.currentSrc || image.src, (cap && cap.textContent) || '');
      }

      track.addEventListener('click', function (event) {
        var item = event.target.closest('.marquee__item');
        openFromItem(item);
      });

      track.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var item = event.target.closest('.marquee__item');
        if (!item) return;
        event.preventDefault();
        didDrag = false;
        openFromItem(item);
      });

      measure();
      render();
      window.addEventListener('resize', measure);
      track.addEventListener('pointerdown', onPointerDown);
      track.addEventListener('pointermove', onPointerMove);
      track.addEventListener('pointerup', onPointerUp);
      track.addEventListener('pointercancel', onPointerUp);
      rafId = window.requestAnimationFrame(tick);

      root.addEventListener(
        'remove',
        function () {
          window.cancelAnimationFrame(rafId);
          window.removeEventListener('resize', measure);
        },
        { once: true }
      );
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupNav();
    setupReveal();
    setupMarquees();
  });
})();
