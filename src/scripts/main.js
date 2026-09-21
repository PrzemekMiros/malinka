import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);
let lenis;
let context;
let ticker;

function configureMotion() {
  context?.revert();
  lenis?.destroy();
  if (ticker) gsap.ticker.remove(ticker);
  lenis = undefined;
  lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -35 }, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  ticker = time => lenis.raf(time * 1000);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
  context = gsap.context(() => {
    gsap.from('.hero-copy > *', { y: 26, opacity: 0, stagger: .085, duration: .8, ease: 'power3.out' });
    gsap.from('.hero-visual', { y: 55, rotation: 7, opacity: 0, duration: 1.2, ease: 'power3.out' });
    gsap.to('.hero-sticker', { rotation: -6, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-doodle', { rotation: 160, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
    gsap.utils.toArray('.reveal').forEach(element => {
      gsap.from(element, { y: 38, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
    });
    gsap.fromTo('.party-poster', { rotation: -8, y: 30 }, { rotation: 5, y: -25, scrollTrigger: { trigger: '.birthday', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    gsap.to('.party-star', { rotation: 100, scrollTrigger: { trigger: '.birthday', start: 'top bottom', end: 'bottom top', scrub: 2 } });
    gsap.fromTo('.loyalty-card', { rotation: 7 }, { rotation: -4, scrollTrigger: { trigger: '.loyalty', start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
    gsap.to('.contact-flower', { rotation: 160, scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 2 } });
  });
  ScrollTrigger.refresh();
}
configureMotion();
document.fonts.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
function closeMenu() { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Otwórz menu'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

const prices = {
  weekday: { values: [19, 25, 38], last: 'Cały dzień', context: 'Wejścia indywidualne · wtorek–czwartek · cena za dziecko', note: 'Po przekroczeniu wybranego czasu: 0,30 zł za każdą kolejną minutę.' },
  weekend: { values: [21, 27, 40], last: 'Cały dzień', context: 'Wejścia indywidualne · piątek–niedziela · cena za dziecko', note: 'Po przekroczeniu wybranego czasu: 0,30 zł za każdą kolejną minutę.' },
  group: { values: [16, 20, 25], last: '3 godziny', context: 'Grupy zorganizowane · wtorek–niedziela · minimum 10 dzieci', note: 'Cena za jedno dziecko. Wizytę grupową ustal z nami telefonicznie: 660 413 072.' }
};
function choosePrices(mode) {
  const selected = prices[mode];
  if (!selected) return;
  document.querySelectorAll('[data-price-mode]').forEach(button => {
    const active = button.dataset.priceMode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  selected.values.forEach((value, index) => { document.querySelector(`[data-price="${index}"]`).textContent = value; });
  document.querySelector('[data-duration="2"]').textContent = selected.last;
  document.querySelector('#price-context').textContent = selected.context;
  document.querySelector('#price-note').textContent = selected.note;
  gsap.fromTo('.price [data-price]', { y: 9, opacity: .3 }, { y: 0, opacity: 1, duration: .35, stagger: .055, overwrite: true });
}
document.querySelectorAll('[data-price-mode]').forEach(button => button.addEventListener('click', () => choosePrices(button.dataset.priceMode)));
document.querySelector('#group-link').addEventListener('click', () => choosePrices('group'));

const canvas = document.querySelector('#confetti');
const ctx = canvas.getContext('2d');
let particles = [];
let frame = 0;
let previous = 0;
function burst(x, y, count = 65) {
  if (!ctx) return;
  const w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;
  const colors = ['#ed3275', '#42bfea', '#f6df56', '#fff9ef'];
  for (let n = 0; n < count && particles.length < 220; n++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 9;
    particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 5, size: 5 + Math.random() * 7, color: colors[n % 4], rotation: Math.random() * 6, spin: (Math.random() - .5) * .3, life: 100 + Math.random() * 35 });
  }
  if (!frame) { previous = performance.now(); frame = requestAnimationFrame(drawConfetti); }
}
function drawConfetti(time) {
  const delta = Math.min((time - previous) / 16.67, 2); previous = time;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 30);
  for (const p of particles) {
    p.x += p.vx * delta; p.y += p.vy * delta; p.vy += .15 * delta; p.vx *= .99; p.rotation += p.spin * delta; p.life -= delta;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.globalAlpha = Math.min(p.life / 25, 1); ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .6); ctx.restore();
  }
  frame = particles.length ? requestAnimationFrame(drawConfetti) : 0;
}
function burstAt(element, count) { const rect = element.getBoundingClientRect(); burst(rect.x + rect.width / 2, rect.y + rect.height / 2, count); }
document.querySelector('#party-button').addEventListener('click', e => { burstAt(e.currentTarget, 100); document.querySelector('.party-feedback').textContent = 'Sto lat i mnóstwo radości!'; });
const mascotButton = document.querySelector('#mascot-play');
let mascotGreetingTimer;
mascotButton.addEventListener('click', e => {
  clearTimeout(mascotGreetingTimer);
  mascotButton.classList.remove('is-playing');
  void mascotButton.offsetWidth;
  mascotButton.classList.add('is-playing');
  mascotButton.setAttribute('aria-pressed', 'true');
  mascotGreetingTimer = window.setTimeout(() => {
    mascotButton.classList.remove('is-playing');
    mascotButton.setAttribute('aria-pressed', 'false');
  }, 1600);
  gsap.killTweensOf('#hero-art');
  gsap.timeline()
    .to('#hero-art', { y: -18, z: 70, rotationY: -18, rotationX: 9, scale: 1.06, duration: .32, ease: 'power2.out' })
    .to('#hero-art', { y: 4, z: 25, rotationY: 14, rotationX: -6, duration: .28, ease: 'power1.inOut' })
    .to('#hero-art', { y: 0, z: 0, rotationY: 0, rotationX: 0, scale: 1, duration: .7, ease: 'elastic.out(1,.45)' });
  burstAt(e.currentTarget, 40);
});

let stamps = 0;
const stampButton = document.querySelector('#stamp-button');
const stampReset = document.querySelector('#stamp-reset');
const stampStatus = document.querySelector('#stamp-status');
stampButton.addEventListener('click', () => {
  if (stamps >= 5) return;
  stamps++;
  const stamp = document.querySelector(`[data-stamp="${stamps}"]`);
  stamp.classList.add('stamped');
  gsap.fromTo(stamp, { scale: 1.3, rotation: -15 }, { scale: 1, rotation: 0, duration: .5, ease: 'back.out(2)' });
  stampReset.hidden = false;
  if (stamps === 5) {
    document.querySelector('.stamp-free').classList.add('unlocked');
    stampButton.disabled = true;
    stampButton.innerHTML = 'Szóste wejście gratis! <span aria-hidden="true">☺</span>';
    stampStatus.textContent = '5 wizyt za Tobą. Szóste wejście dostajesz w prezencie!';
    burstAt(document.querySelector('.stamp-free'), 75);
  } else stampStatus.textContent = `${stamps} z 5 pieczątek. Jeszcze ${5 - stamps} do darmowego wejścia!`;
});
stampReset.addEventListener('click', () => {
  stamps = 0;
  document.querySelectorAll('.stamp').forEach(stamp => stamp.classList.remove('stamped', 'unlocked'));
  stampButton.disabled = false;
  stampButton.innerHTML = 'Przybij pieczątkę <span aria-hidden="true">↗</span>';
  stampStatus.textContent = 'Wypróbuj kartę: przybij 5 pieczątek.';
  stampButton.focus();
  stampReset.hidden = true;
});

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      gsap.to(card, { rotationY: ((event.clientX - rect.x) / rect.width - .5) * 8, rotationX: -((event.clientY - rect.y) / rect.height - .5) * 8, transformPerspective: 900, duration: .5, overwrite: 'auto' });
    });
    card.addEventListener('pointerleave', () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: .7, ease: 'elastic.out(1,.5)' }));
  });
}

// Native anchor navigation and readable content remain available without JavaScript.
document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', () => ScrollTrigger.refresh()));
