/**
 * Aplicação Principal
 */

import { player } from './player.js';
import { ARTISTS, TRACKS, PLAYLISTS, getArtistPageUrl } from './data.js';

class App {
  constructor() {
    this.currentPage = 'home';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupSearch();
    this.setupMusicCards();
    this.setupSidebar();
    this.checkAuth();
  }

  setupNavigation() {
    // Sidebar navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      });
    });

    // Header navigation
    const headerLinks = document.querySelectorAll('.header-nav a');
    headerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      });
    });
  }

  setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
          this.performSearch(query);
        }
      });
    }
  }

  performSearch(query) {
    // Simple search implementation
    const results = {
      tracks: TRACKS.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.artist.toLowerCase().includes(query)
      ),
      artists: ARTISTS.filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.genre.toLowerCase().includes(query)
      ),
      playlists: PLAYLISTS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    };
    
    console.log('Search results:', results);
    // TODO: Display search results
  }

  setupMusicCards() {
    // Play button on music cards
    document.addEventListener('click', (e) => {
      const playButton = e.target.closest('.play-button');
      if (playButton) {
        const card = playButton.closest('.music-card');
        if (card) {
          const trackId = card.dataset.trackId;
          if (trackId) {
            const track = TRACKS.find(t => t.id === trackId);
            if (track) {
              player.playTrack(track);
            }
          }
        }
      }
    });
  }

  setupSidebar() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.classList.toggle('open');
        }
      });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      const sidebar = document.querySelector('.sidebar');
      const menuToggle = document.getElementById('menu-toggle');
      if (sidebar && window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle?.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userMenu = document.querySelector('.user-menu');
      if (userMenu) {
        const user = JSON.parse(currentUser);
        const avatar = userMenu.querySelector('.user-avatar');
        if (avatar) {
          avatar.textContent = user.name.charAt(0).toUpperCase();
        }
      }
    }
  }

  renderHome() {
    // Render featured content
    this.renderFeaturedArtists();
    this.renderRecentlyPlayed();
    this.renderTopTracks();
    this.renderPlaylists();
  }

  renderFeaturedArtists() {
    const container = document.getElementById('featured-artists');
    if (!container) return;

    container.innerHTML = ARTISTS.slice(0, 6).map(artist => {
      const artistLink = getArtistPageUrl(artist.name);
      return `
        <a href="${artistLink}" class="music-card" data-artist-id="${artist.id}">
          <img src="${artist.image}" alt="${artist.name}" class="music-card-image">
          <div class="music-card-overlay">
            <button class="play-button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
          <div class="music-card-info">
            <div class="music-card-title">${artist.name}</div>
            <div class="music-card-artist">${artist.genre}</div>
          </div>
        </a>
      `;
    }).join('');
  }

  renderRecentlyPlayed() {
    const container = document.getElementById('recently-played');
    if (!container) return;

    container.innerHTML = TRACKS.slice(0, 10).map(track => `
      <div class="music-card" data-track-id="${track.id}">
        <img src="${track.image}" alt="${track.title}" class="music-card-image">
        <div class="music-card-overlay">
          <button class="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
        <div class="music-card-info">
          <div class="music-card-title">${track.title}</div>
          <div class="music-card-artist">${track.artist}</div>
        </div>
      </div>
    `).join('');
  }

  renderTopTracks() {
    const container = document.getElementById('top-tracks');
    if (!container) return;

    container.innerHTML = TRACKS.slice(0, 10).map(track => `
      <div class="music-card" data-track-id="${track.id}">
        <img src="${track.image}" alt="${track.title}" class="music-card-image">
        <div class="music-card-overlay">
          <button class="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
        <div class="music-card-info">
          <div class="music-card-title">${track.title}</div>
          <div class="music-card-artist">${track.artist}</div>
        </div>
      </div>
    `).join('');
  }

  renderPlaylists() {
    const container = document.getElementById('featured-playlists');
    if (!container) return;

    container.innerHTML = PLAYLISTS.map(playlist => `
      <div class="music-card" data-playlist-id="${playlist.id}">
        <img src="${playlist.image}" alt="${playlist.name}" class="music-card-image">
        <div class="music-card-overlay">
          <button class="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
        <div class="music-card-info">
          <div class="music-card-title">${playlist.name}</div>
          <div class="music-card-artist">${playlist.description}</div>
        </div>
      </div>
    `).join('');
  }
}

// Initialize app
const app = new App();

// Render home if on home page
if (document.getElementById('featured-artists')) {
  app.renderHome();
}

export default app;

