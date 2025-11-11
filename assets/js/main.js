/* Main consolidated JS
   Combined from: script.js + video-controller.js
   Order: interactive site script (script.js) then optional video-controller class appended
   Originals kept in assets/js/ (no deletion performed)
*/

/* === Begin script.js content === */
// إعداد السنة
document.getElementById('year').textContent = new Date().getFullYear();

// تعطيل EmailJS نهائياً لمنع الأخطاء
if (typeof emailjs !== 'undefined') {
  emailjs = undefined;
  console.log('EmailJS disabled to prevent errors');
}

// ==== عدادات الإحصائيات المتحركة ====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const increment = target / 50; // سرعة العد
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 30);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// تشغيل العدادات عند ظهور القسم
function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target); // تشغيل مرة واحدة فقط
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5
});

// مراقبة قسم الإحصائيات وتهيئة مراقبة التحريكات
document.addEventListener('DOMContentLoaded', function() {
  // Observe all animated elements
  const animatedElements = [
    '.stats-card',
    '.fade-in',
    '.stagger-fade',
    '.slide-up',
    '.reveal',
    '.scale-in'
  ];

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // For stats card
        if (entry.target.classList.contains('stats-card')) {
          animateCounters();
        }
        
        // For stagger fade elements
        if (entry.target.classList.contains('stagger-fade')) {
          entry.target.classList.add('animate');
        }
        
        // For all other animations
        entry.target.style.visibility = 'visible';
        
        // Stop observing after animation is triggered
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '50px'
  });

  // Observe all elements that need animations
  animatedElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      // Initially hide the element
      element.style.visibility = 'hidden';
      // Start observing
      animationObserver.observe(element);
    });
  });
});

// ==== نظام تعدد اللغات ====
document.addEventListener('DOMContentLoaded', function() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const html = document.documentElement;
  
  // قراءة اللغة المحفوظة من التخزين المحلي
  const savedLang = localStorage.getItem('website-language') || 'ar';
  switchLanguage(savedLang);
  
  // دالة تبديل اللغة
  function switchLanguage(lang) {
    // تحديث خاصيات HTML
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // تحديث جميع العناصر
    const elements = document.querySelectorAll('[data-ar][data-en][data-sv]');
    elements.forEach(element => {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = element.getAttribute(`data-${lang}`);
      } else {
        element.textContent = element.getAttribute(`data-${lang}`);
      }
    });
    
    // تحديث placeholder للحقول المخصصة
    const placeholderElements = document.querySelectorAll('[data-ar-placeholder][data-en-placeholder][data-sv-placeholder]');
    placeholderElements.forEach(element => {
      element.placeholder = element.getAttribute(`data-${lang}-placeholder`);
    });
    
    // تحديث الأزرار
    langButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });
    
    // حفظ اللغة في التخزين المحلي
    localStorage.setItem('website-language', lang);
  }
  
  // التعامل مع النقر على أزرار اللغة
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

  // سلوك قائمة اللغات بالنقر: النقر على اللغة النشطة يفتح/يغلق الخيارات، والنقر على لغة جديدة يختارها ويغلق الصندوق
  const langSwitcher = document.querySelector('.language-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', (e) => {
      const clicked = e.target.closest('.lang-btn');
      if (!clicked) return;

      // إذا ضُغطت على الزر النشط حالياً -> تبديل حالة القائمة (فتح/إغلاق)
      if (clicked.classList.contains('active')) {
        langSwitcher.classList.toggle('open');
      } else {
        // إذا اختار المستخدم لغة جديدة -> تأكد من إغلاق القائمة
        langSwitcher.classList.remove('open');
      }
    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-switcher')) {
        langSwitcher.classList.remove('open');
      }
    });
  }
});

