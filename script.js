/* ═══════════════════════════════════════════════════════════════
   🎂 موقع عيد ميلاد خطيبتك - script.js
   ═══════════════════════════════════════════════════════════════
   
   📌 الإعدادات الرئيسية - عدّل هذه القيم فقط:
   
   1. fiancéeName      → اسم الخطيبة
   2. birthday         → تاريخ ميلادها [سنة, شهر-1, يوم]
   3. relationshipStart → تاريخ بداية العلاقة [سنة, شهر-1, يوم]
   4. youtubeEmbed      → رابط YouTube Embed
   5. localVideo        → مسار الفيديو المحلي (MP4)
   
   ⚠️ ملاحظة مهمة عن التواريخ:
   - الشهر في JavaScript يبدأ من 0!
   - يناير = 0 | فبراير = 1 | مارس = 2 | ...
   - ديسمبر = 11
   
   مثال: 15 يونيو 1999 → [1999, 5, 15]
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  
  // ═══════════════════════════════════════════════════════════
  // ✏️ 1. اسم الخطيبة (يظهر في الـ Navbar)
  // ═══════════════════════════════════════════════════════════
  fiancéeName: "[  حبيبة قلب أحمد]",

  // ═══════════════════════════════════════════════════════════
  // ✏️ 2. تاريخ ميلاد الخطيبة
  // ═══════════════════════════════════════════════════════════
  // ✏️ مثال: 15 يونيو 1999 → [1999, 5, 15]
  // ✏️ غيري الأرقام حسب تاريخ ميلادها
  birthday: [2005, 6, 14],

  // ═══════════════════════════════════════════════════════════
  // ✏️ 3. تاريخ بداية العلاقة (لعداد الأيام معاً)
  // ═══════════════════════════════════════════════════════════
  // ✏️ مثال: 14 فبراير 2023 → [2023, 1, 14]
  // ✏️ غيري الأرقام حسب أول يوم قابلتوه
  relationshipStart: [2021, 1, 1],

  // ═══════════════════════════════════════════════════════════
  // ✏️ 4. رابط فيديو YouTube (Embed)
  // ═══════════════════════════════════════════════════════════
  // ✏️ مثال: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  // ✏️ اتركه فاضي "" لو هستخدم فيديو محلي
  youtubeEmbed: "",

  // ═══════════════════════════════════════════════════════════
  // ✏️ 5. مسار الفيديو المحلي (MP4 من جهازك)
  // ═══════════════════════════════════════════════════════════
  // ✏️ مثال: "video.mp4" أو "videos/birthday.mp4"
  // ✏️ حط الفيديو في نفس فولدر الموقع وعدّل الاسم هنا
  // ✏️ اتركه فاضي "" لو هستخدم YouTube
  localVideo: "videos/birthday.mp4",

  // ✏️ صورة غلاف الفيديو (اختياري)
  videoPoster: "",
};


/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER EFFECT - الكتابة المتحركة
   ═══════════════════════════════════════════════════════════════ */
const phrases = [
  "أنتِ أجمل ما في حياتي 💕",
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
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 60 : 100);
}


/* ═══════════════════════════════════════════════════════════════
   BIRTHDAY COUNTDOWN - العداد التنازلي لعيد الميلاد
   ═══════════════════════════════════════════════════════════════ */
function updateBirthdayCountdown() {
  const now = new Date();
  const bDay = CONFIG.birthday;

  // تاريخ عيد الميلاد القادم
  let next = new Date(now.getFullYear(), bDay[1], bDay[2]);
  if (next <= now) next.setFullYear(next.getFullYear() + 1);

  // هل اليوم هو يوم ميلادها؟
  const todayThisYear = new Date(now.getFullYear(), bDay[1], bDay[2]);
  const isToday = todayThisYear.toDateString() === now.toDateString();

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
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  document.getElementById('cnt-days').textContent  = days;
  document.getElementById('cnt-hours').textContent = hours;
  document.getElementById('cnt-mins').textContent  = mins;
  document.getElementById('cnt-secs').textContent  = secs;
}


/* ═══════════════════════════════════════════════════════════════
   LIVE RELATIONSHIP COUNTER - عداد الوقت معاً
   ═══════════════════════════════════════════════════════════════ */
function updateLiveCounter() {
  const start = new Date(...CONFIG.relationshipStart);
  const diff  = Date.now() - start.getTime();
  const secs  = Math.floor(diff / 1000);
  const mins  = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);

  document.getElementById('live-days').textContent  = days.toLocaleString('ar-EG');
  document.getElementById('live-hours').textContent = hours.toLocaleString('ar-EG');
  document.getElementById('live-mins').textContent  = mins.toLocaleString('ar-EG');
  document.getElementById('live-secs').textContent  = secs.toLocaleString('ar-EG');
}


/* ═══════════════════════════════════════════════════════════════
   VIDEO LOADER - تحميل الفيديو
   ═══════════════════════════════════════════════════════════════ */
