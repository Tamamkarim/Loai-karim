/* Scroll Reveal Animation */

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll(){
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if(elementTop < windowHeight - 80){
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();
/* Multi-language content (keeps previous translations, adjusted lines) */
const i18n = {
  en: {
    dir: "ltr",
    brandTitle: "LK Renovation",
    brandSubtitle: "Home Renovation & Interior Design — Swedish experience",
    heroTitle: "Professional home renovation & interior design",
    heroText: "We transform homes into beautiful, functional spaces — kitchens, floors, paint, electrical, and ceiling lighting.",
    services: [
      {title:"Kitchen Renovation", text:"Design & build: cabinets, counters, plumbing and finishing."},
      {title:"Flooring", text:"Premium installation: hardwood, laminate, vinyl."},
      {title:"Wall Painting", text:"Durable European paints and modern finishes."},
      {title:"Electrical Works", text:"Safe upgrades and modern wiring."},
      {title:"Ceiling Lighting", text:"Custom recessed & decorative lighting."},
      {title:"Project Management", text:"From planning to delivery — timelines & quality control."}
    ],
    aboutTitle: "About LK Renovation",
    aboutText: "My name is Louai Karim. I specialize in home renovation with strong experience developed in Sweden. I focus on detail, safety and modern design.",
    contactBtn: "Contact Now",
    contactBtnSidebar: "Contact via WhatsApp",
    contactInfo: "WhatsApp: +46 761429023",
    whyTitle: "Why choose us?",
    whyList: ["Swedish standards","Transparent pricing","High-quality materials","Fast communication"],
    footer: "© {year} LK Renovation — All rights reserved",
    videoShowcaseTitle: "Watch Our Projects",
    videoShowcaseDesc: "Browse videos to see the quality of our work",
    video1Title: "Project Before Renovation",
    video1Desc: "Initial condition of the home",
    video2Title: "Project During Work",
    video2Desc: "Stages of implementation and renovation",
    video3Title: "Final Result",
    video3Desc: "Home after complete renovation",
    // Testimonials
    testimonialsTitle: "What Our Clients Say",
    testimonialsDesc: "Reviews from our valued clients",
    testimonial1Text: "Excellent and professional work! My kitchen was renovated professionally and on time. The result exceeded my expectations.",
    testimonial1Name: "Ahmed Al-Saeed",
    testimonial1Location: "Stenungsund",
    testimonial2Text: "Excellent service and reasonable prices. Professional team and high-quality materials. I recommend this company.",
    testimonial2Name: "Fatima Omar",
    testimonial2Location: "Sweden",
    testimonial3Text: "My entire home was renovated. Precise work and timely delivery. Thank you for this amazing achievement.",
    testimonial3Name: "Abdullah",
    testimonial3Location: "Örebro",
    testimonial4Text: "The best renovation company I've worked with. Reliability in schedules and high quality made me a permanent customer.",
    testimonial4Name: "Ahmed Karim",
    testimonial4Location: "Helsinki",
    // Footer
    footerContactTitle: "Contact Us",
    footerLocation: "Sweden",
    footerEmail: "louai.karim2009@gmail.com",
    footerPhone: "+46 76 142 9023",
    footerServicesTitle: "Our Services",
    footerServicesList: ["✓ Kitchen Renovation", "✓ Wall Painting", "✓ Floor Installation"],
    footerAboutTitle: "Our History",
    footerRating: "Rating 4/5 from our clients",
    footerCopyright: "© {year} All rights reserved — Master Renovation",
    footerDeveloped: "Developed with 💗 in Sweden",
    // Gallery Before/After
    galleryTitle: "Before / After",
    beforeText: "Before",
    afterText: "After",
    // Navigation
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Services",
    navGallery: "References",
    navTestimonials: "Contact Us",
    navContact: "Email Us",
    // Services Dropdown
    dropService1: "Kitchen Renovation",
    dropService2: "Bathroom Renewal",
    dropService3: "Kitchen Renewal",
    dropService4: "Painting Service",
    dropService5: "Wallpaper"
  },
  sv: {
    dir: "ltr",
    brandTitle: "LK Renovering",
    brandSubtitle: "Hemrenovering & Inredning — Erfarenhet från Sverige",
    heroTitle: "Professionell hemrenovering och inredning",
    heroText: "Vi förvandlar hem till vackra och funktionella utrymmen — kök, golv, måleri, el och takbelysning.",
    services: [
      {title:"Köksrenovering", text:"Design och bygg: skåp, bänkskivor och VVS."},
      {title:"Golv", text:"Högkvalitativ installation: parkett, laminat, vinyl."},
      {title:"Väggmålning", text:"Hållbara europeiska färger och moderna ytbehandlingar."},
      {title:"Elarbete", text:"Säkra uppgraderingar och moderna elsystem."},
      {title:"Takbelysning", text:"Skräddarsydd infälld och dekorativ belysning."},
      {title:"Projektledning", text:"Från planering till leverans — tidplan & kvalitetskontroll."}
    ],
    aboutTitle: "Om LK Renovering",
    aboutText: "Jag heter Louai Karim. Jag är specialiserad på hemrenovering med lång erfarenhet utvecklad i Sverige. Jag fokuserar på detaljer, säkerhet och modern design.",
    contactBtn: "Kontakta oss",
    contactBtnSidebar: "Kontakta via WhatsApp",
    whyTitle: "Varför välja oss?",
    whyList: ["Svenska standarder","Transparent prissättning","Material av hög kvalitet","Snabb kommunikation"],
    footer: "© {year} LK Renovering — Alla rättigheter förbehållna",
    videoShowcaseTitle: "Se Våra Projekt",
    videoShowcaseDesc: "Bläddra igenom videor för att se kvaliteten på vårt arbete",
    video1Title: "Projekt Före Renovering",
    video1Desc: "Hemmet i ursprungligt skick",
    video2Title: "Projekt Under Arbete",
    video2Desc: "Genomförande- och renoveringsstadier",
    video3Title: "Slutresultat",
    video3Desc: "Hemmet efter komplett renovering",
    // Testimonials
    testimonialsTitle: "Vad våra kunder säger",
    testimonialsDesc: "Recensioner från våra uppskattade kunder",
    testimonial1Text: "Utmärkt och professionellt arbete! Mitt kök renoverades professionellt och i tid. Resultatet överträffade mina förväntningar.",
    testimonial1Name: "Ahmed Al-Saeed",
    testimonial1Location: "Stenungsund",
    testimonial2Text: "Utmärkt service och rimliga priser. Professionellt team och högkvalitativa material. Jag rekommenderar detta företag.",
    testimonial2Name: "Fatima Omar",
    testimonial2Location: "Sverige",
    testimonial3Text: "Mitt hela hem renoverades. Precist arbete och leverans i tid. Tack för denna fantastiska prestation.",
    testimonial3Name: "Abdullah",
    testimonial3Location: "Örebro",
    testimonial4Text: "Det bästa renoveringsföretaget jag har arbetat med. Tillförlitlighet i tidsscheman och hög kvalitet gjorde mig till en permanent kund.",
    testimonial4Name: "Ahmed Karim",
    testimonial4Location: "Helsingfors",
    // Footer
    footerContactTitle: "Kontakta oss",
    footerLocation: "Sverige",
    footerEmail: "louai.karim2009@gmail.com",
    footerPhone: "076-142 90 23",
    footerServicesTitle: "Våra tjänster",
    footerServicesList: ["✓ Köksrenovering", "✓ Väggmålning", "✓ Golvinstallation"],
    footerAboutTitle: "Vår historia",
    footerRating: "Betyg 4/5 från våra kunder",
    footerCopyright: "© {year} Alla rättigheter förbehållna — Mästare Renovering",
    footerDeveloped: "Utvecklad med 💗 i Sverige",
    // Gallery Before/After
    galleryTitle: "Före / Efter",
    beforeText: "Före",
    afterText: "Efter",
    // Navigation
    navHome: "Hem",
    navAbout: "Om oss",
    navServices: "Tjänster",
    navGallery: "Referenser",
    navTestimonials: "Kontakta oss",
    navContact: "Kontakta oss via e-post",
    // Services Dropdown
    dropService1: "Köksrenovering",
    dropService2: "Badrums renovering",
    dropService3: "Köks renovering",
    dropService4: "Målerij tjänst",
    dropService5: "Tapet"
  }
};

const state = { lang: 'fi' };

function setText(id, text){
  const el = document.getElementById(id);
  if(el) el.textContent = text;
}

function setHTML(id, html){
  const el = document.getElementById(id);
  if(el) el.innerHTML = html;
}

function render(lang){
  const data = i18n[lang] || i18n.en;
  state.lang = lang;

  // direction
  document.documentElement.lang = lang;
  document.getElementById('siteRoot').setAttribute('dir', data.dir || 'ltr');
  document.getElementById('siteRoot').style.direction = data.dir || 'ltr';

  // header texts
  setText('brandTitle', data.brandTitle);
  setText('brandSubtitle', data.brandSubtitle);
  setText('heroTitle', data.heroTitle);
  setText('heroText', data.heroText);
  setText('aboutTitle', data.aboutTitle);
  setText('aboutText', data.aboutText);
  setText('whyTitle', data.whyTitle);
  
  // Contact buttons
  setText('contactBtn', data.contactBtn);
  setText('contactBtnSidebar', data.contactBtnSidebar);
  
  // video section texts
  setText('videoShowcaseTitle', data.videoShowcaseTitle);
  setText('videoShowcaseDesc', data.videoShowcaseDesc);
  setText('video1Title', data.video1Title);
  setText('video1Desc', data.video1Desc);
  setText('video2Title', data.video2Title);
  setText('video2Desc', data.video2Desc);
  setText('video3Title', data.video3Title);
  setText('video3Desc', data.video3Desc);

  // Testimonials section texts
  setText('testimonialsTitle', data.testimonialsTitle);
  setText('testimonialsDesc', data.testimonialsDesc);
  setText('testimonial1Text', data.testimonial1Text);
  setText('testimonial1Name', data.testimonial1Name);
  setText('testimonial1Location', data.testimonial1Location);
  setText('testimonial2Text', data.testimonial2Text);
  setText('testimonial2Name', data.testimonial2Name);
  setText('testimonial2Location', data.testimonial2Location);
  setText('testimonial3Text', data.testimonial3Text);
  setText('testimonial3Name', data.testimonial3Name);
  setText('testimonial3Location', data.testimonial3Location);
  setText('testimonial4Text', data.testimonial4Text);
  setText('testimonial4Name', data.testimonial4Name);
  setText('testimonial4Location', data.testimonial4Location);

  // Gallery texts (Before/After)
  setText('galleryTitle', data.galleryTitle);
  document.querySelectorAll('.figcaption-before').forEach(el => el.textContent = data.beforeText);
  document.querySelectorAll('.figcaption-after').forEach(el => el.textContent = data.afterText);

  // Navigation texts
  setText('navHome', data.navHome);
  setText('navAbout', data.navAbout);
  setText('navServices', data.navServices);
  setText('navGallery', data.navGallery);
  setText('navTestimonials', data.navTestimonials);
  setText('navContact', data.navContact);

  // Services Dropdown
  setText('dropService1', data.dropService1);
  setText('dropService2', data.dropService2);
  setText('dropService3', data.dropService3);
  setText('dropService4', data.dropService4);
  setText('dropService5', data.dropService5);

  // Footer texts
  setText('footerContactTitle', data.footerContactTitle);
  setText('footerLocation', data.footerLocation);
  setText('footerEmail', data.footerEmail);
  setText('footerPhone', data.footerPhone);
  setText('footerServicesTitle', data.footerServicesTitle);
  setText('footerAboutTitle', data.footerAboutTitle);
  setText('footerRating', data.footerRating);
  
  // Footer services list
  const footerServicesList = document.getElementById('footerServicesList');
  if(footerServicesList && data.footerServicesList){
    footerServicesList.innerHTML = '';
    data.footerServicesList.forEach(service => {
      const li = document.createElement('li');
      li.textContent = service;
      footerServicesList.appendChild(li);
    });
  }

  // services grid
  const servicesList = document.getElementById('servicesList');
  servicesList.innerHTML = '';
  
  // Service icons mapping
  const serviceIcons = [
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
    </svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>`
  ];
  
  (data.services || []).forEach((s, index)=>{
    const card = document.createElement('div');
    card.className = 'service-card';
    
    const iconSvg = serviceIcons[index] || serviceIcons[0];
    const iconColor = index % 2 === 0 ? 'rgba(31,58,116,0.8)' : 'rgba(139,94,60,0.8)';
    
    card.innerHTML = `
      <div class="service-icon" style="color: ${iconColor}">
        ${iconSvg}
      </div>
      <div class="service-card-content">
        <h4>${s.title}</h4>
        <p>${s.text}</p>
      </div>
    `;
    servicesList.appendChild(card);
  });

  // why list
  const whyList = document.getElementById('whyList');
  whyList.innerHTML = '';
  (data.whyList || []).forEach(it=>{
    const li = document.createElement('li');
    li.textContent = it;
    whyList.appendChild(li);
  });

  // footer year and copyright
  const year = new Date().getFullYear();
  setText('year', year);
  setText('footerCopyright', (data.footerCopyright || '').replace('{year}', year));
  setText('footerDeveloped', data.footerDeveloped);

  // lang buttons active
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // font-family switch for arabic
  if(data.dir === 'rtl'){
    document.body.style.fontFamily = 'Cairo, Inter, sans-serif';
  } else {
    document.body.style.fontFamily = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial';
  }
}

// initial render
render(state.lang);

// language buttons events
document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> render(btn.dataset.lang) );
});

// contact buttons open whatsapp / mail
function openContact(){
  const phone = '+46761429023'; // example - replace with your number
  const wa = 'https://wa.me/' + phone.replace(/[^0-9]/g,'');
  window.open(wa, '_blank');
}
document.getElementById('contactBtn').addEventListener('click', (e)=>{ e.preventDefault(); openContact(); });
document.getElementById('contactBtnSidebar').addEventListener('click', (e)=>{ e.preventDefault(); openContact(); });

// Keyboard quick language (Alt+1/2/3)
window.addEventListener('keydown', (e)=>{
  if(e.altKey && !e.ctrlKey && !e.metaKey){
    if(e.key === '1') render('ar');
    if(e.key === '2') render('en');
    if(e.key === '3') render('sv');
  }
});

// small: fill initial why list if empty
if(!document.getElementById('whyList').children.length){
  const defaultWhy = i18n[state.lang].whyList || [];
  defaultWhy.forEach(it=>{
    const li = document.createElement('li');
    li.textContent = it;
    document.getElementById('whyList').appendChild(li);
  });
}

// Service Modal Functionality
const serviceData = {
  kitchen: {
    en: {
      title: "Kitchen Renovation in Östersund",
      description: "To successfully renovate your kitchen in Östersund, it is essential to engage experts specialized in this field. At Odéns Byggservice, we understand the importance of designing a beautiful and functional kitchen that meets your needs and desires.\n\nBy choosing us at  for your kitchen renovation in Östersund, you can be confident that you are working with experienced and reliable experts. We have extensive experience in this field and have completed many successful renovation projects.",
      features: [
        "Beautiful and functional kitchen design that meets your needs",
        "Experienced and reliable experts",
        "From design and material selection to implementation",
        "Garantee that the result exceeds your expectations"
      ],
      image: "assets/images/projects/lataus3.jpg"
    },
    sv: {
      title: "Köksrenovering i Östersund",
      description: "För att lyckas med din köksrenovering i Östersund är det nödvändigt att anlita experter som är specialiserade inom området. På Odéns Byggservicellä ymmärrämme kauniin ja toimivan keittiön suunnittelun tärkeyden, joka vastaa tarpeisiisi ja toiveisiisi.\n\nGenom att välja oss på Odénsillä keittiöremonttiisi Östersundissa, voit olla varma, että työskentelet kokeneiden ja luotettavien asiantuntijoiden kanssa. Meillä on laaja kokemus alalta ja olemme toteuttaneet monia onnistuneita remonttiprojekteja.",
      features: [
        "Vackert och funktionellt kök design som uppfyller dina behov",
        "Erfarna och pålitliga experter",
        "Från design och materialval till genomförande",
        "Garanti att resultatet överträffar dina förväntningar"
      ],
      image: "assets/images/projects/lataus3.jpg"
    }
  },
  painting: {
    en: {
      title: "Professional Painting Service",
      description: "We offer high-quality professional painting services for your home or office. We use the best materials and modern techniques to ensure perfect results that last.",
      features: [
        "Use of high-quality European paints",
        "Professional surface preparation",
        "Modern and durable finishes",
        "Competitive and transparent pricing"
      ],
      image: "assets/images/projects/lataus5.jpg"
    },
    sv: {
      title: "Professionell Målningstjänst",
      description: "Vi erbjuder högkvalitativa professionella målningstjänster för ditt hem eller kontor. Vi använder de bästa materialen och moderna tekniker för att säkerställa perfekta resultat som varar.",
      features: [
        "Användning av högkvalitativa europeiska färger",
        "Professionell ytberedning",
        "Moderna och hållbara ytbehandlingar",
        "Konkurrenskraftiga och transparenta priser"
      ],
      image: "assets/images/projects/lataus5.jpg"
    }
  },
  wallpaper: {
    en: {
      title: "Wallpaper Installation",
      description: "Professional wallpaper installation service to add a unique aesthetic touch to your home. We work with the best types of wallpaper and ensure perfect installation.",
      features: [
        "Wide range of designs and patterns",
        "Precise and professional installation",
        "Free design consultations",
        "Warranty on work and materials"
      ],
      image: "assets/images/projects/lataus4.jpg"
    },
    sv: {
      title: "Tapetsering",
      description: "Professionell tapetstjänst för att ge ditt hem en unik estetisk touch. Vi arbetar med de bästa tapeterna och garanterar perfekt installation.",
      features: [
        "Brett utbud av designer och mönster",
        "Precis och professionell installation",
        "Gratis designkonsultationer",
        "Garanti på arbete och material"
      ],
      image: "assets/images/projects/lataus4.jpg"
    }
  }
};

const modal = document.getElementById('serviceModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalContactBtn = document.getElementById('modalContactBtn');

function openServiceModal(serviceType) {
  const lang = state.lang;
  const data = serviceData[serviceType][lang];
  
  if (!data) return;
  
  document.getElementById('modalServiceTitle').textContent = data.title;
  document.getElementById('modalServiceDescription').textContent = data.description;
  document.getElementById('modalServiceImage').src = data.image;
  
  const featuresContainer = document.getElementById('modalServiceFeatures');
  featuresContainer.innerHTML = '';
  data.features.forEach(feature => {
    const div = document.createElement('div');
    div.className = 'modal-feature-item';
    div.textContent = feature;
    featuresContainer.appendChild(div);
  });
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Event listeners for service items
document.querySelectorAll('[data-service]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const serviceType = e.currentTarget.dataset.service;
    openServiceModal(serviceType);
  });
});

modalClose.addEventListener('click', closeServiceModal);
modalOverlay.addEventListener('click', closeServiceModal);
modalContactBtn.addEventListener('click', openContact);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeServiceModal();
  }
});

// Mobile Navigation Enhancement
// Make dropdown work with click/tap on mobile
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const dropdownLink = dropdown.querySelector('.nav-link');
  
  if (dropdownLink) {
    dropdownLink.addEventListener('click', (e) => {
      // Only prevent default and toggle on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();
        
        // Close other dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      }
    });
  }
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
});

// reveal animation
const revealElements = document.querySelectorAll(
  '.hero, .service-card, .video-showcase, .testimonials-section, .gallery, aside .card'
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

/* COUNTER ANIMATION */

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const counter = entry.target;
      const target = +counter.dataset.target;
      let current = 0;
      const increment = target / 80;
      const updateCounter = () => {
        current += increment;
        if(current < target){
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        }else{
          if(target === 100){
            counter.innerText = target + '%';
          }else if(target === 24){
            counter.innerText = '24/7';
          }else{
            counter.innerText = target + '+';
          }
        }
      };
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});

/* LOADER */

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1200);
});

/* CURSOR GLOW */

const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