// ==== Video Controls - Simple ====
document.addEventListener('DOMContentLoaded', function() {
  const beforeVideo = document.getElementById('beforeVideo');
  const afterVideo = document.getElementById('afterVideo');
  const playBothBtn = document.getElementById('playBothBtn');
  const pauseAllBtn = document.getElementById('pauseAllBtn');
  const syncVideosBtn = document.getElementById('syncVideosBtn');

  // Only proceed if videos exist
  if (!beforeVideo || !afterVideo) {
    console.log('Video elements not found, skipping video controls setup');
    return;
  }

  // تشغيل كلا الفيديوين
  if (playBothBtn) {
    playBothBtn.addEventListener('click', function() {
      try {
        beforeVideo.play();
        afterVideo.play();
      } catch (error) {
        console.warn('Error playing videos:', error);
      }
    });
  }

  // إيقاف كلا الفيديوين
  if (pauseAllBtn) {
    pauseAllBtn.addEventListener('click', function() {
      try {
        beforeVideo.pause();
        afterVideo.pause();
      } catch (error) {
        console.warn('Error pausing videos:', error);
      }
    });
  }

  // مزامنة الفيديوهات
  if (syncVideosBtn) {
    syncVideosBtn.addEventListener('click', function() {
      try {
        // إيقاف كلاهما أولاً
        beforeVideo.pause();
        afterVideo.pause();
        
        // إعادة تعيين الوقت للبداية
        beforeVideo.currentTime = 0;
        afterVideo.currentTime = 0;
        
        // تشغيل متزامن
        setTimeout(() => {
          beforeVideo.play();
          afterVideo.play();
        }, 100);
      } catch (error) {
        console.warn('Error syncing videos:', error);
      }
    });
  }

  // إيقاف الفيديو الآخر عند بدء تشغيل أحدهما منفرداً
  beforeVideo.addEventListener('play', function() {
    if (!beforeVideo.classList.contains('playing-both')) {
      afterVideo.pause();
    }
  });

  afterVideo.addEventListener('play', function() {
    if (!afterVideo.classList.contains('playing-both')) {
      beforeVideo.pause();
    }
  });

  // عند الضغط على زر "تشغيل كلا الفيديوين"
  if (playBothBtn) {
    playBothBtn.addEventListener('click', function() {
      // إضافة class مؤقت لمنع الإيقاف التلقائي
      beforeVideo.classList.add('playing-both');
      afterVideo.classList.add('playing-both');
      
      // إزالة الـ class بعد ثانية واحدة
      setTimeout(() => {
        beforeVideo.classList.remove('playing-both');
        afterVideo.classList.remove('playing-both');
      }, 1000);
    });
  }
});

// إضافة تأثير النبض للمزامنة
const pulseKeyframes = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

// إضافة الـ CSS للتأثيرات
if (!document.getElementById('video-animations')) {
  const style = document.createElement('style');
  style.id = 'video-animations';
  style.textContent = pulseKeyframes;
  document.head.appendChild(style);
}

// ==== التعامل مع النقر على المشاريع لعرض المقارنة ====
document.addEventListener('DOMContentLoaded', function() {
  const projects = document.querySelectorAll('.project');
  const mainViewer = document.getElementById('baWrap');
  const mainBefore = mainViewer.querySelector('img');
  const mainAfter = mainViewer.querySelector('.ba-after img');
  
  projects.forEach(project => {
    project.addEventListener('click', function() {
      const beforeSrc = this.getAttribute('data-before');
      const afterSrc = this.getAttribute('data-after');
      const title = this.getAttribute('data-title');
      
      // تحديث العارض الرئيسي
      if(beforeSrc && afterSrc) {
        mainBefore.src = beforeSrc;
        mainAfter.src = afterSrc;
        mainViewer.setAttribute('data-before', beforeSrc);
        mainViewer.setAttribute('data-after', afterSrc);
        
        // انتقال سلس إلى العارض
        mainViewer.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // تأثير بصري للنقر
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
    
    // إضافة مؤشر النقر
    project.style.cursor = 'pointer';
  });
});

// ==== التعامل مع أزرار الأسعار ====
document.addEventListener('DOMContentLoaded', function() {
  const pricingBtns = document.querySelectorAll('.pricing-btn');
  pricingBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const packageName = this.closest('.pricing-card').querySelector('h3').textContent;
      const price = this.closest('.pricing-card').querySelector('.price').textContent;
      
      // تحديث نموذج التواصل تلقائياً
      const messageField = document.getElementById('message');
      if(messageField) {
        messageField.value = `أود الاستفسار عن ${packageName} بسعر ${price}. يرجى التواصل معي لمناقشة التفاصيل.`;
        messageField.scrollIntoView({behavior: 'smooth'});
      }
    });
  });
});

