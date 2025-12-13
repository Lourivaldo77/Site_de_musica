/**
 * Sistema de roteamento simples para SPA
 * Suporta navegação programática e histórico do browser
 */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.beforeEach = null;
    this.afterEach = null;
  }

  /**
   * Registra uma rota
   * @param {string} path - Caminho da rota
   * @param {Function} handler - Função a executar quando rota for acessada
   */
  register(path, handler) {
    this.routes.set(path, handler);
  }

  /**
   * Navega para uma rota
   * @param {string} path - Caminho da rota
   * @param {Object} state - Estado a passar para a rota
   */
  async navigate(path, state = {}) {
    // Executa guard before
    if (this.beforeEach) {
      const canProceed = await this.beforeEach(path, this.currentRoute);
      if (!canProceed) return;
    }

    const handler = this.routes.get(path);
    if (!handler) {
      console.warn(`Rota não encontrada: ${path}`);
      return;
    }

    this.currentRoute = path;
    
    // Atualiza URL sem recarregar página
    if (window.history) {
      window.history.pushState(state, '', path);
    }

    // Executa handler
    await handler(state);

    // Executa guard after
    if (this.afterEach) {
      this.afterEach(path);
    }
  }

  /**
   * Inicializa o router
   */
  init() {
    // Intercepta cliques em links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-router]');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('href') || link.dataset.path;
        this.navigate(path);
      }
    });

    // Intercepta navegação do browser (back/forward)
    window.addEventListener('popstate', (e) => {
      const path = window.location.pathname;
      this.navigate(path, e.state || {});
    });

    // Navega para rota inicial
    const initialPath = window.location.pathname;
    this.navigate(initialPath);
  }
}

// Exporta instância singleton
export const router = new Router();

