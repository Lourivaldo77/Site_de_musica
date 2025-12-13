# Guia de Migração

Este guia explica como migrar do código legado para a nova arquitetura.

## Estrutura Antiga vs Nova

### Antes
```html
<script src="../js/auth.js"></script>
<script src="../js/player.js"></script>
<script src="../js/include-nav.js"></script>
```

### Depois (Nova Arquitetura)
```html
<script type="module" src="/src/js/app.js"></script>
```

## Migração Passo a Passo

### 1. Páginas de Autenticação

#### Login (login.html)
**Antes:**
```html
<form id="login-form" onsubmit="handleLogin(event)">
```

**Depois:**
```html
<form id="login-form">
<script type="module">
  import { initLoginPage } from '/src/js/pages/auth.page.js';
  initLoginPage();
</script>
```

#### Cadastro (cadastro.html)
**Antes:**
```html
<form id="cadastro-form" onsubmit="handleRegister(event)">
```

**Depois:**
```html
<form id="cadastro-form">
<script type="module">
  import { initRegisterPage } from '/src/js/pages/auth.page.js';
  initRegisterPage();
</script>
```

#### Perfil (perfil.html)
**Antes:**
```html
<script src="../js/auth.js"></script>
<script>
  loadProfile();
</script>
```

**Depois:**
```html
<script type="module">
  import { initProfilePage } from '/src/js/pages/auth.page.js';
  initProfilePage();
</script>
```

### 2. Navegação

**Antes:**
```html
<div data-include="nav"></div>
<script src="../js/include-nav.js"></script>
```

**Depois:**
```html
<div data-include="nav"></div>
<script type="module" src="/src/js/app.js"></script>
```

O `app.js` inicializa automaticamente o NavComponent.

### 3. Player

**Antes:**
```html
<script src="../js/player.js"></script>
```

**Depois:**
```html
<script type="module" src="/src/js/app.js"></script>
```

O `app.js` inicializa automaticamente o PlayerComponent.

## Compatibilidade

Para manter compatibilidade durante a migração, os arquivos legados ainda funcionam:
- `js/auth.js` → `js/auth-legacy.js` (usa nova arquitetura internamente)
- `js/include-nav.js` → `js/include-nav-legacy.js`
- `js/player.js` → `js/player-legacy.js`

## Exemplo Completo

### Página com Nova Arquitetura

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
    <!-- Navegação -->
    <div data-include="nav"></div>
    
    <!-- Conteúdo -->
    <main>
        <!-- Seu conteúdo aqui -->
    </main>
    
    <!-- Scripts -->
    <script type="module" src="/src/js/app.js"></script>
    
    <!-- Scripts específicos da página (se necessário) -->
    <script type="module">
        import { initProfilePage } from '/src/js/pages/auth.page.js';
        initProfilePage();
    </script>
</body>
</html>
```

## Benefícios da Nova Arquitetura

1. **Modularidade**: Código organizado em módulos reutilizáveis
2. **Manutenibilidade**: Fácil encontrar e modificar código
3. **Testabilidade**: Componentes isolados são mais fáceis de testar
4. **Escalabilidade**: Estrutura preparada para crescimento
5. **Performance**: Tree-shaking e code splitting futuros

## Próximos Passos

1. Migre uma página por vez
2. Teste cada migração
3. Remova código legado quando não for mais necessário
4. Considere adicionar TypeScript para type safety
5. Implemente testes unitários