// ==== قبل/بعد viewer ==== (unchanged behavior)
(function(){
  const wrap = document.getElementById('baWrap');
  const after = document.getElementById('baAfter');
  const handle = document.getElementById('baHandle');
  const imgBefore = wrap.querySelector('img');

  // set initial sizes on load
  function setPos(percent){
    if(percent<0) percent=0;
    if(percent>100) percent=100;
    after.style.width = percent + '%';
    handle.style.left = percent + '%';
  }

  // responsiveness: when image loads, fix height
  function getWrapRect(){ return wrap.getBoundingClientRect(); }

  let dragging=false;
  const updateFromClientX = (clientX)=>{
    const rect = getWrapRect();
    let pct = ( (clientX - rect.left) / rect.width ) * 100;
    setPos(pct);
  };

  // events
  handle.addEventListener('pointerdown', (e)=>{ dragging=true; handle.setPointerCapture(e.pointerId); });
  window.addEventListener('pointerup', ()=>{ dragging=false; });
  window.addEventListener('pointermove', (e)=>{ if(dragging) updateFromClientX(e.clientX); });

  // allow clicking on wrap to move handle
  wrap.addEventListener('click', (e)=>{
    updateFromClientX(e.clientX);
  });

  // touch-friendly: pointer events already cover touch
  setPos(50);

  // load images from data attributes if present (for dynamic switching)
  const beforeSrc = wrap.dataset.before, afterSrc = wrap.dataset.after;
  if(beforeSrc){ imgBefore.src = beforeSrc; }
  if(afterSrc){ after.querySelector('img').src = afterSrc; }
})();

// ==== Email Service Setup (noop) ====
function initEmailJS() { console.log('EmailJS disabled - using mailto fallback'); }

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  setupLazyLoading();
});

// Lazy loading setup (from script.js)
function setupLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyVideos = document.querySelectorAll('video[data-src]');
  
  const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Show loading state
        element.classList.add('loading');
        
        // Load the actual content
        if (element.tagName === 'IMG') {
          const img = new Image();
          img.onload = () => {
            element.src = img.src;
            element.classList.remove('loading');
            element.classList.add('loaded');
          };
          img.src = element.dataset.src;
        } else if (element.tagName === 'VIDEO') {
          element.src = element.dataset.src;
          element.load();
          element.classList.remove('loading');
          element.classList.add('loaded');
        }
        
        // Stop observing after loading
        lazyLoadObserver.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // Start observing lazy elements
  lazyImages.forEach(img => lazyLoadObserver.observe(img));
  lazyVideos.forEach(video => lazyLoadObserver.observe(video));
};

// ==== simple contact form submit handler ====
function submitForm(e){
  e.preventDefault();
  
  // منع استخدام EmailJS نهائياً
  if (typeof emailjs !== 'undefined') { emailjs = undefined; }
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // تغيير نص الزر أثناء الإرسال
  submitBtn.disabled = true;
  submitBtn.textContent = 'جاري الإرسال...';
  
  const name = document.getElementById('name').value || '';
  const email = document.getElementById('email').value || '';
  const message = document.getElementById('message').value || '';
  
  // التحقق من صحة البيانات
  if (!name || !email || !message) {
    showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    return false;
  }
  
  // إعداد معاملات الإيميل
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'louai.karim2009@gmail.com',
    subject: 'استفسار عن ترميم داخلي من ' + name
  };
  
  // استخدام mailto مباشرة بدلاً من EmailJS لتجنب الأخطاء
  console.log('Using mailto fallback for email sending');
  showNotification('سيتم فتح برنامج الإيميل لإرسال الرسالة', 'info');
  
  const subject = encodeURIComponent('استفسار عن ترميم داخلي من ' + name);
  const body = encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nالرسالة:\n${message}\n\n---\nتم إرسال هذه الرسالة من موقع ماستر ترميم`);
  
  // فتح برنامج الإيميل
  const mailtoLink = `mailto:louai.karim2009@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
  
  // إعادة تعيين النموذج بعد فترة قصيرة
  setTimeout(() => {
    document.getElementById('contactForm').reset();
    showNotification('تم تحضير الرسالة! يرجى إرسالها من برنامج الإيميل', 'success');
  }, 1000);
  
  submitBtn.disabled = false;
  submitBtn.textContent = originalText;
  
  return false;
}

