/* ============================================================
   📁 script.js — كل الجافاسكريبت جوه
   ============================================================ */

/* ================================================================
   ⚙️ إعدادات رئيسية — عدّلها فقط هنا
   ================================================================ */
const CONFIG = {

  // =============================================
  // 📛 اسم الخطيبة — غيّره هنا
  // =============================================
  fiancéeName: "[  حبيبة قلب أحمد]",

  // =============================================
  // 🎂 تاريخ عيد ميلادها — غيّره هنا
  // =============================================
  // الشهور تبدأ من 0: 0=يناير, 1=فبراير, 2=مارس, 3=أبريل, 4=مايو, 5=يونيو
  //                             6=يوليو, 7=أغسطس, 8=سبتمبر, 9=أكتوبر, 10=نوفمبر, 11=ديسمبر
  //
  // مثال: 15 يونيو 1999  =>  [1999, 5, 15]
  // مثال: 3 ديسمبر 2000 =>  [2000, 11, 3]
  // =============================================
  birthday: [2005, 6, 14],

  // =============================================
  // 💑 تاريخ بداية العلاقة — غيّره هنا
  // =============================================
  // مثال: 1 يناير 2023  =>  [2023, 0, 1]
  // =============================================
  relationshipStart: [2021, 0, 1],

  // =============================================
  // 🎬 اسم ملف الفيديو المحلي — غيّره هنا
  // =============================================
  // ضع ملف الفيديو جنب ملفات الموقع في نفس فولدر المشروع
  // وغيّر اسم الملف هنا. الصيغ المدعومة: mp4, webm
  //
  // مثال: "video.mp4"  أو  "videos/birthday.mp4"
  // =============================================
  localVideoPath: "video.mp4",
};

/* ================================================================
   UPDATE PAGE TITLE & LOGO WITH NAME
   ================================================================ */
document.title = `عيد ميلاد ${CONFIG.fiancéeName} 🌸`;
const navLogo = document.querySelector('.nav-logo');
if (navLogo) navLogo.textContent = `💗 ${CONFIG.fiancéeName}`;

/* ================================================================
   TYPEWRITER EFFECT
   ================================================================ */
const phrases = [
  `أنتِ أجمل ما في حياتي يا ${CONFIG.fiancéeName} 💕`,
  "كل يوم أحبكِ أكثر 🌹",
  "أنتِ نور عيني ✨",
  "ملكة قلبي للأبد 👑",
  "معكِ الدنيا أجمل 🌸",
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(typeWriter, 2000); return; }
  } else {
    typeEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(typeWriter, deleting ? 60 : 100);
}
setTimeout(typeWriter, 3500);

/* ================================================================
   BIRTHDAY COUNTDOWN
   ================================================================ */
function updateBirthdayCountdown() {
  const now = new Date();
  let next = new Date(now.getFullYear(), CONFIG.birthday[1], CONFIG.birthday[2]);
  if (next <= now) next.setFullYear(next.getFullYear() + 1);

  const today = new Date(now.getFullYear(), CONFIG.birthday[1], CONFIG.birthday[2]);
  const isToday = today.toDateString() === now.toDateString();

  if (isToday) {
    document.getElementById('cnt-days').textContent = '🎂';
    document.getElementById('cnt-hours').textContent = '🎉';
    document.getElementById('cnt-mins').textContent = '🎊';
    document.getElementById('cnt-secs').textContent = '💖';
    document.getElementById('cnt-label').textContent = 'عيد ميلادك اليوم!';
    document.getElementById('cnt-label-wrap').querySelector('.hero-counter-label').textContent = '';
    return;
  }

  const diff = next - now;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  document.getElementById('cnt-days').textContent = days;
  document.getElementById('cnt-hours').textContent = hours;
  document.getElementById('cnt-mins').textContent = mins;
  document.getElementById('cnt-secs').textContent = secs;
}
updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);

/* ================================================================
   LIVE RELATIONSHIP COUNTER
   ================================================================ */
