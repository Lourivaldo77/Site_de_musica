/**
 * Configuração centralizada do aplicativo
 */
export const APP_CONFIG = {
  name: 'Mônica & Amigos',
  version: '1.0.0',
  
  // Configurações de autenticação
  auth: {
    sessionTimeout: 30 * 60 * 1000, // 30 minutos
    requireEmailVerification: false
  },
  
  // Configurações do player
  player: {
    defaultVolume: 0.8,
    fadeDuration: 300,
    preload: 'auto',
    crossfade: false
  },
  
  // Configurações de UI
  ui: {
    theme: 'dark',
    animations: true,
    compactMode: false
  },
  
  // Configurações de API
  api: {
    timeout: 10000,
    retryAttempts: 3
  }
};

