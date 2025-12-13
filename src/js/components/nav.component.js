/**
 * Componente de navegação
 * Gerencia renderização e interações da barra de navegação
 */

import { loadComponent, loadCSS, domReady } from '../utils/dom.js';
import { PATHS } from '../../../config/paths.js';
import { authService } from '../services/auth.service.js';

class NavComponent {
  constructor() {
    this.container = null;
    this.searchInput = null;
  }

  /**
   * Inicializa o componente
   */
  async init() {
    await domReady(() => {
      this.render();
      this.setupEventListeners();
      this.updateAuthState();
      
      // Escuta mudanças de autenticação
      authService.onAuthChange(() => this.updateAuthState());
    });
  }

  /**
   * Renderiza o componente
   */
  async render() {
    const containers = document.querySelectorAll('[data-include="nav"]');
    if (containers.length === 0) return;

    // Carrega CSS
    await loadCSS(`${PATHS.CSS}/nav.css`);

    // Carrega HTML
    const html = await loadComponent(`${PATHS.COMPONENTS}/nav.html`);
    
    containers.forEach(container => {
      container.innerHTML = html;
      this.container = container;
      this.searchInput = container.querySelector('#nav-search');
    });
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    if (!this.container) return;

    // Busca
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });

      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleSearch(e.target.value);
        }
      });
    }

    // Links de navegação
    const links = this.container.querySelectorAll('a[href]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Se link não tem data-router, permite navegação normal
        if (!link.hasAttribute('data-router')) {
          return;
        }
        e.preventDefault();
        // Aqui poderia usar o router se implementado
        window.location.href = link.getAttribute('href');
      });
    });
  }

  /**
   * Atualiza estado de autenticação na UI
   */
  updateAuthState() {
    if (!this.container) return;

    const loginBtn = this.container.querySelector('.btn-login');
    const userMenu = this.container.querySelector('.user-menu');

    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      
      if (loginBtn) {
        loginBtn.textContent = user.name || user.username;
        loginBtn.href = PATHS.PAGES.PERFIL;
      }

      // Poderia adicionar menu de usuário aqui
    } else {
      if (loginBtn) {
        loginBtn.textContent = 'Entrar';
        loginBtn.href = PATHS.PAGES.LOGIN;
      }
    }
  }

  /**
   * Trata busca
   * @param {string} query - Termo de busca
   */
  handleSearch(query) {
    if (!query.trim()) return;
    
    // Em produção, aqui faria uma requisição à API
    console.log('Busca:', query);
    
    // Poderia navegar para página de resultados
    // router.navigate(`/search?q=${encodeURIComponent(query)}`);
  }
}

// Exporta instância singleton
export const navComponent = new NavComponent();

