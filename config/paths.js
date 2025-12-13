/**
 * Configuração centralizada de paths do projeto
 * Facilita manutenção e migração entre ambientes
 */
export const PATHS = {
  // Base paths
  BASE: '/',
  HTML: '/Html',
  CSS: '/css',
  JS: '/js',
  IMG: '/img',
  ASSETS: '/assets',
  
  // Component paths
  COMPONENTS: '/Html/components',
  
  // Page paths
  PAGES: {
    INDEX: '/Html/index.html',
    LOGIN: '/Html/login.html',
    CADASTRO: '/Html/cadastro.html',
    PERFIL: '/Html/perfil.html',
    PRINCIPAL: '/Html/paginda_principal.html',
    BIBLIOTECA: '/Html/biblioteca.html',
    PLAYLISTS: '/Html/playlists.html',
    RANKING: '/Html/ranking.html',
    SOBRE: '/Html/sobre.html',
    AJUDA: '/Html/ajuda.html',
    CONTATO: '/Html/contato.html',
    EXPLORE: '/Html/explore.html',
    ERRO404: '/Html/erro404.html'
  },
  
  // API endpoints (para futura integração)
  API: {
    BASE: '/api',
    AUTH: '/api/auth',
    TRACKS: '/api/tracks',
    ARTISTS: '/api/artists',
    PLAYLISTS: '/api/playlists'
  },
  
  // Storage keys
  STORAGE: {
    USERS: 'meuapp_users_v1',
    CURRENT_USER: 'meuapp_current_user_v1',
    PLAYER: 'meuapp_player_v1',
    SETTINGS: 'meuapp_settings_v1'
  }
};

/**
 * Helper para construir paths absolutos
 */
export function getPath(type, ...segments) {
  const base = PATHS[type] || PATHS.BASE;
  return base + segments.join('/');
}

/**
 * Helper para verificar se estamos em produção
 */
export const IS_PRODUCTION = window.location.hostname !== 'localhost' && 
                              window.location.hostname !== '127.0.0.1';

