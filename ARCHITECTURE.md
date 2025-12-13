# Arquitetura do Projeto

## Visão Geral

Este projeto segue uma arquitetura modular baseada em componentes e serviços, separando claramente as responsabilidades.

## Camadas da Aplicação

### 1. Configuração (`config/`)
Centraliza todas as configurações do projeto:
- **paths.js**: Todos os caminhos do projeto (HTML, CSS, JS, API)
- Facilita manutenção e migração entre ambientes

### 2. Serviços (`src/js/services/`)
Contém a lógica de negócio:
- **auth.service.js**: Autenticação e gerenciamento de usuários
- **player.service.js**: Lógica de reprodução de música

**Características:**
- Singleton pattern (uma instância por aplicação)
- Event-driven (listeners para mudanças de estado)
- Independentes da UI

### 3. Componentes (`src/js/components/`)
Gerencia UI e interações:
- **nav.component.js**: Barra de navegação
- **player.component.js**: Interface do player

**Características:**
- Responsáveis pela renderização
- Conectam UI com serviços
- Reutilizáveis

### 4. Utilitários (`src/js/utils/`)
Funções auxiliares reutilizáveis:
- **storage.js**: Gerenciamento de localStorage
- **dom.js**: Manipulação do DOM
- **router.js**: Sistema de roteamento (futuro)

### 5. Páginas (`src/js/pages/`)
Lógica específica de cada página:
- **auth.page.js**: Inicialização de páginas de autenticação

### 6. Estilos (`src/styles/`)
CSS organizado:
- **variables.css**: Variáveis CSS globais
- **base.css**: Reset e estilos base

## Fluxo de Dados

```
HTML → Componente → Serviço → Storage/API
         ↓            ↓
       Eventos    Estado
```

### Exemplo: Login

1. Usuário preenche formulário (HTML)
2. `auth.page.js` captura submit
3. `auth.page.js` chama `authService.login()`
4. `authService` valida e salva no localStorage
5. `authService` notifica listeners
6. `navComponent` atualiza UI automaticamente

## Padrões de Design

### Singleton
Serviços são singletons para garantir uma única instância:
```javascript
export const authService = new AuthService();
```

### Observer Pattern
Serviços notificam mudanças via listeners:
```javascript
authService.onAuthChange((user) => {
  // Atualiza UI
});
```

### Module Pattern
Código organizado em módulos ES6:
```javascript
export class AuthService { ... }
export const authService = new AuthService();
```

## Gerenciamento de Estado

### LocalStorage
- Usuários: `meuapp_users_v1`
- Usuário atual: `meuapp_current_user_v1`
- Estado do player: `meuapp_player_v1`

### Estado em Memória
- Serviços mantêm estado atual em memória
- Sincronizado com localStorage
- Persistido automaticamente

## Estrutura de Dados

### Usuário
```javascript
{
  id: number,
  name: string,
  username: string,
  email: string,
  password: string, // Em produção: hash
  bio: string,
  avatar: string,
  createdAt: string,
  updatedAt: string
}
```

### Track
```javascript
{
  title: string,
  artist: string,
  src: string, // URL do áudio
  art: string  // URL da capa
}
```

## Extensibilidade

### Adicionar Novo Serviço
1. Criar `src/js/services/novo.service.js`
2. Implementar classe com métodos necessários
3. Exportar instância singleton
4. Importar em `app.js` se necessário

### Adicionar Novo Componente
1. Criar `src/js/components/novo.component.js`
2. Implementar métodos `init()`, `render()`, etc.
3. Exportar instância singleton
4. Inicializar em `app.js`

### Adicionar Nova Página
1. Criar HTML em `Html/`
2. Criar lógica em `src/js/pages/nova.page.js` se necessário
3. Importar e inicializar no HTML

## Performance

### Lazy Loading
- Componentes carregam apenas quando necessário
- CSS carregado dinamicamente

### Event Delegation
- Eventos delegados quando possível
- Reduz número de listeners

### Caching
- Estado persistido no localStorage
- Reduz recálculos

## Segurança

### Autenticação
- Senhas em texto (⚠️ migrar para hash em produção)
- Validação de email e senha
- Sessão gerenciada via localStorage

### Validação
- Validação no cliente (adicionar validação no servidor)
- Sanitização de inputs

## Testes (Futuro)

Estrutura preparada para testes:
- Serviços isolados → fácil testar
- Componentes separados → fácil mockar
- Utilitários puros → fácil testar

## Build (Futuro)

Preparado para build tools:
- Módulos ES6 → fácil bundling
- Estrutura organizada → fácil tree-shaking
- Configuração centralizada → fácil otimização

