/**
 * Serviço de autenticação
 * Gerencia cadastro, login, logout e sessão de usuários
 */

import { getStorage, setStorage, removeStorage } from '../utils/storage.js';
import { PATHS } from '../../../config/paths.js';

const STORAGE_KEYS = PATHS.STORAGE;

class AuthService {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.loadCurrentUser();
  }

  /**
   * Carrega usuário atual do storage
   */
  loadCurrentUser() {
    const email = getStorage(STORAGE_KEYS.CURRENT_USER);
    if (email) {
      const users = getStorage(STORAGE_KEYS.USERS, []);
      this.currentUser = users.find(u => u.email === email) || null;
    }
  }

  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Object} - { success: boolean, error?: string, user?: Object }
   */
  register(userData) {
    const { name, username, email, password, confirmPassword, bio, avatar } = userData;

    // Validações
    if (password !== confirmPassword) {
      return { success: false, error: 'As senhas não coincidem' };
    }

    if (!this.isValidEmail(email)) {
      return { success: false, error: 'E-mail inválido' };
    }

    if (!this.isValidPassword(password)) {
      return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' };
    }

    const users = getStorage(STORAGE_KEYS.USERS, []);

    // Verifica se email já existe
    if (users.find(u => u.email === email.toLowerCase())) {
      return { success: false, error: 'Já existe uma conta com esse e-mail' };
    }

    // Verifica se username já existe
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Nome de usuário indisponível' };
    }

    // Cria novo usuário
    const newUser = {
      id: Date.now(),
      name,
      username,
      email: email.toLowerCase(),
      password, // Em produção, hash da senha
      bio: bio || '',
      avatar: avatar || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    setStorage(STORAGE_KEYS.USERS, users);

    // Faz login automático
    this.login(email, password);

    return { success: true, user: newUser };
  }

  /**
   * Faz login do usuário
   * @param {string} email - E-mail do usuário
   * @param {string} password - Senha do usuário
   * @returns {Object} - { success: boolean, error?: string, user?: Object }
   */
  login(email, password) {
    const users = getStorage(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === email.toLowerCase());

    if (!user) {
      return { success: false, error: 'Conta não encontrada' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Senha incorreta' };
    }

    this.currentUser = user;
    setStorage(STORAGE_KEYS.CURRENT_USER, user.email);
    this.notifyListeners();

    return { success: true, user };
  }

  /**
   * Faz logout do usuário
   */
  logout() {
    this.currentUser = null;
    removeStorage(STORAGE_KEYS.CURRENT_USER);
    this.notifyListeners();
  }

  /**
   * Verifica se usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Retorna usuário atual
   * @returns {Object|null}
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Atualiza dados do usuário atual
   * @param {Object} updates - Dados a atualizar
   * @returns {boolean}
   */
  updateUser(updates) {
    if (!this.currentUser) return false;

    const users = getStorage(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex(u => u.email === this.currentUser.email);

    if (userIndex === -1) return false;

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    setStorage(STORAGE_KEYS.USERS, users);
    this.currentUser = users[userIndex];
    this.notifyListeners();

    return true;
  }

  /**
   * Deleta conta do usuário atual
   * @returns {boolean}
   */
  deleteAccount() {
    if (!this.currentUser) return false;

    const users = getStorage(STORAGE_KEYS.USERS, []);
    const filteredUsers = users.filter(u => u.email !== this.currentUser.email);

    setStorage(STORAGE_KEYS.USERS, filteredUsers);
    this.logout();

    return true;
  }

  /**
   * Adiciona listener para mudanças de autenticação
   * @param {Function} callback - Função a ser chamada
   */
  onAuthChange(callback) {
    this.listeners.push(callback);
  }

  /**
   * Remove listener
   * @param {Function} callback - Função a remover
   */
  offAuthChange(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  /**
   * Notifica todos os listeners
   */
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentUser));
  }

  /**
   * Valida formato de e-mail
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Valida senha
   * @param {string} password
   * @returns {boolean}
   */
  isValidPassword(password) {
    return password && password.length >= 6;
  }
}

// Exporta instância singleton
export const authService = new AuthService();

