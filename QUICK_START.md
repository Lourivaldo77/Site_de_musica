# Quick Start

## Início Rápido

### Opção 1: Usar Arquitetura Nova (Recomendado)

1. Atualize suas páginas HTML para usar módulos ES6:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div data-include="nav"></div>
    
    <main>
        <!-- Seu conteúdo -->
    </main>
    
    <!-- Inicializa tudo -->
    <script type="module" src="/src/js/app.js"></script>
</body>
</html>
```

2. Para páginas de autenticação, adicione:

```html
<script type="module">
  import { initLoginPage } from '/src/js/pages/auth.page.js';
  initLoginPage();
</script>
```

### Opção 2: Manter Código Legado (Compatibilidade)

Os arquivos antigos continuam funcionando:
- `js/auth.js` - Autenticação
- `js/include-nav.js` - Navegação
- `js/player.js` - Player

Nenhuma mudança necessária nas páginas existentes.

## Estrutura de Arquivos

```
Monica_e_os_amigos/
├── config/           # Configurações
├── src/              # Código novo (arquitetura moderna)
│   ├── js/
│   └── styles/
├── js/               # Scripts legados (compatibilidade)
├── Html/             # Páginas HTML
└── css/              # Estilos
```

## Servidor de Desenvolvimento

```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (se tiver http-server)
npx http-server -p 8000

# Opção 3: Usar script do projeto (futuro)
npm run dev
```

Acesse: `http://localhost:8000`

## Principais Arquivos

### Configuração
- `config/paths.js` - Todos os caminhos do projeto

### Serviços
- `src/js/services/auth.service.js` - Autenticação
- `src/js/services/player.service.js` - Player de música

### Componentes
- `src/js/components/nav.component.js` - Navegação
- `src/js/components/player.component.js` - UI do player

### Aplicação
- `src/js/app.js` - Inicializa tudo

## Exemplos de Uso

### Verificar se usuário está logado

```javascript
import { authService } from '/src/js/services/auth.service.js';

if (authService.isAuthenticated()) {
  const user = authService.getCurrentUser();
  console.log('Usuário:', user.name);
}
```

### Controlar player

```javascript
import { playerService } from '/src/js/services/player.service.js';

// Reproduzir
playerService.play();

// Próxima música
playerService.next();

// Obter estado
const state = playerService.getState();
console.log('Track atual:', state.currentTrack);
```

### Escutar mudanças

```javascript
import { authService } from '/src/js/services/auth.service.js';

authService.onAuthChange((user) => {
  if (user) {
    console.log('Usuário logado:', user.name);
  } else {
    console.log('Usuário deslogado');
  }
});
```

## Próximos Passos

1. Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a arquitetura
2. Leia [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) para migrar código legado
3. Explore os exemplos em `src/js/`

