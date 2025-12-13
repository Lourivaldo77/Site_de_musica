/**
 * Adaptador de compatibilidade para player
 * Mantém funcionalidade existente enquanto migra para nova arquitetura
 */

import { playerService } from '../src/js/services/player.service.js';
import { playerComponent } from '../src/js/components/player.component.js';

// Sample tracks
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

// Inicializa quando DOM estiver pronto
(async function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  async function init() {
    // Configura fila
    playerService.setQueue(SAMPLE_TRACKS);
    
    // Inicializa componente
    await playerComponent.init();
    
    // Restaura estado salvo
    const state = playerService.getState();
    if (state.currentTrack) {
      playerService.loadTrack(state.currentIndex);
      if (state.currentTime > 0) {
        setTimeout(() => {
          playerService.seek(state.currentTime);
        }, 500);
      }
    }

    // Expõe para compatibilidade
    window.player = {
      play: () => playerService.play(),
      pause: () => playerService.pause(),
      next: () => playerService.next(),
      prev: () => playerService.prev(),
      loadTrack: (i) => playerService.loadTrack(i),
      playTrackAt: (i) => {
        playerService.loadTrack(i);
        playerService.play();
      },
      getState: () => playerService.getState()
    };
  }
})();

