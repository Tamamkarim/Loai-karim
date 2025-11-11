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

// مراقبة قسم الإحصائيات
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

// ==== قبل/بعد viewer ====
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

// ==== Email Service Setup ====
// Skip EmailJS initialization to avoid errors
function initEmailJS() {
  console.log('EmailJS disabled - using mailto fallback');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  setupLazyLoading();
});

// Lazy loading setup
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
  if (typeof emailjs !== 'undefined') {
    emailjs = undefined;
  }
  
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
  // إنشاء عنصر الإشعار
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // إضافة الأنماط
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
  
  // إضافة CSS للحركة
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // إضافة الإشعار للصفحة
  document.body.appendChild(notification);
  
  // إزالة الإشعار بعد 5 ثوان
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// ==== Video Before Renovation Enhancement ====
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('beforeRenovationVideo');
  
  if (video) {
    // تحديث مدة الفيديو في النص عند تحميل البيانات الوصفية
    video.addEventListener('loadedmetadata', function() {
      const duration = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      const durationText = `${duration}:${seconds.toString().padStart(2, '0')}`;
      
      // البحث عن العنصر الذي يحتوي على مدة الفيديو وتحديثه
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

    // إضافة تأثيرات تفاعلية
    video.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
    });

    video.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });

    // تتبع تشغيل الفيديو
    video.addEventListener('play', function() {
      console.log('فيديو قبل الترميم: تم بدء التشغيل');
      // يمكن إضافة تتبع تحليلات هنا
    });

    video.addEventListener('pause', function() {
      console.log('فيديو قبل الترميم: تم إيقاف التشغيل');
    });

    video.addEventListener('ended', function() {
      console.log('فيديو قبل الترميم: انتهى التشغيل');
      // إضافة تأثير أو رسالة عند انتهاء الفيديو
      this.style.filter = 'brightness(0.8)';
      setTimeout(() => {
        this.style.filter = 'brightness(1)';
      }, 2000);
    });

    // تحسين الأداء - تحميل الفيديو عند الحاجة
    const videoContainer = document.querySelector('.video-before-container');
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.load(); // تحميل الفيديو عند ظهوره في المنطقة المرئية
          videoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (videoContainer) {
      videoObserver.observe(videoContainer);
    }

    // إضافة دعم للوحة المفاتيح
    video.addEventListener('keydown', function(e) {
      switch(e.key) {
        case ' ': // مسطرة المسافة
          e.preventDefault();
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
          break;
        case 'ArrowLeft': // السهم الأيسر
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case 'ArrowRight': // السهم الأيمن
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
        case 'f': // ملء الشاشة
        case 'F':
          e.preventDefault();
          if (video.requestFullscreen) {
            video.requestFullscreen();
          }
          break;
      }
    });

    // إضافة tooltip للفيديو
    video.setAttribute('title', 'اضغط مسطرة المسافة للتشغيل/الإيقاف، الأسهم للتنقل، F للشاشة الكاملة');
    video.setAttribute('tabindex', '0'); // جعل الفيديو قابل للتركيز
  }
});