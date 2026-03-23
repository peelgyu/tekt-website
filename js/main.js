// ===== 헤더 스크롤 효과 =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== 모바일 메뉴 =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

hamburger.addEventListener('click', () => {
  const isActive = hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
  document.body.style.overflow = isActive ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ===== 스크롤 애니메이션 (Intersection Observer) =====
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(el => observer.observe(el));

// 히어로 요소는 즉시 활성화 (페이지 로드 시)
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('active');
  });
});

// ===== 부드러운 스크롤 (네비게이션) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});