function updateLiveCounter() {
  const start = new Date(...CONFIG.relationshipStart);
  const diff = Date.now() - start.getTime();
  const secs = Math.floor(diff / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  document.getElementById('live-days').textContent = days.toLocaleString('ar-EG');
  document.getElementById('live-hours').textContent = hours.toLocaleString('ar-EG');
  document.getElementById('live-mins').textContent = mins.toLocaleString('ar-EG');
  document.getElementById('live-secs').textContent = secs.toLocaleString('ar-EG');
}
updateLiveCounter();
setInterval(updateLiveCounter, 1000);

/* ================================================================
   LOCAL VIDEO PLAYER (ملف من اللاب)
   ================================================================ */
function loadVideo() {
  const placeholder = document.getElementById('video-placeholder');
  const videoPlayer = document.getElementById('video-player');

  if (!videoPlayer) {
    alert('⚠️ تأكد إن ملف الفيديو موجود باسم ' + CONFIG.localVideoPath + ' جنب ملفات الموقع');
    return;
  }

  // إخفاء الـ placeholder وإظهار الفيديو
  placeholder.style.display = 'none';
  videoPlayer.style.display = 'block';
  videoPlayer.src = CONFIG.localVideoPath;
  videoPlayer.play().catch(() => {
    alert('⚠️ تأكد إن ملف الفيديو موجود في نفس فولدر الموقع باسم: ' + CONFIG.localVideoPath);
  });
}

/* ================================================================
   LIGHTBOX
   ================================================================ */
function openLightbox(card) {
  const caption = card.dataset.caption || '';
  const bg = document.getElementById('lightbox-bg');

  // if there's a real image, use it
  const img = card.querySelector('img');
  if (img) {
    bg.style.display = 'none';
    const lbImg = document.getElementById('lightbox-img');
    lbImg.style.display = 'block';
    lbImg.src = img.src;
  } else {
    // clone placeholder gradient
    const placeholder = card.querySelector('.gallery-placeholder');
    if (placeholder) bg.style.background = placeholder.style.background;
    bg.style.display = 'flex';
    document.getElementById('lightbox-img').style.display = 'none';
  }
  document.getElementById('lightbox-caption').textContent = caption;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ================================================================
   PARTICLES (floating hearts & stars)
   ================================================================ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

const EMOJIS = ['💗', '💕', '✨', '🌸', '⭐', '💖', '🌹', '💝'];
const particles = [];
const PARTICLE_COUNT = 28;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 10 + Math.random() * 18,
    speed: 0.4 + Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 0.5,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    opacity: 0.3 + Math.random() * 0.5,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.02,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.y -= p.speed;
    p.x += p.drift;
    p.rotation += p.rotSpeed;
    if (p.y < -50) { p.y = H + 50; p.x = Math.random() * W; }
    if (p.x < -50) p.x = W + 50;
    if (p.x > W + 50) p.x = -50;

    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.font = `${p.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.emoji, 0, 0);
    ctx.restore();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ================================================================
   SCROLL ANIMATIONS
   ================================================================ */
function checkReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) el.classList.add('visible');
  });
}
window.addEventListener('scroll', checkReveal, { passive: true });
checkReveal();

/* ================================================================
   NAVBAR SCROLL
   ================================================================ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ================================================================
   HAMBURGER MENU
   ================================================================ */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});
function closeMenu() { document.getElementById('nav-links').classList.remove('open'); }

/* ================================================================
   CUSTOM CURSOR
   ================================================================ */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

/* ================================================================
   CONFETTI
   ================================================================ */
function launchConfetti() {
  const colors = ['#C8526B', '#D4AF37', '#FFB6C1', '#FFF8F0', '#9B2C44', '#F0D080', '#fff'];
  const shapes = ['♥', '★', '✦', '•', '▲'];
  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = 8 + Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const dur = 2.5 + Math.random() * 3;
    const delay = Math.random() * 2;
    piece.style.cssText = `
      left: ${Math.random() * 100}vw;
      font-size: ${size}px;
      color: ${color};
      opacity: ${0.6 + Math.random() * 0.4};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    piece.textContent = shape;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), (dur + delay + 0.5) * 1000);
  }
}

/* ================================================================
   LOADING SCREEN
   ================================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    setTimeout(launchConfetti, 400);
    checkReveal();
  }, 3000);
});

/* ================================================================
   PARALLAX ON HERO
   ================================================================ */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = (scrolled * 0.4) + 'px';
  }
}, { passive: true });

/* ================================================================
   HOVER EFFECTS ON BUTTONS
   ================================================================ */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1.5)'; });
  btn.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
});
