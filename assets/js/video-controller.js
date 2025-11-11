/**
 * نظام إدارة الفيديوهات التفاعلية
 * Interactive Video Management System
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
        if (this.playbackTimer) {
            clearInterval(this.playbackTimer);
        }
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    seekTo(event) {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = clickX / rect.width;
        this.currentTime = percentage * this.duration;
        this.updateDisplay();
        this.updateScenes();
    }
    
    sync() {
        // تأثير بصري للمزامنة
        this.showSyncEffect();
        
        // إعادة تعيين للمزامنة
        if (this.isPlaying) {
            this.currentTime = Math.floor(this.currentTime);
            this.updateDisplay();
        }
    }
    
    updateDisplay() {
        // تحديث شريط التقدم
        const percentage = (this.currentTime / this.duration) * 100;
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
        
        // تحديث الوقت
        const currentTimeEl = document.getElementById('currentTime');
        const totalTimeEl = document.getElementById('totalTime');
        
        if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.currentTime);
        if (totalTimeEl) totalTimeEl.textContent = this.formatTime(this.duration);
    }
    
    updateUI() {
        const playBtn = document.getElementById('playBothBtn');
        const pauseBtn = document.getElementById('pauseAllBtn');
        
        if (playBtn) playBtn.disabled = this.isPlaying;
        if (pauseBtn) pauseBtn.disabled = !this.isPlaying;
        
        // تحديث مظهر الفيديوهات
        const beforeVideo = document.getElementById('beforeVideo');
        const afterVideo = document.getElementById('afterVideo');
        
        if (beforeVideo && afterVideo) {
            if (this.isPlaying) {
                beforeVideo.classList.add('playing');
                afterVideo.classList.add('playing');
            } else {
                beforeVideo.classList.remove('playing');
                afterVideo.classList.remove('playing');
            }
        }
    }
    
    startAnimation() {
        const beforeVideo = document.getElementById('beforeVideo');
        const afterVideo = document.getElementById('afterVideo');
        
        if (beforeVideo && afterVideo) {
            beforeVideo.style.animation = 'videoPlaying 2s ease-in-out infinite';
            afterVideo.style.animation = 'videoPlaying 2s ease-in-out infinite';
        }
    }
    
    stopAnimation() {
        const beforeVideo = document.getElementById('beforeVideo');
        const afterVideo = document.getElementById('afterVideo');
        
        if (beforeVideo && afterVideo) {
            beforeVideo.style.animation = '';
            afterVideo.style.animation = '';
        }
    }
    
    showSyncEffect() {
        const syncBtn = document.getElementById('syncVideosBtn');
        if (syncBtn) {
            const originalText = syncBtn.textContent;
            syncBtn.textContent = '🔄 تمت المزامنة!';
            syncBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            setTimeout(() => {
                syncBtn.textContent = originalText;
                syncBtn.style.background = '';
            }, 2000);
        }
    }
    
    updateScenes() {
        const currentScene = this.getCurrentScene();
        if (currentScene) {
            this.displaySceneInfo(currentScene);
        }
    }
    
    getCurrentScene() {
        const beforeScenes = this.videoData.before.scenes;
        const afterScenes = this.videoData.after.scenes;
        
        // البحث عن المشهد الحالي
        let currentBeforeScene = null;
        let currentAfterScene = null;
        
        for (let i = beforeScenes.length - 1; i >= 0; i--) {
            if (this.currentTime >= beforeScenes[i].time) {
                currentBeforeScene = beforeScenes[i];
                break;
            }
        }
        
        for (let i = afterScenes.length - 1; i >= 0; i--) {
            if (this.currentTime >= afterScenes[i].time) {
                currentAfterScene = afterScenes[i];
                break;
            }
        }
        
        return {
            before: currentBeforeScene,
            after: currentAfterScene
        };
    }
    
    displaySceneInfo(scene) {
        // عرض معلومات المشهد الحالي
        const sceneInfoEl = document.getElementById('sceneInfo');
        if (sceneInfoEl && scene.before && scene.after) {
            sceneInfoEl.innerHTML = `
                <div class="scene-display">
                    <div class="scene-before">
                        <strong>قبل:</strong> ${scene.before.description}
                    </div>
                    <div class="scene-after">
                        <strong>بعد:</strong> ${scene.after.description}
                    </div>
                </div>
            `;
        }
    }
    
    createSceneMarkers() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        // إضافة علامات للمشاهد
        this.videoData.before.scenes.forEach((scene, index) => {
            const marker = document.createElement('div');
            marker.className = 'scene-marker';
            marker.style.cssText = `
                position: absolute;
                left: ${(scene.time / this.duration) * 100}%;
                top: 0;
                width: 2px;
                height: 100%;
                background: #fff;
                opacity: 0.7;
                cursor: pointer;
                z-index: 10;
            `;
            
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                this.currentTime = scene.time;
                this.updateDisplay();
                this.updateScenes();
            });
            
            marker.title = scene.description;
            progressBar.appendChild(marker);
        });
    }
    
    handleKeyPress(event) {
        switch(event.code) {
            case 'Space':
                event.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.currentTime = Math.max(0, this.currentTime - 5);
                this.updateDisplay();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.currentTime = Math.min(this.duration, this.currentTime + 5);
                this.updateDisplay();
                break;
            case 'Digit0':
                event.preventDefault();
                this.currentTime = 0;
                this.updateDisplay();
                break;
        }
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    
    // طرق إضافية للتحكم المتقدم
    setPlaybackRate(rate) {
        this.playbackRate = rate;
        // إعادة تشغيل مع السرعة الجديدة
        if (this.isPlaying) {
            this.pause();
            this.play();
        }
    }
    
    jumpToScene(sceneIndex) {
        if (this.videoData.before.scenes[sceneIndex]) {
            this.currentTime = this.videoData.before.scenes[sceneIndex].time;
            this.updateDisplay();
            this.updateScenes();
        }
    }
    
    toggleFullscreen() {
        const videoContainer = document.getElementById('videoShowcase');
        if (videoContainer) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoContainer.requestFullscreen();
            }
        }
    }
    
    exportProgress() {
        return {
            currentTime: this.currentTime,
            isPlaying: this.isPlaying,
            playbackRate: this.playbackRate
        };
    }
    
    importProgress(data) {
        this.currentTime = data.currentTime || 0;
        this.playbackRate = data.playbackRate || 1.0;
        this.updateDisplay();
        
        if (data.isPlaying && !this.isPlaying) {
            this.play();
        }
    }
}

// إضافة أنماط CSS للتأثيرات
const videoStyles = `
    @keyframes videoPlaying {
        0%, 100% { 
            box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 30px rgba(52, 152, 219, 0.6);
            transform: scale(1.02);
        }
    }
    
    .playing {
        border: 3px solid #3498db !important;
        animation: videoPlaying 2s ease-in-out infinite !important;
    }
    
    .scene-marker:hover {
        background: #3498db !important;
        width: 4px !important;
        opacity: 1 !important;
    }
    
    .scene-display {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 10px;
        background: rgba(52, 152, 219, 0.1);
        border-radius: 8px;
        margin-top: 10px;
    }
    
    .scene-before, .scene-after {
        flex: 1;
        padding: 8px;
        border-radius: 4px;
    }
    
    .scene-before {
        background: rgba(231, 76, 60, 0.1);
        border-left: 3px solid #e74c3c;
    }
    
    .scene-after {
        background: rgba(39, 174, 96, 0.1);
        border-left: 3px solid #27ae60;
    }
`;

// إضافة الأنماط إلى الصفحة
if (!document.getElementById('video-showcase-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'video-showcase-styles';
    styleSheet.textContent = videoStyles;
    document.head.appendChild(styleSheet);
}

// تصدير الكلاس للاستخدام
window.VideoShowcase = VideoShowcase;

// تشغيل تلقائي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('videoShowcase')) {
        window.videoShowcase = new VideoShowcase();
    }
});