function loadVideo() {
  const ytSrc   = CONFIG.youtubeEmbed;
  const localSrc = CONFIG.localVideo;

  // لو عنده رابط YouTube
  if (ytSrc && ytSrc.trim() !== "") {
    document.getElementById('video-placeholder').style.display = 'none';
    const iframe = document.getElementById('video-iframe');
    iframe.src = ytSrc + '?autoplay=1';
    iframe.style.display = 'block';
    return;
  }

  // لو عنده فيديو محلي
  if (localSrc && localSrc.trim() !== "") {
    document.getElementById('video-placeholder').style.display = 'none';
    const video = document.getElementById('video-local');
    const source = document.getElementById('video-source');
    source.src = localSrc;
    
    // لو في صورة غلاف
    if (CONFIG.videoPoster) {
      video.poster = CONFIG.videoPoster;
    }
    
    video.load();
    video.style.display = 'block';
    video.play();
    return;
  }

  // لو مفيش حاجة
  alert('⚠️ من فضلك:\n\n1. لو عايز YouTube → ضيف الرابط في CONFIG.youtubeEmbed\n2. لو عايز فيديو محلي → حط الفيديو في فولدر الموقع وعدّل CONFIG.localVideo');
}


/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX - عرض الصور مكبرة
   ═══════════════════════════════════════════════════════════════ */
function openLightbox(card) {
  const caption = card.dataset.caption || '';
  const placeholder = card.querySelector('.gallery-placeholder');
  const img = card.querySelector('img');

  if (img) {
    // لو في صورة حقيقية
    const canvas = document.getElementById('lightbox-canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      canvas.style.display = 'block';
      document.getElementById('lightbox-bg').style.display = 'none';
    };
    image.src = img.src;
  } else if (placeholder) {
    // placeholder - عرض الـ gradient
    document.getElementById('lightbox-canvas').style.display = 'none';
    const bg = document.getElementById('lightbox-bg');
    bg.style.display = 'flex';
    bg.style.background = placeholder.style.background || 
      'linear-gradient(135deg, #C8526B, #D4AF37)';
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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});


/* ═══════════════════════════════════════════════════════════════
   PARTICLES - الجزيئات الطايرة في الخلفية
   ═══════════════════════════════════════════════════════════════ */
const canvas = document.getElementById('particles-canvas');
const ctx2   = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

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
  ctx2.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.y -= p.speed;
    p.x += p.drift;
    p.rotation += p.rotSpeed;
    
    if (p.y < -50) { p.y = H + 50; p.x = Math.random() * W; }
    if (p.x < -50) p.x = W + 50;
    if (p.x > W + 50) p.x = -50;

    ctx2.save();
    ctx2.globalAlpha = p.opacity;
    ctx2.translate(p.x, p.y);
    ctx2.rotate(p.rotation);
    ctx2.font = `${p.size}px serif`;
    ctx2.textAlign = 'center';
    ctx2.textBaseline = 'middle';
    ctx2.fillText(p.emoji, 0, 0);
    ctx2.restore();
  });
  requestAnimationFrame(animateParticles);
}


/* ═══════════════════════════════════════════════════════════════
   SCROLL ANIMATIONS - أنيميشن عند التمرير
   ═══════════════════════════════════════════════════════════════ */
function checkReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkReveal, { passive: true });


/* ═══════════════════════════════════════════════════════════════
   NAVBAR SCROLL EFFECT
   ═══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ═══════════════════════════════════════════════════════════════
   HAMBURGER MENU - قائمة الموبايل
   ═══════════════════════════════════════════════════════════════ */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
}


/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR - المؤشر المخصص
   ═══════════════════════════════════════════════════════════════ */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => { cursor.style.display = 'none'; });
document.addEventListener('mouseenter', () => { cursor.style.display = 'block'; });

// تأثير التكبير على الأزرار
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
  });
  btn.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});


/* ═══════════════════════════════════════════════════════════════
   CONFETTI - انفجار الكرات الملونة
   ═══════════════════════════════════════════════════════════════ */
function launchConfetti() {
  const colors = ['#C8526B', '#D4AF37', '#FFB6C1', '#FFF8F0', '#9B2C44', '#F0D080', '#fff'];
  const shapes = ['♥', '★', '✦', '•', '▲', '♦'];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size   = 8 + Math.random() * 10;
    const color  = colors[Math.floor(Math.random() * colors.length)];
    const shape  = shapes[Math.floor(Math.random() * shapes.length)];
    const dur    = 2.5 + Math.random() * 3;
    const delay  = Math.random() * 2;

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


/* ═══════════════════════════════════════════════════════════════
   PARALLAX EFFECT - تأثير العمق على Hero
   ═══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = (scrolled * 0.4) + 'px';
  }
}, { passive: true });


/* ═══════════════════════════════════════════════════════════════
   CURRENT YEAR IN FOOTER
   ═══════════════════════════════════════════════════════════════ */
document.getElementById('current-year').textContent = new Date().getFullYear();


/* ═══════════════════════════════════════════════════════════════
   INIT - بدء كل حاجة
   ═══════════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  // بدء typewriter بعد 3.5 ثانية
  setTimeout(typeWriter, 3500);

  // بدء العدادات
  updateBirthdayCountdown();
  setInterval(updateBirthdayCountdown, 1000);

  updateLiveCounter();
  setInterval(updateLiveCounter, 1000);

  // بدء الـ particles
  animateParticles();

  // بدء scroll animations
  checkReveal();

  // شاشة التحميل
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    setTimeout(launchConfetti, 400);
    checkReveal();
  }, 3000);
});


// ═══════════════════════════════════════════════════════════════
//  🎉就这样！ الموقع جاهز!
// ═══════════════════════════════════════════════════════════════
