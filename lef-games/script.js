// ============ LANGUAGE SWITCHER ============
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentLangEl = document.getElementById('currentLang');
const footerLangEl = document.getElementById('footerLang');

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  const label = lang === 'de' ? 'Deutsch' : 'English';
  if (currentLangEl) currentLangEl.textContent = label;
  if (footerLangEl) footerLangEl.textContent = label;
  localStorage.setItem('lefLang', lang);
}

langBtn.addEventListener('click', e => {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', langDropdown.classList.contains('open'));
});
langDropdown.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    applyLanguage(li.dataset.lang);
    langDropdown.classList.remove('open');
  });
});
document.addEventListener('click', () => langDropdown.classList.remove('open'));

applyLanguage(localStorage.getItem('lefLang') || 'en');

// ============ MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
hamburger.addEventListener('click', () => navMobile.classList.toggle('open'));
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMobile.classList.remove('open')));

// ============ REVEAL ON SCROLL ============
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ COUNTERS ============
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.max(1, target / 60);
    const t = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(t); }
      else el.textContent = Math.floor(current);
    }, 25);
    countObserver.unobserve(el);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.counter').forEach(el => countObserver.observe(el));

// ============ FAQ ============
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
});

// ============ TESTIMONIAL CAROUSEL (mobile scroll) ============
const track = document.getElementById('testTrack');
document.getElementById('prevTest').addEventListener('click', () => track.scrollBy({ left: -320, behavior: 'smooth' }));
document.getElementById('nextTest').addEventListener('click', () => track.scrollBy({ left: 320, behavior: 'smooth' }));

// ============ HEADER SHADOW ON SCROLL ============
window.addEventListener('scroll', () => {
  document.getElementById('header').style.boxShadow = window.scrollY > 20
    ? '0 6px 24px rgba(0,0,0,.08)' : '0 2px 20px rgba(0,0,0,.05)';
});
