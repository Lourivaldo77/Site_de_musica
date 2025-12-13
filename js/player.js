/**
 * Player de Música Moderno
 */

import { TRACKS, formatTime } from './data.js';

class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.currentTrack = null;
    this.queue = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.volume = 0.7;
    this.shuffle = false;
    this.repeat = 'off'; // 'off', 'one', 'all'
    this.currentTime = 0;
    this.duration = 0;
    
    this.init();
  }

  init() {
    this.setupAudio();
    this.setupUI();
    this.loadState();
  }

  setupAudio() {
    this.audio.volume = this.volume;
    this.audio.preload = 'auto';

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
      this.updateDuration();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this.updateProgress();
      this.saveState();
    });

    this.audio.addEventListener('ended', () => {
      this.handleTrackEnd();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updatePlayButton();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updatePlayButton();
    });
  }

  setupUI() {
    // Play/Pause button
    const playBtn = document.getElementById('play-pause-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previous());
    }

    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }

    // Progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.seek(percent * this.duration);
      });
    }

    // Volume control
    const volumeBtn = document.getElementById('volume-btn');
    if (volumeBtn) {
      volumeBtn.addEventListener('click', () => this.toggleMute());
    }

    const volumeSlider = document.querySelector('.volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('click', (e) => {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.setVolume(percent);
      });
    }

    // Shuffle button
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    }

    // Repeat button
    const repeatBtn = document.getElementById('repeat-btn');
    if (repeatBtn) {
      repeatBtn.addEventListener('click', () => this.toggleRepeat());
    }

    // Like button
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
      likeBtn.addEventListener('click', () => this.toggleLike());
    }
  }

  loadTrack(track) {
    this.currentTrack = track;
    this.audio.src = track.audio;
    this.audio.load();
    this.updateTrackInfo();
    this.saveState();
  }

  playTrack(track) {
    this.loadTrack(track);
    this.play();
  }

  setQueue(tracks) {
    this.queue = [...tracks];
    this.currentIndex = 0;
    if (this.queue.length > 0) {
      this.loadTrack(this.queue[0]);
    }
  }

  play() {
    this.audio.play().catch(err => {
      console.error('Erro ao reproduzir:', err);
    });
  }

  pause() {
    this.audio.pause();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  next() {
    if (this.shuffle) {
      const randomIndex = Math.floor(Math.random() * this.queue.length);
      this.currentIndex = randomIndex;
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.queue.length;
    }
    
    if (this.queue[this.currentIndex]) {
      this.loadTrack(this.queue[this.currentIndex]);
      this.play();
    }
  }

  previous() {
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }

    if (this.shuffle) {
      const randomIndex = Math.floor(Math.random() * this.queue.length);
      this.currentIndex = randomIndex;
    } else {
      this.currentIndex = (this.currentIndex - 1 + this.queue.length) % this.queue.length;
    }
    
    if (this.queue[this.currentIndex]) {
      this.loadTrack(this.queue[this.currentIndex]);
      this.play();
    }
  }

  seek(time) {
    this.audio.currentTime = time;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.volume;
    this.updateVolumeUI();
    this.saveState();
  }

  toggleMute() {
    if (this.audio.muted) {
      this.audio.muted = false;
    } else {
      this.audio.muted = true;
    }
    this.updateVolumeUI();
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
    this.updateShuffleUI();
    this.saveState();
  }

  toggleRepeat() {
    if (this.repeat === 'off') {
      this.repeat = 'one';
    } else if (this.repeat === 'one') {
      this.repeat = 'all';
    } else {
      this.repeat = 'off';
    }
    this.updateRepeatUI();
    this.saveState();
  }

  toggleLike() {
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
      likeBtn.classList.toggle('active');
    }
  }

  handleTrackEnd() {
    if (this.repeat === 'one') {
      this.audio.currentTime = 0;
      this.play();
    } else if (this.repeat === 'all') {
      this.next();
    } else {
      this.next();
    }
  }

  updateTrackInfo() {
    if (!this.currentTrack) return;

    const trackImage = document.querySelector('.player-track-image');
    const trackTitle = document.querySelector('.player-track-title');
    const trackArtist = document.querySelector('.player-track-artist');

    if (trackImage) trackImage.src = this.currentTrack.image;
    if (trackTitle) trackTitle.textContent = this.currentTrack.title;
    if (trackArtist) trackArtist.textContent = this.currentTrack.artist;
  }

  updatePlayButton() {
    const playBtn = document.getElementById('play-pause-btn');
    if (!playBtn) return;

    const svg = playBtn.querySelector('svg');
    if (this.isPlaying) {
      svg.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
    } else {
      svg.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
  }

  updateProgress() {
    const progressFill = document.querySelector('.progress-bar-fill');
    const currentTimeEl = document.querySelector('.player-current-time');
    const durationEl = document.querySelector('.player-duration');

    if (progressFill && this.duration > 0) {
      const percent = (this.currentTime / this.duration) * 100;
      progressFill.style.width = `${percent}%`;
    }

    if (currentTimeEl) {
      currentTimeEl.textContent = formatTime(this.currentTime);
    }

    if (durationEl) {
      durationEl.textContent = formatTime(this.duration);
    }
  }

  updateDuration() {
    const durationEl = document.querySelector('.player-duration');
    if (durationEl) {
      durationEl.textContent = formatTime(this.duration);
    }
  }

  updateVolumeUI() {
    const volumeSliderFill = document.querySelector('.volume-slider-fill');
    const volumeBtn = document.getElementById('volume-btn');
    
    if (volumeSliderFill) {
      const percent = this.audio.muted ? 0 : this.volume * 100;
      volumeSliderFill.style.width = `${percent}%`;
    }

    if (volumeBtn) {
      const svg = volumeBtn.querySelector('svg');
      if (this.audio.muted || this.volume === 0) {
        svg.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
      } else if (this.volume < 0.5) {
        svg.innerHTML = '<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>';
      } else {
        svg.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
      }
    }
  }

  updateShuffleUI() {
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
      shuffleBtn.classList.toggle('active', this.shuffle);
    }
  }

  updateRepeatUI() {
    const repeatBtn = document.getElementById('repeat-btn');
    if (repeatBtn) {
      repeatBtn.classList.toggle('active', this.repeat !== 'off');
      repeatBtn.setAttribute('data-mode', this.repeat);
    }
  }

  saveState() {
    const state = {
      currentTrackId: this.currentTrack?.id,
      currentIndex: this.currentIndex,
      currentTime: this.currentTime,
      volume: this.volume,
      shuffle: this.shuffle,
      repeat: this.repeat,
      isPlaying: this.isPlaying
    };
    localStorage.setItem('playerState', JSON.stringify(state));
  }

  loadState() {
    const saved = localStorage.getItem('playerState');
    if (!saved) {
      // Set default queue
      this.setQueue(TRACKS);
      return;
    }

    try {
      const state = JSON.parse(saved);
      this.volume = state.volume || 0.7;
      this.shuffle = state.shuffle || false;
      this.repeat = state.repeat || 'off';
      
      this.setQueue(TRACKS);
      
      if (state.currentTrackId) {
        const track = TRACKS.find(t => t.id === state.currentTrackId);
        if (track) {
          this.currentIndex = TRACKS.indexOf(track);
          this.loadTrack(track);
          if (state.currentTime) {
            setTimeout(() => {
              this.audio.currentTime = state.currentTime;
            }, 500);
          }
        }
      }
      
      this.updateShuffleUI();
      this.updateRepeatUI();
      this.updateVolumeUI();
    } catch (e) {
      console.error('Erro ao carregar estado:', e);
      this.setQueue(TRACKS);
    }
  }
}

// Export singleton
export const player = new MusicPlayer();

// Global access for HTML
window.musicPlayer = player;
