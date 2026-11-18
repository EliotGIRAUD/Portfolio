(function () {
  'use strict';

  var GRAVITY = 1650;
  var RESTITUTION = 0.55;
  var FRICTION = 0.86;
  var AIR_DRAG = 0.997;
  var SLEEP_SPEED = 18;
  var SCROLL_LIFT = 4.2;
  var SCROLL_SIDE = 1.15;
  var WHEEL_LIFT = 9.5;
  var MAX_DT = 1 / 30;
  var MAX_SPEED = 1400;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function createWorld(group) {
    var list = group.querySelector('.skill-tags');
    if (!list) return null;

    var items = Array.prototype.slice.call(list.querySelectorAll('li'));
    if (!items.length) return null;

    var bodies = items.map(function (el, index) {
      var rect = el.getBoundingClientRect();
      return {
        el: el,
        w: Math.ceil(Math.max(rect.width, 48)),
        h: Math.ceil(Math.max(rect.height, 28)),
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        sleeping: false,
        index: index
      };
    });

    group.classList.add('is-physics');

    bodies.forEach(function (body) {
      body.el.style.width = body.w + 'px';
      body.el.style.height = body.h + 'px';
      body.el.style.boxSizing = 'border-box';
    });

    return {
      group: group,
      list: list,
      bodies: bodies,
      width: 0,
      height: 0,
      active: false
    };
  }

  function measureWorld(world) {
    var listRect = world.list.getBoundingClientRect();
    world.width = Math.max(listRect.width, 1);
    world.height = Math.max(listRect.height, 1);

    world.bodies.forEach(function (body) {
      body.x = Math.min(Math.max(body.x, 0), Math.max(0, world.width - body.w));
      body.y = Math.min(Math.max(body.y, 0), Math.max(0, world.height - body.h));
      renderBody(body);
    });
  }

  function spawnWorld(world) {
    measureWorld(world);
    world.bodies.forEach(function (body, i) {
      var maxX = Math.max(0, world.width - body.w);
      body.x = Math.random() * maxX;
      body.y = -body.h - 18 - i * (body.h + 14);
      body.vx = (Math.random() - 0.5) * 120;
      body.vy = Math.random() * 60;
      body.sleeping = false;
      renderBody(body);
    });
  }

  function renderBody(body) {
    body.el.style.transform = 'translate3d(' + body.x + 'px,' + body.y + 'px,0)';
  }

  function collideWalls(body, world) {
    if (body.x < 0) {
      body.x = 0;
      body.vx = Math.abs(body.vx) * RESTITUTION;
    } else if (body.x + body.w > world.width) {
      body.x = world.width - body.w;
      body.vx = -Math.abs(body.vx) * RESTITUTION;
    }

    if (body.y < 0) {
      body.y = 0;
      body.vy = Math.abs(body.vy) * RESTITUTION;
    } else if (body.y + body.h > world.height) {
      body.y = world.height - body.h;
      body.vy = -Math.abs(body.vy) * RESTITUTION;
      body.vx *= FRICTION;
      if (Math.abs(body.vy) < SLEEP_SPEED && Math.abs(body.vx) < SLEEP_SPEED) {
        body.vy = 0;
        body.vx *= 0.65;
      }
    }
  }

  function collideBodies(a, b) {
    var ax2 = a.x + a.w;
    var ay2 = a.y + a.h;
    var bx2 = b.x + b.w;
    var by2 = b.y + b.h;

    if (ax2 <= b.x || bx2 <= a.x || ay2 <= b.y || by2 <= a.y) return;

    var overlapX = Math.min(ax2 - b.x, bx2 - a.x);
    var overlapY = Math.min(ay2 - b.y, by2 - a.y);

    if (overlapX < overlapY) {
      var pushX = overlapX / 2 + 0.1;
      if (a.x < b.x) {
        a.x -= pushX;
        b.x += pushX;
      } else {
        a.x += pushX;
        b.x -= pushX;
      }
      var vxA = a.vx;
      var vxB = b.vx;
      a.vx = vxB * RESTITUTION + (Math.random() - 0.5) * 20;
      b.vx = vxA * RESTITUTION + (Math.random() - 0.5) * 20;
    } else {
      var pushY = overlapY / 2 + 0.1;
      if (a.y < b.y) {
        a.y -= pushY;
        b.y += pushY;
      } else {
        a.y += pushY;
        b.y -= pushY;
      }
      var vyA = a.vy;
      var vyB = b.vy;
      a.vy = vyB * RESTITUTION;
      b.vy = vyA * RESTITUTION;
    }

    a.sleeping = false;
    b.sleeping = false;
  }

  function stepWorld(world, dt) {
    var bodies = world.bodies;
    var i;
    var j;

    for (i = 0; i < bodies.length; i += 1) {
      var body = bodies[i];
      if (!body.sleeping) {
        body.vy += GRAVITY * dt;
        body.vx *= AIR_DRAG;
        body.vy *= AIR_DRAG;
        body.vx = clamp(body.vx, -MAX_SPEED, MAX_SPEED);
        body.vy = clamp(body.vy, -MAX_SPEED, MAX_SPEED);
        body.x += body.vx * dt;
        body.y += body.vy * dt;
      }
      collideWalls(body, world);
    }

    for (i = 0; i < bodies.length; i += 1) {
      for (j = i + 1; j < bodies.length; j += 1) {
        collideBodies(bodies[i], bodies[j]);
      }
    }

    for (i = 0; i < bodies.length; i += 1) {
      collideWalls(bodies[i], world);
      var b = bodies[i];
      var speed = Math.hypot(b.vx, b.vy);
      if (speed < SLEEP_SPEED && b.y + b.h >= world.height - 1.5) {
        b.sleeping = true;
        b.vx = 0;
        b.vy = 0;
        b.y = world.height - b.h;
      }
      renderBody(b);
    }
  }

  function wakeAndLift(worlds, lift, sideBias) {
    if (!lift) return;

    worlds.forEach(function (world) {
      if (!world.active) return;
      world.bodies.forEach(function (body, index) {
        var jitter = 0.75 + (index % 5) * 0.08 + Math.random() * 0.2;
        body.sleeping = false;
        // Remonte contre la gravité (y diminue)
        body.vy -= lift * jitter;
        body.vx += sideBias * ((index % 2 === 0 ? 1 : -1) * 0.85 + (Math.random() - 0.5)) * SCROLL_SIDE;
        body.vx = clamp(body.vx, -MAX_SPEED, MAX_SPEED);
        body.vy = clamp(body.vy, -MAX_SPEED, MAX_SPEED);
      });
    });
  }

  function setupSkillsPhysics() {
    if (prefersReducedMotion()) return;

    var section = document.getElementById('competences');
    if (!section) return;

    var groups = Array.prototype.slice.call(section.querySelectorAll('.skill-group'));
    if (!groups.length) return;

    var worlds = groups.map(createWorld).filter(Boolean);
    if (!worlds.length) return;

    worlds.forEach(spawnWorld);

    var running = false;
    var rafId = 0;
    var lastTs = 0;
    var lastScrollY = window.scrollY || window.pageYOffset;
    var scrollQueued = false;

    function ensureRunning() {
      if (!running) {
        running = true;
        lastTs = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function setActive(active) {
      worlds.forEach(function (world) {
        world.active = active;
      });
      if (active) {
        ensureRunning();
      } else if (running) {
        running = false;
        window.cancelAnimationFrame(rafId);
      }
    }

    function tick(ts) {
      if (!running) return;
      if (!lastTs) lastTs = ts;
      var dt = Math.min(MAX_DT, (ts - lastTs) / 1000);
      lastTs = ts;

      worlds.forEach(function (world) {
        if (world.active) stepWorld(world, dt);
      });

      rafId = window.requestAnimationFrame(tick);
    }

    function replay() {
      worlds.forEach(function (world) {
        world.active = true;
        spawnWorld(world);
      });
      ensureRunning();
    }

    var replayBtn = section.querySelector('[data-skills-replay]');
    if (replayBtn) {
      replayBtn.hidden = false;
      replayBtn.addEventListener('click', function () {
        replay();
      });
    }

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          setActive(entry.isIntersecting);
        });
      },
      { rootMargin: '16% 0px', threshold: 0.04 }
    );
    sectionObserver.observe(section);

    function onScroll() {
      if (scrollQueued) return;
      scrollQueued = true;
      window.requestAnimationFrame(function () {
        scrollQueued = false;
        var y = window.scrollY || window.pageYOffset;
        var delta = y - lastScrollY;
        lastScrollY = y;
        if (Math.abs(delta) < 0.5) return;

        // Toute vitesse de scroll soulève les tags ; le sens influence le côté
        var lift = Math.min(780, Math.abs(delta) * SCROLL_LIFT);
        var side = delta > 0 ? 1 : -1;
        wakeAndLift(worlds, lift, side * Math.min(220, Math.abs(delta) * 2.4));
      });
    }

    function onWheel(event) {
      var rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      var lift = Math.min(920, Math.abs(event.deltaY) * WHEEL_LIFT);
      var side = event.deltaY > 0 ? 1 : -1;
      wakeAndLift(worlds, lift, side * Math.min(260, Math.abs(event.deltaY) * 1.8));
    }

    var resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        worlds.forEach(function (world) {
          measureWorld(world);
          world.bodies.forEach(function (body) {
            body.sleeping = false;
          });
        });
      }, 120);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('resize', onResize);

    window.PortfolioSkillsPhysics.replay = replay;
  }

  window.PortfolioSkillsPhysics = {
    setup: setupSkillsPhysics,
    replay: function () {}
  };
})();
