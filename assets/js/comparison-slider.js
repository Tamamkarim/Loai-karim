// Video Comparison Slider - Interactive Before/After
(function() {
  const slider = document.getElementById('videoComparisonSlider');
  const afterContainer = document.getElementById('afterContainer');
  const handle = document.getElementById('sliderHandle');
  const beforeVideo = document.getElementById('beforeVideo');
  const afterVideo = document.getElementById('afterVideo');
  
  if (!slider || !afterContainer || !handle) return;
  
  let isActive = false;
  let currentPosition = 50; // Start at 50%
  
  // Auto-play videos when in view
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        beforeVideo.play().catch(() => {});
        afterVideo.play().catch(() => {});
      } else {
        beforeVideo.pause();
        afterVideo.pause();
      }
    });
  }, observerOptions);
  
  observer.observe(slider);
  
  // Update slider position
  function updateSlider(position) {
    // Clamp position between 0 and 100
    currentPosition = Math.max(0, Math.min(100, position));
    
    // Update after container clip
    afterContainer.style.clipPath = `inset(0 0 0 ${currentPosition}%)`;
    
    // Update handle position
    handle.style.left = `${currentPosition}%`;
  }
  
  // Get position from event
  function getPositionFromEvent(event) {
    const rect = slider.getBoundingClientRect();
    const x = (event.type.includes('touch')) ? event.touches[0].clientX : event.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    return position;
  }
  
  // Mouse/Touch start
  function handleStart(event) {
    isActive = true;
    slider.style.cursor = 'ew-resize';
    
    if (event.type === 'mousedown') {
      event.preventDefault();
    }
  }
  
  // Mouse/Touch move
  function handleMove(event) {
    if (!isActive) return;
    
    const position = getPositionFromEvent(event);
    updateSlider(position);
  }
  
  // Mouse/Touch end
  function handleEnd() {
    isActive = false;
    slider.style.cursor = 'ew-resize';
  }
  
  // Event listeners
  slider.addEventListener('mousedown', handleStart);
  slider.addEventListener('touchstart', handleStart, { passive: true });
  
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: true });
  
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('touchend', handleEnd);
  
  // Click on slider to move handle
  slider.addEventListener('click', (event) => {
    const position = getPositionFromEvent(event);
    updateSlider(position);
  });
  
  // Sync video playback
  beforeVideo.addEventListener('play', () => {
    if (afterVideo.paused) {
      afterVideo.play().catch(() => {});
    }
  });
  
  afterVideo.addEventListener('play', () => {
    if (beforeVideo.paused) {
      beforeVideo.play().catch(() => {});
    }
  });
  
  // Sync video time periodically
  setInterval(() => {
    if (Math.abs(beforeVideo.currentTime - afterVideo.currentTime) > 0.5) {
      afterVideo.currentTime = beforeVideo.currentTime;
    }
  }, 1000);
  
  // Initial position
  updateSlider(50);
  
  // Animation on load
  setTimeout(() => {
    let progress = 50;
    const animateSlider = setInterval(() => {
      progress += 0.5;
      updateSlider(progress);
      
      if (progress >= 70) {
        clearInterval(animateSlider);
        setTimeout(() => {
          let backProgress = 70;
          const animateBack = setInterval(() => {
            backProgress -= 0.5;
            updateSlider(backProgress);
            
            if (backProgress <= 50) {
              clearInterval(animateBack);
            }
          }, 10);
        }, 300);
      }
    }, 10);
  }, 500);
})();
