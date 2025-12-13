/**
 * Componente de player de música
 * Gerencia UI do player e integração com PlayerService
 */

import { domReady } from '../utils/dom.js';
import { playerService } from '../services/player.service.js';

class PlayerComponent {
  constructor() {
    this.elements = {};
    this.isInitialized = false;
  }

  /**
   * Inicializa o componente
   */
  async init() {
    await domReady(() => {
      this.findElements();
      this.setupEventListeners();
      this.setupServiceListeners();
      this.updateUI();
      this.isInitialized = true;
    });
  }

  /**
   * Encontra elementos do DOM
   */
  findElements() {
    this.elements = {
      trackArt: document.getElementById('track-art'),
      trackTitle: document.getElementById('track-title'),
      trackArtist: document.getElementById('track-artist'),
      playBtn: document.getElementById('play-btn'),
      prevBtn: document.getElementById('prev-btn'),
      nextBtn: document.getElementById('next-btn'),
      progress: document.getElementById('progress'),
      currentTime: document.getElementById('current-time'),
      duration: document.getElementById('duration'),
      volume: document.getElementById('volume'),
      shuffleBtn: document.getElementById('shuffle-btn'),
      repeatBtn: document.getElementById('repeat-btn'),
      playlistList: document.getElementById('playlist-list')
    };
  }

  /**
   * Configura event listeners dos elementos
   */
  setupEventListeners() {
    const { playBtn, prevBtn, nextBtn, progress, volume, shuffleBtn, repeatBtn } = this.elements;

    if (playBtn) {
      playBtn.addEventListener('click', () => playerService.togglePlay());
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => playerService.prev());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => playerService.next());
    }

    if (progress) {
      progress.addEventListener('input', (e) => {
        const pct = parseFloat(e.target.value);
        if (playerService.audio.duration) {
          const time = (pct / 100) * playerService.audio.duration;
          playerService.seek(time);
        }
      });
    }

    if (volume) {
      volume.addEventListener('input', (e) => {
        playerService.setVolume(parseFloat(e.target.value));
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => playerService.toggleShuffle());
    }

    if (repeatBtn) {
      repeatBtn.addEventListener('click', () => playerService.toggleRepeat());
    }
  }

  /**
   * Configura listeners do serviço
   */
  setupServiceListeners() {
    playerService.on('play', () => this.updatePlayButton(true));
    playerService.on('pause', () => this.updatePlayButton(false));
    playerService.on('trackChange', () => this.updateTrackInfo());
    playerService.on('timeUpdate', () => this.updateTime());
    playerService.on('stateChange', () => this.updateUI());
  }

  /**
   * Atualiza botão de play/pause
   * @param {boolean} isPlaying
   */
  updatePlayButton(isPlaying) {
    if (this.elements.playBtn) {
      this.elements.playBtn.textContent = isPlaying ? '⏸' : '▶';
    }
  }

  /**
   * Atualiza informações da track atual
   */
  updateTrackInfo() {
    const track = playerService.getCurrentTrack();
    if (!track) return;

    if (this.elements.trackArt) {
      this.elements.trackArt.src = track.art || '';
    }
    if (this.elements.trackTitle) {
      this.elements.trackTitle.textContent = track.title || '—';
    }
    if (this.elements.trackArtist) {
      this.elements.trackArtist.textContent = track.artist || '—';
    }

    this.updatePlaylistHighlight();
  }

  /**
   * Atualiza tempo de reprodução
   */
  updateTime() {
    const state = playerService.getState();
    
    if (this.elements.currentTime) {
      this.elements.currentTime.textContent = playerService.formatTime(state.currentTime);
    }
    
    if (this.elements.duration) {
      this.elements.duration.textContent = playerService.formatTime(state.duration);
    }

    if (this.elements.progress && state.duration > 0) {
      const pct = (state.currentTime / state.duration) * 100;
      this.elements.progress.value = pct;
    }
  }

  /**
   * Atualiza UI completa
   */
  updateUI() {
    const state = playerService.getState();
    
    this.updateTrackInfo();
    this.updateTime();
    this.updateShuffleUI(state.shuffle);
    this.updateRepeatUI(state.repeat);
    this.updateVolumeUI(state.volume);
    this.renderPlaylist();
  }

  /**
   * Atualiza UI de shuffle
   * @param {boolean} isActive
   */
  updateShuffleUI(isActive) {
    if (this.elements.shuffleBtn) {
      this.elements.shuffleBtn.classList.toggle('active', isActive);
    }
  }

  /**
   * Atualiza UI de repeat
   * @param {string} mode - 'off' | 'one' | 'all'
   */
  updateRepeatUI(mode) {
    if (!this.elements.repeatBtn) return;

    const icons = {
      off: '🔁',
      one: '🔂',
      all: '🔁*'
    };

    this.elements.repeatBtn.textContent = icons[mode] || icons.off;
    this.elements.repeatBtn.classList.toggle('active', mode !== 'off');
  }

  /**
   * Atualiza UI de volume
   * @param {number} volume
   */
  updateVolumeUI(volume) {
    if (this.elements.volume) {
      this.elements.volume.value = volume;
    }
  }

  /**
   * Renderiza playlist
   */
  renderPlaylist() {
    if (!this.elements.playlistList) return;

    const state = playerService.getState();
    const queue = state.queue;

    this.elements.playlistList.innerHTML = '';

    queue.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = 'playlist-item';
      li.dataset.index = index;
      
      if (index === state.currentIndex) {
        li.classList.add('active');
      }

      li.innerHTML = `
        <img src="${track.art || ''}" class="playlist-item-art" alt="${track.title}">
        <div class="playlist-item-info">
          <div class="playlist-item-title">${track.title || '—'}</div>
          <div class="playlist-item-artist">${track.artist || '—'}</div>
        </div>
        <div class="playlist-item-number">${index + 1}</div>
      `;

      li.addEventListener('click', () => {
        playerService.loadTrack(index);
        playerService.play();
      });

      this.elements.playlistList.appendChild(li);
    });
  }

  /**
   * Destaca item atual na playlist
   */
  updatePlaylistHighlight() {
    if (!this.elements.playlistList) return;

    const items = this.elements.playlistList.querySelectorAll('.playlist-item');
    const currentIndex = playerService.getState().currentIndex;

    items.forEach((item, index) => {
      item.classList.toggle('active', index === currentIndex);
    });
  }
}

// Exporta instância singleton
export const playerComponent = new PlayerComponent();

