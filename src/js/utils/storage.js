/**
 * Utilitário para gerenciamento de localStorage
 * Fornece interface type-safe e tratamento de erros
 */

/**
 * Salva dados no localStorage com tratamento de erros
 * @param {string} key - Chave de armazenamento
 * @param {*} value - Valor a ser salvo (será serializado como JSON)
 * @returns {boolean} - true se salvou com sucesso
 */
export function setStorage(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar no localStorage [${key}]:`, error);
    return false;
  }
}

/**
 * Recupera dados do localStorage
 * @param {string} key - Chave de armazenamento
 * @param {*} defaultValue - Valor padrão se não encontrar
 * @returns {*} - Valor recuperado ou defaultValue
 */
export function getStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Erro ao ler do localStorage [${key}]:`, error);
    return defaultValue;
  }
}

/**
 * Remove item do localStorage
 * @param {string} key - Chave a ser removida
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover do localStorage [${key}]:`, error);
  }
}

/**
 * Limpa todo o localStorage
 */
export function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
  }
}

/**
 * Verifica se uma chave existe no localStorage
 * @param {string} key - Chave a verificar
 * @returns {boolean}
 */
export function hasStorage(key) {
  return localStorage.getItem(key) !== null;
}

