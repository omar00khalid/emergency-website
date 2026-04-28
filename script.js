const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const videoTitle = document.getElementById('videoTitle');
const stepsList = document.getElementById('stepsList');
const caseCards = document.querySelectorAll('.case-card');
const navToggle = document.getElementById('navToggle');
const topbar = document.querySelector('.topbar');
const videoPlayer = document.getElementById('videoPlayer');

const caseVideos = {
  'الحروق': 'الحروق.mp4',
  'الرعاف': 'الرعاف.mp4',
  'الكسور': 'الكسور.mp4',
  'الدوخة': 'الدوخة.mp4',
  'الإنعاش القلبي': 'الانعاش القلبي.mp4'
};

const caseSteps = {
  'الحروق': [
    'برد المنطقة المحروقة بماء فاتر لمدة 10 دقائق.',
    'أزل أي ملابس أو مجوهرات بعناية إذا لم تلتصق بالجلد.',
    'غطِ الحرق بشاش نظيف وغير لاصق.',
    'اطلب مساعدة طبية إذا كانت الحروق واسعة أو عميقة.'
  ],
  'الرعاف': [
    'اجلس بمنخفض الرأس وارخِ الرقبة.',
    'اضغط بلطف على الجزء الأمامي من الأنف لمدة 10 دقائق.',
    'تنفس من الفم وابتعد عن مسح الأنف.',
    'استشر الطبيب إذا استمر النزيف.'
  ],
  'الكسور': [
    'ثبت المكان المصاب بواسطة جبيرة أو قطعة قماش.',
    'تجنب تحريك الطرف المكسور كثيرًا.',
    'ضع الثلج في منشفة لتهدئة الألم.',
    'اطلب إسعافًا لتقييم الكسور بشكل آمن.'
  ],
  'الدوخة': [
    'اجلس أو استلقِ بهدوء حتى تستقر الأعراض.',
    'اشرب ماء ببطء لتجنب الجفاف.',
    'تنفس بعمق وركز على نقطة ثابتة.',
    'تجنب الوقوف المفاجئ وحاول أن تحصل على هواء نقي.'
  ],
  'الإنعاش القلبي': [
    'افحص وعي المصاب وتنفسه قبل التدخل.',
    'اطلب المساعدة واتصل بالطوارئ فورًا.',
    'ابدأ بالضغط الصدري المستمر عند منتصف الصدر.',
    'استمر حتى يصل فريق الإسعاف أو يعود التنفس.'
  ]
};

function updateVideoContent(title) {
  videoTitle.textContent = `حالة: ${title}`;
  stepsList.innerHTML = '';
  (caseSteps[title] || []).forEach(step => {
    const item = document.createElement('li');
    item.textContent = step;
    stepsList.appendChild(item);
  });
  if (videoPlayer) {
    const src = caseVideos[title] || '';
    const source = videoPlayer.querySelector('source');
    if (source) {
      source.src = src;
      videoPlayer.load();
    }
  }

  setTimeout(() => {
    document.querySelectorAll('#stepsList li').forEach((li, idx) => {
      setTimeout(() => li.classList.add('visible'), idx * 80);
    });
  }, 100);
}

caseCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.dataset.case;
    updateVideoContent(title);
    document.getElementById('video').scrollIntoView({ behavior: 'smooth' });
  });
});

startBtn.addEventListener('click', () => {
  document.getElementById('cases').scrollIntoView({ behavior: 'smooth' });
});

backBtn.addEventListener('click', () => {
  document.getElementById('cases').scrollIntoView({ behavior: 'smooth' });
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    topbar.classList.toggle('nav-open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    topbar.classList.remove('nav-open');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    topbar.classList.add('sticky');
  } else {
    topbar.classList.remove('sticky');
  }
});

Array.from(document.querySelectorAll('.call-btn')).forEach(btn => {
  btn.addEventListener('click', event => {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('li').forEach((item, index) => {
        setTimeout(() => item.classList.add('visible'), index * 90);
      });
    }
  });
}, { threshold: 0.3 });

observer.observe(stepsList);
const guidelinesList = document.querySelector('.guidelines-list');
if (guidelinesList) observer.observe(guidelinesList);

const fadeSections = document.querySelectorAll('.fade-section');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
fadeSections.forEach(section => fadeObserver.observe(section));

// initial reveal for landing section
window.addEventListener('load', () => {
  document.querySelectorAll('.landing-card, .video-panel').forEach(el => {
    el.classList.add('fade-in');
  });
});