// دالة إظهار الإشعارات
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-out;
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
  `;
  
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) { notification.parentNode.removeChild(notification); }
    }, 300);
  }, 5000);
}

// ==== Video Before Renovation Enhancement (beforeRenovationVideo) ====
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('beforeRenovationVideo');
  
  if (video) {
    // تحديث مدة الفيديو في النص عند تحميل البيانات الوصفية
    video.addEventListener('loadedmetadata', function() {
      const duration = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      const durationText = `${duration}:${seconds.toString().padStart(2, '0')}`;
      
      const durationSpan = document.querySelector('.video-stats span:last-child');
      if (durationSpan) {
        const currentLang = document.documentElement.lang || 'ar';
        const durationLabels = {
          ar: `مدة الفيديو: ${durationText} دقيقة`,
          en: `Video duration: ${durationText} minutes`,
          sv: `Videolängd: ${durationText} minuter`
        };
        durationSpan.innerHTML = `⏱️ <span data-ar="${durationLabels.ar}" data-en="${durationLabels.en}" data-sv="${durationLabels.sv}">${durationLabels[currentLang] || durationLabels.ar}</span>`;
      }
    });

    // interactive effects
    video.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.02)'; this.style.transition = 'transform 0.3s ease'; });
    video.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });

    video.addEventListener('play', function() { console.log('فيديو قبل الترميم: تم بدء التشغيل'); });
    video.addEventListener('pause', function() { console.log('فيديو قبل الترميم: تم إيقاف التشغيل'); });
    video.addEventListener('ended', function() { this.style.filter = 'brightness(0.8)'; setTimeout(() => { this.style.filter = 'brightness(1)'; }, 2000); });

    // lazy-load video when visible
    const videoContainer = document.querySelector('.video-before-container');
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.load(); // تحميل الفيديو عند ظهوره في المنطقة المرئية
          videoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (videoContainer) { videoObserver.observe(videoContainer); }

    video.addEventListener('keydown', function(e) {
      switch(e.key) {
        case ' ': e.preventDefault(); if (video.paused) video.play(); else video.pause(); break;
        case 'ArrowLeft': e.preventDefault(); video.currentTime = Math.max(0, video.currentTime - 10); break;
        case 'ArrowRight': e.preventDefault(); video.currentTime = Math.min(video.duration, video.currentTime + 10); break;
        case 'f': case 'F': e.preventDefault(); if (video.requestFullscreen) video.requestFullscreen(); break;
      }
    });

    video.setAttribute('title', 'اضغط مسطرة المسافة للتشغيل/الإيقاف، الأسهم للتنقل، F للشاشة الكاملة');
    video.setAttribute('tabindex', '0');
  }
});

// ==== Logo image fallback helper (from script-clean.js) ====
document.addEventListener('DOMContentLoaded', function() {
  try {
    const logoImg = document.querySelector('.header-logo img.company-logo');
    if (!logoImg) return;
    setTimeout(() => {
      const failed = (!logoImg.complete) || (logoImg.naturalWidth === 0);
      if (failed) {
        const fallback = document.createElement('div');
        fallback.className = 'logo-fallback';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.innerHTML = '<div class="logo-emoji">🏠</div><div class="logo-title">ماستر ترميم</div>';
        logoImg.parentNode.replaceChild(fallback, logoImg);
      }
    }, 80);
  } catch (err) { console.warn('Logo fallback error', err); }
});

console.log('main.js (consolidated) loaded');

/* === End script.js content === */


/* === Begin video-controller.js content === */
/**
 * نظام إدارة الفيديوهات التفاعلية (appended)
 */

class VideoShowcase {
    constructor() {
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 120; // مدتان دقيقتان
        this.playbackRate = 1.0;
        this.isSynced = true;
        this.videoData = {
            before: {
                title: 'المنزل قبل الترميم',
                description: 'حالة المنزل الأصلية قبل بدء أعمال الترميم',
                scenes: [
                    { time: 0, description: 'المدخل الرئيسي' },
                    { time: 15, description: 'غرفة المعيشة' },
                    { time: 30, description: 'المطبخ القديم' },
                    { time: 45, description: 'الحمامات' },
                    { time: 60, description: 'غرف النوم' },
                    { time: 75, description: 'الأرضيات التالفة' },
                    { time: 90, description: 'الجدران المتضررة' },
                    { time: 105, description: 'النظرة العامة الختامية' }
                ]
            },
            after: {
                title: 'المنزل بعد الترميم',
                description: 'النتيجة النهائية المذهلة بعد الترميم الشامل',
                scenes: [
                    { time: 0, description: 'المدخل الجديد الأنيق' },
                    { time: 15, description: 'غرفة المعيشة العصرية' },
                    { time: 30, description: 'المطبخ الحديث' },
                    { time: 45, description: 'الحمامات المجددة' },
                    { time: 60, description: 'غرف النوم المريحة' },
                    { time: 75, description: 'الأرضيات الجديدة' },
                    { time: 90, description: 'الجدران المدهونة' },
                    { time: 105, description: 'التحول الكامل' }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.createSceneMarkers();
    }
    
    bindEvents() {
        // أزرار التحكم
        document.getElementById('playBothBtn')?.addEventListener('click', () => this.play());
        document.getElementById('pauseAllBtn')?.addEventListener('click', () => this.pause());
        document.getElementById('syncVideosBtn')?.addEventListener('click', () => this.sync());
        
        // شريط التقدم التفاعلي
        document.querySelector('.progress-bar')?.addEventListener('click', (e) => this.seekTo(e));
        
        // النقر على الفيديوهات
        document.getElementById('beforeVideo')?.addEventListener('click', () => this.togglePlayPause());
        document.getElementById('afterVideo')?.addEventListener('click', () => this.togglePlayPause());
        
        // اختصارات لوحة المفاتيح
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.updateUI();
            this.startAnimation();
            this.playbackTimer = setInterval(() => {
                this.currentTime += 0.1;
                if (this.currentTime >= this.duration) {
                    this.currentTime = this.duration;
                    this.pause();
                }
                this.updateDisplay();
                this.updateScenes();
            }, 100);
        }
    }
    
    pause() {
        this.isPlaying = false;
        this.updateUI();
        this.stopAnimation();
        if (this.playbackTimer) { clearInterval(this.playbackTimer); }
    }
    
    togglePlayPause() { if (this.isPlaying) this.pause(); else this.play(); }
    
    seekTo(event) { const progressBar = event.currentTarget; const rect = progressBar.getBoundingClientRect(); const clickX = event.clientX - rect.left; const percentage = clickX / rect.width; this.currentTime = percentage * this.duration; this.updateDisplay(); this.updateScenes(); }
    
    sync() { this.showSyncEffect(); if (this.isPlaying) { this.currentTime = Math.floor(this.currentTime); this.updateDisplay(); } }
    
    updateDisplay() {
        const percentage = (this.currentTime / this.duration) * 100;
        const progressFill = document.getElementById('progressFill'); if (progressFill) { progressFill.style.width = percentage + '%'; }
        const currentTimeEl = document.getElementById('currentTime'); const totalTimeEl = document.getElementById('totalTime');
        if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.currentTime);
        if (totalTimeEl) totalTimeEl.textContent = this.formatTime(this.duration);
    }
    
    updateUI() {
        const playBtn = document.getElementById('playBothBtn'); const pauseBtn = document.getElementById('pauseAllBtn');
        if (playBtn) playBtn.disabled = this.isPlaying; if (pauseBtn) pauseBtn.disabled = !this.isPlaying;
        const beforeVideo = document.getElementById('beforeVideo'); const afterVideo = document.getElementById('afterVideo');
        if (beforeVideo && afterVideo) {
            if (this.isPlaying) { beforeVideo.classList.add('playing'); afterVideo.classList.add('playing'); } else { beforeVideo.classList.remove('playing'); afterVideo.classList.remove('playing'); }
        }
    }
    
    startAnimation() { const beforeVideo = document.getElementById('beforeVideo'); const afterVideo = document.getElementById('afterVideo'); if (beforeVideo && afterVideo) { beforeVideo.style.animation = 'videoPlaying 2s ease-in-out infinite'; afterVideo.style.animation = 'videoPlaying 2s ease-in-out infinite'; } }
    
    stopAnimation() { const beforeVideo = document.getElementById('beforeVideo'); const afterVideo = document.getElementById('afterVideo'); if (beforeVideo && afterVideo) { beforeVideo.style.animation = ''; afterVideo.style.animation = ''; } }
    
    showSyncEffect() { const syncBtn = document.getElementById('syncVideosBtn'); if (syncBtn) { const originalText = syncBtn.textContent; syncBtn.textContent = '🔄 تمت المزامنة!'; syncBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)'; setTimeout(() => { syncBtn.textContent = originalText; syncBtn.style.background = ''; }, 2000); } }
    
    updateScenes() { const currentScene = this.getCurrentScene(); if (currentScene) this.displaySceneInfo(currentScene); }
    
    getCurrentScene() {
        const beforeScenes = this.videoData.before.scenes; const afterScenes = this.videoData.after.scenes;
        let currentBeforeScene = null; let currentAfterScene = null;
        for (let i = beforeScenes.length - 1; i >= 0; i--) { if (this.currentTime >= beforeScenes[i].time) { currentBeforeScene = beforeScenes[i]; break; } }
        for (let i = afterScenes.length - 1; i >= 0; i--) { if (this.currentTime >= afterScenes[i].time) { currentAfterScene = afterScenes[i]; break; } }
        return { before: currentBeforeScene, after: currentAfterScene };
    }
    
    displaySceneInfo(scene) { const sceneInfoEl = document.getElementById('sceneInfo'); if (sceneInfoEl && scene.before && scene.after) { sceneInfoEl.innerHTML = `<div class="scene-display"><div class="scene-before"><strong>قبل:</strong> ${scene.before.description}</div><div class="scene-after"><strong>بعد:</strong> ${scene.after.description}</div></div>`; } }
    
    createSceneMarkers() { const progressBar = document.querySelector('.progress-bar'); if (!progressBar) return; this.videoData.before.scenes.forEach((scene) => { const marker = document.createElement('div'); marker.className = 'scene-marker'; marker.style.cssText = `position: absolute; left: ${(scene.time / this.duration) * 100}%; top: 0; width: 2px; height: 100%; background: #fff; opacity: 0.7; cursor: pointer; z-index: 10;`; marker.addEventListener('click', (e) => { e.stopPropagation(); this.currentTime = scene.time; this.updateDisplay(); this.updateScenes(); }); marker.title = scene.description; progressBar.appendChild(marker); }); }
    
    handleKeyPress(event) { switch(event.code) { case 'Space': event.preventDefault(); this.togglePlayPause(); break; case 'ArrowLeft': event.preventDefault(); this.currentTime = Math.max(0, this.currentTime - 5); this.updateDisplay(); break; case 'ArrowRight': event.preventDefault(); this.currentTime = Math.min(this.duration, this.currentTime + 5); this.updateDisplay(); break; case 'Digit0': event.preventDefault(); this.currentTime = 0; this.updateDisplay(); break; } }
    
    formatTime(seconds) { const minutes = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${minutes}:${secs.toString().padStart(2, '0')}`; }
    
    setPlaybackRate(rate) { this.playbackRate = rate; if (this.isPlaying) { this.pause(); this.play(); } }
    
    jumpToScene(sceneIndex) { if (this.videoData.before.scenes[sceneIndex]) { this.currentTime = this.videoData.before.scenes[sceneIndex].time; this.updateDisplay(); this.updateScenes(); } }
    
    toggleFullscreen() { const videoContainer = document.getElementById('videoShowcase'); if (videoContainer) { if (document.fullscreenElement) { document.exitFullscreen(); } else { videoContainer.requestFullscreen(); } } }
    
    exportProgress() { return { currentTime: this.currentTime, isPlaying: this.isPlaying, playbackRate: this.playbackRate }; }
    
    importProgress(data) { this.currentTime = data.currentTime || 0; this.playbackRate = data.playbackRate || 1.0; this.updateDisplay(); if (data.isPlaying && !this.isPlaying) this.play(); }
}

const videoStyles = `
    @keyframes videoPlaying { 0%, 100% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.3); transform: scale(1); } 50% { box-shadow: 0 0 30px rgba(52, 152, 219, 0.6); transform: scale(1.02); } }
    .playing { border: 3px solid #3498db !important; animation: videoPlaying 2s ease-in-out infinite !important; }
    .scene-marker:hover { background: #3498db !important; width: 4px !important; opacity: 1 !important; }
    .scene-display { display: flex; justify-content: space-between; gap: 20px; padding: 10px; background: rgba(52, 152, 219, 0.1); border-radius: 8px; margin-top: 10px; }
    .scene-before, .scene-after { flex: 1; padding: 8px; border-radius: 4px; }
    .scene-before { background: rgba(231, 76, 60, 0.1); border-left: 3px solid #e74c3c; }
    .scene-after { background: rgba(39, 174, 96, 0.1); border-left: 3px solid #27ae60; }
`;

if (!document.getElementById('video-showcase-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'video-showcase-styles';
    styleSheet.textContent = videoStyles;
    document.head.appendChild(styleSheet);
}

window.VideoShowcase = VideoShowcase;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('videoShowcase')) {
        // Instantiate only if not already created
        if (!window.videoShowcase) window.videoShowcase = new VideoShowcase();
    }
});

/* === End video-controller.js content === */

// ===== Header: mobile nav (moved from inline) + sticky behavior =====
document.addEventListener('DOMContentLoaded', function() {
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.getElementById('mainNav');
  var header = document.querySelector('header');

  // Mobile nav/backdrop logic
  if (navToggle && mainNav) {
    var backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }

    function openNav() {
      navToggle.setAttribute('aria-expanded', 'true');
      mainNav.classList.add('open');
      backdrop.classList.add('visible');
      document.documentElement.style.overflow = 'hidden';
    }

    function closeNav() {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('open');
      backdrop.classList.remove('visible');
      document.documentElement.style.overflow = '';
    }

    navToggle.addEventListener('click', function(e) {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      if (expanded) closeNav(); else openNav();
    });

    backdrop.addEventListener('click', closeNav);

    mainNav.addEventListener('click', function(e) {
      if (e.target.tagName && e.target.tagName.toLowerCase() === 'a') closeNav();
    });

    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeNav(); });
  }

  // Sticky header: add .scrolled when scrolled beyond threshold
  if (header) {
    var onScroll = function() {
      if (window.scrollY > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Measure header height and expose it via CSS variable --header-height
  // This prevents the sticky header from overlapping the main content.
  function updateHeaderHeight() {
    try {
      var h = header ? header.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty('--header-height', h + 'px');
    } catch (err) {
      console.warn('updateHeaderHeight error', err);
    }
  }

  // Call once now and on resize/scroll (debounced on resize)
  updateHeaderHeight();
  var resizeTimer = null;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateHeaderHeight, 120);
  });

  // Update when scroll toggles the scrolled class (so height changes are captured)
  if (header) {
    var _origOnScroll = onScroll;
    window.removeEventListener('scroll', onScroll);
    onScroll = function() {
      if (window.scrollY > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');
      // measure after class toggle (use rAF to avoid layout thrash)
      window.requestAnimationFrame(updateHeaderHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Also update height on window load (images/fonts may change size after DOMContentLoaded)
  window.addEventListener('load', function() {
    // small timeout to allow late layout
    setTimeout(updateHeaderHeight, 80);
  });

  // If the header contains images that load later, listen for their load events
  try {
    if (header) {
      var headerImgs = header.querySelectorAll('img');
      headerImgs.forEach(function(img) {
        if (!img.complete) img.addEventListener('load', updateHeaderHeight);
      });
    }
  } catch (err) { /* ignore */ }

  // Watch for DOM changes inside header that may affect its size (e.g. language switcher opening)
  try {
    if (header && window.MutationObserver) {
      var mo = new MutationObserver(function(mutations) {
        // debounce multiple mutations
        if (mo._timer) clearTimeout(mo._timer);
        mo._timer = setTimeout(function() { updateHeaderHeight(); }, 60);
      });
      mo.observe(header, { attributes: true, childList: true, subtree: true });
    }
  } catch (err) { /* ignore */ }

  // Fallback re-measure after a short delay in case dynamic fonts or late content adjust sizes
  setTimeout(updateHeaderHeight, 300);

  // Ensure language-switcher toggling works on mobile (compact)
  var langSwitcher = document.querySelector('.language-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', function(e){
      var clicked = e.target.closest('.lang-btn');
      if (!clicked) return;
      if (clicked.classList.contains('active')) {
        langSwitcher.classList.toggle('open');
        e.stopPropagation();
      } else {
        langSwitcher.classList.remove('open');
      }
    });
    // close when clicking outside (already in other handlers but safe)
    document.addEventListener('click', function(e){ if (!e.target.closest('.language-switcher')) langSwitcher.classList.remove('open'); });
  }
});
