# Mônica & Amigos - Plataforma de Streaming Musical

Plataforma de streaming musical com arquitetura moderna e escalável, desenvolvida seguindo as melhores práticas de engenharia de software.

## 🏗️ Arquitetura

### Estrutura de Pastas

```
Monica_e_os_amigos/
├── config/              # Configurações centralizadas
│   └── paths.js        # Paths e constantes do projeto
├── src/                 # Código fonte organizado
│   ├── js/
│   │   ├── app.js      # Aplicação principal
│   │   ├── config/     # Configurações da aplicação
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── services/   # Serviços (lógica de negócio)
│   │   ├── utils/      # Utilitários
│   │   └── pages/      # Lógica específica de páginas
│   └── styles/         # Estilos organizados
│       ├── variables.css # Variáveis CSS
│       └── base.css    # Estilos base
├── js/                  # Scripts legados (compatibilidade)
├── Html/                # Páginas HTML
├── css/                 # Estilos por página
└── package.json         # Dependências e scripts
```

### Princípios de Arquitetura

1. **Separação de Responsabilidades**
   - **Services**: Lógica de negócio (auth, player)
   - **Components**: UI e interações
   - **Utils**: Funções auxiliares reutilizáveis
   - **Pages**: Lógica específica de cada página

2. **Configuração Centralizada**
   - Todos os paths em `config/paths.js`
   - Configurações da app em `src/js/config/index.js`
   - Fácil manutenção e migração

3. **Modularidade**
   - Código organizado em módulos ES6
   - Componentes reutilizáveis
   - Fácil testar e manter

4. **Escalabilidade**
   - Estrutura preparada para crescimento
   - Fácil adicionar novas features
   - Suporte para build tools futuros

## 🚀 Como Usar

### Desenvolvimento

1. Instale as dependências:
```bash
npm install
```

2. Para desenvolvimento local, use um servidor HTTP simples:
```bash
# Python
python -m http.server 8000

# Node.js (com http-server)
npx http-server -p 8000
```

3. Acesse `http://localhost:8000`

### Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção (futuro)
- `npm run lint` - Verifica código
- `npm run format` - Formata código

## 📦 Componentes Principais

### AuthService
Gerencia autenticação de usuários:
- Registro e login
- Gerenciamento de sessão
- Atualização de perfil
- Listeners para mudanças de estado

### PlayerService
Gerencia reprodução de música:
- Controle de fila
- Shuffle e repeat
- Persistência de estado
- Eventos de reprodução

### NavComponent
Componente de navegação:
- Renderização dinâmica
- Busca integrada
- Estado de autenticação

### PlayerComponent
UI do player:
- Controles de reprodução
- Visualização de playlist
- Sincronização com PlayerService

## 🔧 Configuração

### Paths
Todos os caminhos estão centralizados em `config/paths.js`. Para alterar paths, edite este arquivo.

### Variáveis CSS
Variáveis globais em `src/styles/variables.css`. Inclua este arquivo para usar as variáveis.

## 🔄 Migração

O projeto mantém compatibilidade com código legado através de adaptadores em `js/`:
- `auth-legacy.js` - Compatibilidade com funções globais de auth
- `include-nav-legacy.js` - Compatibilidade com include-nav
- `player-legacy.js` - Compatibilidade com player antigo

Para migrar completamente:
1. Substitua imports de scripts antigos pelos novos
2. Use os componentes e serviços da nova arquitetura
3. Remova código legado quando não for mais necessário

## 📝 Próximos Passos

- [ ] Implementar sistema de build (Webpack/Vite)
- [ ] Adicionar testes unitários
- [ ] Implementar roteamento SPA completo
- [ ] Adicionar TypeScript
- [ ] Integração com API backend
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)

## 🛠️ Tecnologias

- JavaScript ES6+ (Módulos)
- CSS3 (Variáveis CSS)
- HTML5
- LocalStorage API

## 📄 Licença

MIT

