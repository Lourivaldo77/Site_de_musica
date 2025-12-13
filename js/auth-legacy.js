/**
 * Adaptador de compatibilidade para código legado
 * Mantém funções globais enquanto migra para nova arquitetura
 */

import { authService } from '../src/js/services/auth.service.js';
import { PATHS } from '../config/paths.js';

// Mantém compatibilidade com código existente
window.handleRegister = function handleRegister(e) {
  e.preventDefault();
  const userData = {
    name: document.getElementById('name').value.trim(),
    username: document.getElementById('username').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirm-password').value,
    bio: document.getElementById('bio')?.value.trim() || '',
    avatar: document.getElementById('avatar')?.value.trim() || ''
  };

  const result = authService.register(userData);
  
  if (result.success) {
    window.location.href = PATHS.PAGES.PERFIL;
  } else {
    alert(result.error || 'Erro ao criar conta');
  }
};

window.handleLogin = function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const result = authService.login(email, password);
  
  if (result.success) {
    window.location.href = PATHS.PAGES.PERFIL;
  } else {
    alert(result.error || 'Erro ao fazer login');
  }
};

window.loadProfile = function loadProfile() {
  if (!authService.isAuthenticated()) {
    window.location.href = PATHS.PAGES.LOGIN;
    return;
  }

  const user = authService.getCurrentUser();
  if (!user) {
    window.location.href = PATHS.PAGES.LOGIN;
    return;
  }

  const elements = {
    avatarImg: document.getElementById('profile-avatar-img'),
    name: document.getElementById('profile-name'),
    username: document.getElementById('profile-username'),
    email: document.getElementById('profile-email'),
    joinDate: document.getElementById('profile-join-date'),
    infoName: document.getElementById('info-name'),
    infoEmail: document.getElementById('info-email'),
    infoDob: document.getElementById('info-dob'),
    infoPhone: document.getElementById('info-phone')
  };

  if (elements.avatarImg && user.avatar) {
    elements.avatarImg.src = user.avatar;
  }
  if (elements.name) elements.name.textContent = user.name || user.username;
  if (elements.username) elements.username.textContent = '@' + (user.username || '');
  if (elements.email) elements.email.textContent = user.email;
  if (elements.joinDate) {
    elements.joinDate.textContent = 'Membro desde ' + 
      new Date(user.createdAt).toLocaleDateString('pt-BR');
  }
  if (elements.infoName) elements.infoName.textContent = user.name || '—';
  if (elements.infoEmail) elements.infoEmail.textContent = user.email || '—';
  if (elements.infoDob) elements.infoDob.textContent = user.dob || '—';
  if (elements.infoPhone) elements.infoPhone.textContent = user.phone || '—';
};

window.logout = function logout() {
  authService.logout();
  window.location.href = PATHS.PAGES.LOGIN;
};

window.deleteAccount = function deleteAccount() {
  if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
    return;
  }
  
  authService.deleteAccount();
  window.location.href = PATHS.PAGES.INDEX;
};

