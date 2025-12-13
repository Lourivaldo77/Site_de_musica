/**
 * Adaptador de compatibilidade para include-nav
 * Mantém funcionalidade existente enquanto migra para nova arquitetura
 */

import { includeComponent, loadCSS } from '../src/js/utils/dom.js';
import { PATHS } from '../config/paths.js';

// Mantém compatibilidade com código existente
(async function() {
  async function includeNav() {
    const nodes = document.querySelectorAll('[data-include="nav"]');
    if (!nodes.length) return;
    
    try {
      await loadCSS(`${PATHS.CSS}/nav.css`);
      await includeComponent('nav', `${PATHS.COMPONENTS}/nav.html`);
    } catch (e) {
      console.warn('include-nav failed', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includeNav);
  } else {
    includeNav();
  }
})();

