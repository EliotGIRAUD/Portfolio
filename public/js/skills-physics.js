(function () {
  'use strict';

  var GRAVITY = 1850;
  var RESTITUTION = 0.42;
  var FRICTION = 0.88;
  var AIR_DRAG = 0.995;
  var SLEEP_SPEED = 12;
  var SCROLL_IMPULSE = 0.55;
  var MAX_DT = 1 / 30;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
      body.y = -body.h - 12 - i * (body.h + 10);
      body.vx = (Math.random() - 0.5) * 80;
      body.vy = Math.random() * 40;
      body.sleeping = false;
      renderBody(body);
    });
  }

  function renderBody(body) {
    body.el.style.transform = 'translate3d(' + body.x + 'px,' + body.y + 'px,0)';
  }

  function collideWalls(body, world) {
    var bounced = false;

    if (body.x < 0) {
      body.x = 0;
      body.vx = Math.abs(body.vx) * RESTITUTION;
      bounced = true;
    } else if (body.x + body.w > world.width) {
      body.x = world.width - body.w;
      body.vx = -Math.abs(body.vx) * RESTITUTION;
      bounced = true;
    }

    if (body.y < 0) {
      body.y = 0;
      body.vy = Math.abs(body.vy) * RESTITUTION;
      bounced = true;
    } else if (body.y + body.h > world.height) {
      body.y = world.height - body.h;
      body.vy = -Math.abs(body.vy) * RESTITUTION;
      body.vx *= FRICTION;
      bounced = true;
      if (Math.abs(body.vy) < SLEEP_SPEED && Math.abs(body.vx) < SLEEP_SPEED) {
        body.vy = 0;
        body.vx *= 0.7;
      }
    }

    return bounced;
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
      var pushX = overlapX / 2;
      if (a.x < b.x) {
        a.x -= pushX;
        b.x += pushX;
      } else {
        a.x += pushX;
        b.x -= pushX;
      }
      var vxA = a.vx;
      a.vx = b.vx * RESTITUTION;
      b.vx = vxA * RESTITUTION;
    } else {
      var pushY = overlapY / 2;
      if (a.y < b.y) {
        a.y -= pushY;
        b.y += pushY;
      } else {
        a.y += pushY;
        b.y -= pushY;
      }
      var vyA = a.vy;
      a.vy = b.vy * RESTITUTION;
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
      if (
        speed < SLEEP_SPEED &&
        b.y + b.h >= world.height - 1.5
      ) {
        b.sleeping = true;
        b.vx = 0;
        b.vy = 0;
        b.y = world.height - b.h;
      }
      renderBody(b);
    }
  }

  function applyScrollImpulse(worlds, deltaY) {
    if (!deltaY) return;
    var impulseY = Math.max(-420, Math.min(420, deltaY * SCROLL_IMPULSE));
    var impulseX = impulseY * 0.22;

    worlds.forEach(function (world) {
      if (!world.active) return;
      world.bodies.forEach(function (body, index) {
        body.sleeping = false;
        body.vy += impulseY * (0.7 + (index % 3) * 0.12);
        body.vx += impulseX * ((index % 2 === 0 ? 1 : -1) + (Math.random() - 0.5) * 0.4);
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

    function setActive(active) {
      worlds.forEach(function (world) {
        world.active = active;
      });
      if (active && !running) {
        running = true;
        lastTs = 0;
        rafId = window.requestAnimationFrame(tick);
      } else if (!active && running) {
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

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          setActive(entry.isIntersecting);
        });
      },
      { rootMargin: '12% 0px', threshold: 0.05 }
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
        if (Math.abs(delta) < 1) return;
        applyScrollImpulse(worlds, delta);
      });
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
    window.addEventListener('resize', onResize);
  }

  window.PortfolioSkillsPhysics = {
    setup: setupSkillsPhysics
  };
})();
