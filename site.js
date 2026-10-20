// Shared bits for both pages: intro, nav, reveal and scroll motion.
document.body.classList.remove('no-js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* intro: the Signmeilia mark is signed once per visit, then the sheet lifts */
(() => {
  const intro = document.getElementById('loader');
  if (!intro) return;
  let seen = false;
  try { seen = sessionStorage.getItem('ea-intro') === '1'; } catch (e) {}
  if (seen || reduceMotion) { intro.remove(); return; }
  document.documentElement.style.overflow = 'hidden';
  setTimeout(() => {
    intro.classList.add('done');
    document.documentElement.style.overflow = '';
    try { sessionStorage.setItem('ea-intro', '1'); } catch (e) {}
    setTimeout(() => intro.remove(), 1000);
  }, 2100);
})();

/* nav: full bar at the top, a centred pill once the page scrolls */
(() => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('is-pill', scrollY > 60);
  addEventListener('scroll', update, { passive: true });
  update();
})();

/* headings rise word by word: wrap each word in a mask */
(() => {
  if (reduceMotion) return;
  const targets = document.querySelectorAll('.center-head h2, .meet h2, .mix-title, .receipt-side h2, .endcard h2, .p-top h1');
  targets.forEach(h => {
    let i = 0;
    const wrap = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            w.innerHTML = `<span style="--d:${i++ * 60}ms">${part}</span>`;
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          wrap(n);
        }
      });
    };
    wrap(h);
    h.classList.remove('rv');
    h.classList.add('split');
  });
})();

/* reveal, staggered within a group */
(() => {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: .12 });
  document.querySelectorAll('[data-stagger]').forEach(g =>
    [...g.querySelectorAll('.rv')].forEach((el, i) => { el.style.transitionDelay = (i * 70) + 'ms'; }));
  window.observeReveal = el => io.observe(el);
  document.querySelectorAll('.rv, .split').forEach(el => io.observe(el));
})();

/* scroll-linked motion: progress bar, hero copy drift, portrait parallax, CTA growing in */
(() => {
  const bar = document.createElement('div');
  bar.className = 'scroll-bar';
  document.body.appendChild(bar);
  if (reduceMotion) return;

  const heroCopy = document.querySelector('.orbit__copy');
  const portrait = document.querySelector('.portrait img');
  const vision = null;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  let ticking = false;

  const frame = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    if (heroCopy && scrollY < innerHeight) {
      const p = scrollY / innerHeight;
      heroCopy.style.transform = `translate(-50%, calc(-50% + ${p * 120}px))`;
      heroCopy.style.opacity = (1 - p * 1.4).toFixed(3);
    }
    if (portrait) {
      const r = portrait.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        portrait.style.transform = `scale(1.12) translateY(${p * -40}px)`;
      }
    }
    if (vision) {
      const r = vision.getBoundingClientRect();
      const p = clamp((innerHeight - r.top) / (innerHeight * .7), 0, 1);
      vision.style.transform = `scale(${(0.9 + p * 0.1).toFixed(4)})`;
      vision.style.borderRadius = `${48 - p * 24}px`;
    }
    parallax();
  };

  /* parallax: anything with data-speed drifts against the scroll by its own amount.
     Positive speeds lag behind (feel far away), negative ones rush ahead (feel close). */
  const layers = () => [...document.querySelectorAll('[data-speed]')];
  let nodes = layers();
  const parallax = () => {
    const on = innerWidth >= 860;
    nodes.forEach(el => {
      if (!on) { el.style.setProperty('--py', '0px'); return; }
      const py = parseFloat(el.style.getPropertyValue('--py')) || 0;
      const r = el.getBoundingClientRect();
      const top = r.top - py;                       // where it would sit without parallax
      if (top > innerHeight * 1.4 || top + r.height < -innerHeight * .4) return;
      const fromCentre = top + r.height / 2 - innerHeight / 2;
      const speed = parseFloat(el.dataset.speed) || 0;
      el.style.setProperty('--py', clamp(fromCentre * speed, -80, 80).toFixed(1) + 'px');
    });
  };
  // pages add layers after load (folders, skills); pick them up once things settle
  addEventListener('load', () => { nodes = layers(); frame(); });
  setTimeout(() => { nodes = layers(); frame(); }, 600);
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame);
  frame();
})();
