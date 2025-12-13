/**
 * Utilitários para manipulação do DOM
 */

/**
 * Aguarda o DOM estar pronto
 * @param {Function} callback - Função a executar quando DOM estiver pronto
 */
export function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Cria um elemento HTML com atributos e filhos
 * @param {string} tag - Tag do elemento
 * @param {Object} attrs - Atributos do elemento
 * @param {Array|string} children - Filhos do elemento
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);
  
  // Aplica atributos
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else if (key === 'innerHTML') {
      element.innerHTML = value;
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });
  
  // Adiciona filhos
  if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  } else if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof HTMLElement) {
    element.appendChild(children);
  }
  
  return element;
}

/**
 * Carrega um componente HTML via fetch
 * @param {string} path - Caminho do componente
 * @returns {Promise<string>} - HTML do componente
 */
export async function loadComponent(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Erro ao carregar componente [${path}]:`, error);
    return '';
  }
}

/**
 * Injeta HTML em elementos com data-include
 * @param {string} attribute - Atributo data-* a procurar (ex: 'nav')
 * @param {string} componentPath - Caminho do componente
 */
export async function includeComponent(attribute, componentPath) {
  const elements = document.querySelectorAll(`[data-include="${attribute}"]`);
  if (elements.length === 0) return;
  
  const html = await loadComponent(componentPath);
  elements.forEach(el => {
    el.innerHTML = html;
  });
}

/**
 * Carrega CSS dinamicamente
 * @param {string} href - Caminho do CSS
 * @returns {Promise<void>}
 */
export function loadCSS(href) {
  return new Promise((resolve, reject) => {
    // Verifica se já está carregado
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Erro ao carregar CSS: ${href}`));
    document.head.appendChild(link);
  });
}

