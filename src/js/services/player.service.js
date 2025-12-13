/**
 * Serviço de player de música
 * Gerencia reprodução, fila, shuffle, repeat e persistência
 */

import { getStorage, setStorage } from '../utils/storage.js';
import { PATHS } from '../../../config/paths.js';
import { APP_CONFIG } from '../config/index.js';

const STORAGE_KEY = PATHS.STORAGE.PLAYER;

class PlayerService {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = APP_CONFIG.player.preload;
    this.audio.volume = APP_CONFIG.player.defaultVolume;

    this.state = {
      queue: [],
      currentIndex: 0,
      currentTime: 0,
      volume: APP_CONFIG.player.defaultVolume,
      shuffle: false,
      repeat: 'off' // 'off' | 'one' | 'all'
    };

    this.listeners = {
      play: [],
      pause: [],
      trackChange: [],
      timeUpdate: [],
      stateChange: []
    };

    this.setupAudioEvents();
    this.loadState();
  }

  /**
   * Configura eventos do elemento audio
   */
  setupAudioEvents() {
    this.audio.addEventListener('play', () => this.notify('play'));
    this.audio.addEventListener('pause', () => this.notify('pause'));
    this.audio.addEventListener('ended', () => this.handleTrackEnd());
    this.audio.addEventListener('timeupdate', () => {
      this.state.currentTime = this.audio.currentTime;
      this.notify('timeUpdate', this.audio.currentTime);
      // Salva estado a cada 5 segundos
      if (Math.floor(this.audio.currentTime) % 5 === 0) {
        this.saveState();
      }
    });
  }

  /**
   * Carrega fila de músicas
   * @param {Array} tracks - Array de tracks
   */
  setQueue(tracks) {
    this.state.queue = [...tracks];
    this.state.currentIndex = 0;
    this.notify('stateChange');
  }

  /**
   * Adiciona tracks à fila
   * @param {Array} tracks - Tracks a adicionar
   * @param {boolean} playNext - Se true, adiciona no início da fila
   */
  addToQueue(tracks, playNext = false) {
    if (playNext) {
      this.state.queue.splice(this.state.currentIndex + 1, 0, ...tracks);
    } else {
      this.state.queue.push(...tracks);
    }
    this.notify('stateChange');
  }

  /**
   * Carrega uma track específica
   * @param {number} index - Índice da track na fila
   */
  loadTrack(index) {
    if (index < 0 || index >= this.state.queue.length) return;

    const track = this.state.queue[index];
    if (!track) return;

    this.audio.src = track.src;
    this.audio.load();
    this.state.currentIndex = index;
    this.saveState();
    this.notify('trackChange', track);
  }

  /**
   * Reproduz a track atual
   */
  async play() {
    try {
      await this.audio.play();
      this.notify('play');
    } catch (error) {
      console.error('Erro ao reproduzir:', error);
    }
  }

  /**
   * Pausa a reprodução
   */
  pause() {
    this.audio.pause();
    this.notify('pause');
  }

  /**
   * Alterna play/pause
   */
  togglePlay() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  /**
   * Vai para próxima track
   */
  next() {
    if (this.state.shuffle) {
      const nextIndex = Math.floor(Math.random() * this.state.queue.length);
      this.loadTrack(nextIndex);
      this.play();
      return;
    }

    const nextIndex = this.state.currentIndex + 1;
    if (nextIndex >= this.state.queue.length) {
      if (this.state.repeat === 'all') {
        this.loadTrack(0);
        this.play();
      } else {
        this.pause();
      }
      return;
    }

    this.loadTrack(nextIndex);
    this.play();
  }

  /**
   * Vai para track anterior
   */
  prev() {
    // Se está nos primeiros 3 segundos, volta ao início
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }

    let prevIndex = this.state.currentIndex - 1;
    if (prevIndex < 0) {
      if (this.state.repeat === 'all') {
        prevIndex = this.state.queue.length - 1;
      } else {
        prevIndex = 0;
      }
    }

    this.loadTrack(prevIndex);
    this.play();
  }

  /**
   * Define volume (0-1)
   * @param {number} volume
   */
  setVolume(volume) {
    this.state.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.state.volume;
    this.saveState();
    this.notify('stateChange');
  }

  /**
   * Alterna shuffle
   */
  toggleShuffle() {
    this.state.shuffle = !this.state.shuffle;
    this.saveState();
    this.notify('stateChange');
  }

  /**
   * Alterna repeat (off -> one -> all -> off)
   */
  toggleRepeat() {
    if (this.state.repeat === 'off') {
      this.state.repeat = 'one';
    } else if (this.state.repeat === 'one') {
      this.state.repeat = 'all';
    } else {
      this.state.repeat = 'off';
    }
    this.saveState();
    this.notify('stateChange');
  }

  /**
   * Define posição de reprodução
   * @param {number} time - Tempo em segundos
   */
  seek(time) {
    if (this.audio.duration) {
      this.audio.currentTime = Math.max(0, Math.min(time, this.audio.duration));
    }
  }

  /**
   * Retorna estado atual
   * @returns {Object}
   */
  getState() {
    return {
      ...this.state,
      currentTrack: this.state.queue[this.state.currentIndex] || null,
      isPlaying: !this.audio.paused,
      duration: this.audio.duration || 0,
      currentTime: this.audio.currentTime || 0
    };
  }

  /**
   * Retorna track atual
   * @returns {Object|null}
   */
  getCurrentTrack() {
    return this.state.queue[this.state.currentIndex] || null;
  }

  /**
   * Salva estado no localStorage
   */
  saveState() {
    const toSave = {
      currentIndex: this.state.currentIndex,
      currentTime: this.audio.currentTime || this.state.currentTime,
      volume: this.state.volume,
      shuffle: this.state.shuffle,
      repeat: this.state.repeat
    };
    setStorage(STORAGE_KEY, toSave);
  }

  /**
   * Carrega estado do localStorage
   */
  loadState() {
    const saved = getStorage(STORAGE_KEY);
    if (!saved) return;

    if (typeof saved.currentIndex === 'number') {
      this.state.currentIndex = saved.currentIndex;
    }
    if (typeof saved.currentTime === 'number') {
      this.state.currentTime = saved.currentTime;
    }
    if (typeof saved.volume === 'number') {
      this.state.volume = saved.volume;
      this.audio.volume = saved.volume;
    }
    if (typeof saved.shuffle === 'boolean') {
      this.state.shuffle = saved.shuffle;
    }
    if (typeof saved.repeat === 'string') {
      this.state.repeat = saved.repeat;
    }
  }

  /**
   * Adiciona listener para eventos
   * @param {string} event - Nome do evento
   * @param {Function} callback - Função callback
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  /**
   * Remove listener
   * @param {string} event - Nome do evento
   * @param {Function} callback - Função callback
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  /**
   * Notifica listeners de um evento
   * @param {string} event - Nome do evento
   * @param {*} data - Dados a passar
   */
  notify(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  /**
   * Trata fim de track
   */
  handleTrackEnd() {
    if (this.state.repeat === 'one') {
      this.audio.currentTime = 0;
      this.play();
      return;
    }
    this.next();
  }

  /**
   * Formata tempo em segundos para string MM:SS
   * @param {number} seconds
   * @returns {string}
   */
  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    const m = Math.floor(seconds / 60);
    return `${m}:${s}`;
  }
}

// Exporta instância singleton
export const playerService = new PlayerService();

