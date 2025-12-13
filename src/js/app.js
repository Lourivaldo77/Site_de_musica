/**
 * Aplicação principal
 * Inicializa todos os componentes e serviços
 */

import { navComponent } from './components/nav.component.js';
import { playerComponent } from './components/player.component.js';
import { authService } from './services/auth.service.js';
import { playerService } from './services/player.service.js';
import { PATHS } from '../../config/paths.js';

// Sample tracks para demonstração
const SAMPLE_TRACKS = [
  { title: 'Sample 1', artist: 'Drake', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', art: 'https://picsum.photos/200/200?random=11' },
  { title: 'Sample 2', artist: 'Bad Bunny', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', art: 'https://picsum.photos/200/200?random=12' },
  { title: 'Sample 3', artist: 'Taylor Swift', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', art: 'https://picsum.photos/200/200?random=13' },
  { title: 'Sample 4', artist: 'The Weeknd', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', art: 'https://picsum.photos/200/200?random=14' },
  { title: 'Sample 5', artist: 'Ed Sheeran', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', art: 'https://picsum.photos/200/200?random=15' },
  { title: 'Sample 6', artist: 'Billie Eilish', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', art: 'https://picsum.photos/200/200?random=16' },
  { title: 'Sample 7', artist: 'Ariana Grande', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', art: 'https://picsum.photos/200/200?random=17' },
  { title: 'Sample 8', artist: 'BTS', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', art: 'https://picsum.photos/200/200?random=18' },
  { title: 'Sample 9', artist: 'Dua Lipa', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', art: 'https://picsum.photos/200/200?random=19' },
  { title: 'Sample 10', artist: 'Post Malone', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', art: 'https://picsum.photos/200/200?random=20' },
  { title: 'Sample 11', artist: 'Rihanna', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', art: 'https://picsum.photos/200/200?random=21' },
  { title: 'Sample 12', artist: 'Kendrick Lamar', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', art: 'https://picsum.photos/200/200?random=22' }
];

class App {
  constructor() {
    this.initialized = false;
  }

  /**
   * Inicializa a aplicação
   */
  async init() {
    if (this.initialized) return;

    try {
      // Inicializa componentes
      await navComponent.init();
      await playerComponent.init();

      // Configura fila inicial do player
      playerService.setQueue(SAMPLE_TRACKS);
      
      // Restaura track salva
      const savedState = playerService.getState();
      if (savedState.currentTrack) {
        playerService.loadTrack(savedState.currentIndex);
        if (savedState.currentTime > 0) {
          setTimeout(() => {
            playerService.seek(savedState.currentTime);
          }, 500);
        }
      }

      // Expõe serviços globalmente para debug (apenas em dev)
      if (!window.location.hostname.includes('localhost') === false) {
        window.app = {
          auth: authService,
          player: playerService
        };
      }

      this.initialized = true;
      console.log('✅ Aplicação inicializada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao inicializar aplicação:', error);
    }
  }
}

// Inicializa quando DOM estiver pronto
const app = new App();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

export default app;

