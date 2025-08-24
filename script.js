// Global variables
let video;
let isMuted = true;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    video = document.getElementById('bg-video');
    setupVideo();
});

// Entrance page functionality
function enterSite() {
    const entrancePage = document.getElementById('entrance-page');
    const mainPage = document.getElementById('main-page');
    
    entrancePage.classList.remove('active');
    
    setTimeout(() => {
        mainPage.classList.add('active');
        // Start video playback with sound
        if (video) {
            video.muted = false;
            video.play().catch(e => console.log('Video autoplay failed:', e));
            
            // Update volume icon to show unmuted state
            isMuted = false;
            const volumeIcon = document.getElementById('volume-icon');
            volumeIcon.innerHTML = `
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            `;
        }
    }, 500);
}

// Video setup
function setupVideo() {
    if (!video) return;
    
    // Set initial volume
    video.volume = 0.5;
    
    // Handle video errors
    video.addEventListener('error', function(e) {
        console.error('Video error:', e);
    });
    
    // Handle video loading
    video.addEventListener('loadeddata', function() {
        console.log('Video loaded successfully');
    });
}

// Volume controls
function toggleMute() {
    if (!video) return;
    
    isMuted = !isMuted;
    video.muted = isMuted;
    
    const volumeIcon = document.getElementById('volume-icon');
    if (isMuted) {
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
        `;
    } else {
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        `;
    }
}

function changeVolume(value) {
    if (!video) return;
    
    const volume = parseFloat(value);
    video.volume = volume;
    
    // Update mute state based on volume
    if (volume === 0) {
        isMuted = true;
        video.muted = true;
    } else {
        isMuted = false;
        video.muted = false;
    }
    
    // Update icon
    const volumeIcon = document.getElementById('volume-icon');
    if (volume === 0 || isMuted) {
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
        `;
    } else {
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        `;
    }
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && document.getElementById('main-page').classList.contains('active')) {
        e.preventDefault();
        toggleMute();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Ensure video maintains aspect ratio
    if (video) {
        const windowRatio = window.innerWidth / window.innerHeight;
        const videoRatio = video.videoWidth / video.videoHeight;
        
        if (windowRatio > videoRatio) {
            video.style.width = '100%';
            video.style.height = 'auto';
        } else {
            video.style.width = 'auto';
            video.style.height = '100%';
        }
    }
});

// Preload images
window.addEventListener('load', function() {
    const avatarImg = new Image();
    avatarImg.src = 'https://filipespan.github.io/lovable-uploads/f7f9a314-e59c-46e6-ab26-69c6c1b535fc.png';
});

// Activate main page on any key press
document.addEventListener('keydown', function() {
    const entrancePage = document.getElementById('entrance-page');
    if (entrancePage.classList.contains('active')) {
        enterSite();
    }
});