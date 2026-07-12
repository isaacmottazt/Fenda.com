# 🎵 Fenda Music

PWA de streaming sem fins lucrativos, construído em HTML, CSS e JavaScript puros (sem frameworks front-end).

> Desenvolvido e mantido inteiramente em ambiente mobile (Termux/Acode no Android), sem acesso a DevTools de navegador — todo o tratamento de erros foi pensado para aparecer visualmente na própria tela.

## ✨ Funcionalidades

- **Player completo** com fila estilo Spotify (bottom sheet, capas de álbum, avanço automático), letras sincronizadas via `.lrc` e engine de reprodução configurável
- **Biblioteca pessoal**: playlists, favoritos, histórico e artistas seguidos
- **Busca** de músicas e artistas
- **Perfil de artista** com página dedicada e sistema de seguidores/notificações de novos lançamentos
- **Autenticação** de usuários (cadastro, login, confirmação por e-mail, recuperação de senha)
- **Configurações** multi-tela (reprodução, idioma/acessibilidade, conta, sobre)
- **Internacionalização** (i18n) com suporte a PT-BR, EN-US e ES-ES
- **Temas dinâmicos** via variáveis CSS
- **Envio de músicas** pelos próprios usuários para análise/publicação
- **Modo preview** (30s) para links compartilhados de músicas
- **PWA completo**: instalável, funciona offline via Service Worker, atalhos de app, share target e widget "tocando agora"
- Build opcional para **Android nativo** via [Capacitor](https://capacitorjs.com)

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (vanilla) |
| Backend / Auth / DB | Serviço gerenciado (Postgres) |
| Cache local | IndexedDB |
| PWA | Service Worker (stale-while-revalidate), Web App Manifest |
| Deploy | [Vercel](https://vercel.com), integração automática com GitHub |
| Mobile nativo (opcional) | Capacitor (Android) |
| Ícones | Material Symbols Rounded |

## 📁 Estrutura do projeto

```
fenda/
├── index.html              # Tela de login/cadastro
├── player.html              # Aplicação principal (player, biblioteca, busca, etc.)
├── reset-password.html      # Recuperação de senha
├── termos.html               # Termos de uso
├── privacidade.html          # Política de privacidade
├── sw.js                     # Service Worker
├── manifest.json             # Web App Manifest
├── vercel.json                # Configuração de deploy (Vercel)
├── css/
│   ├── base.css
│   ├── inicio.css
│   ├── busca.css
│   ├── biblioteca.css
│   ├── perfil.css
│   ├── notifications.css
│   ├── artist-detail.css
│   ├── painel.css
│   ├── theme-overrides.css
│   └── login.css
├── js/
│   ├── backend-config.js           # Configuração de backend + cache IndexedDB
│   ├── player-core.js              # Estado global e fila
│   ├── player-audio-lyrics.js      # Motor de áudio + letras .lrc
│   ├── player-ui.js                # Interface das abas
│   ├── player-playlists.js         # Playlists e favoritos
│   ├── player-menus-core.js        # Menus de contexto
│   ├── player-music-actions.js     # Ações sobre músicas (exclusão etc.)
│   ├── player-recommendations.js   # Recomendações
│   ├── player-session.js           # Persistência de sessão do player
│   ├── playback-engine.js          # Aplica preferências de reprodução
│   ├── search.js                   # Busca
│   ├── settings.js                 # Configurações + envio de música
│   ├── notifications.js            # Notificações
│   ├── notifications-follow.js     # Notificações de lançamentos de artistas
│   ├── preview-manager.js          # Modo preview (30s) para links compartilhados
│   ├── social-share.js             # Compartilhamento em redes sociais
│   ├── stats.js                    # Resumo estatístico (estilo "Wrapped")
│   ├── i18n.js                     # Internacionalização
│   ├── themes-v6.js                # Temas dinâmicos (variáveis CSS)
│   └── inicio-extras.js
├── fonts/                    # Material Symbols (self-hosted, offline-first)
└── images/                   # Ícones e assets visuais
```

## 🚀 Rodando localmente

O projeto não requer build step para rodar no navegador — é HTML/CSS/JS servido diretamente. Esta seção é útil para quem for testar o projeto fora do fluxo de desenvolvimento usual (Acode + upload via GitHub).

1. Clone ou baixe o repositório:
   ```bash
   git clone https://github.com/<seu-usuario>/<seu-repo>.git
   cd fenda
   ```
2. Configure suas credenciais de backend no arquivo de configuração correspondente em `js/`.
3. Sirva os arquivos com qualquer servidor estático, por exemplo:
   ```bash
   npx serve .
   ```
4. Acesse `index.html` no navegador.

> ⚠️ O Service Worker exige HTTPS (ou `localhost`) para funcionar corretamente.

## ☁️ Deploy

O deploy é feito via **Vercel**, integrado automaticamente ao GitHub: qualquer atualização de arquivos no repositório dispara um novo deploy.

Fluxo de trabalho deste projeto:
1. Alterações são desenvolvidas e testadas localmente no **Acode** (Android)
2. Os arquivos atualizados são enviados diretamente pela **interface web do GitHub** (upload/edição manual, sem uso de terminal Git)
3. O Vercel detecta o commit e publica a nova versão automaticamente

## 📱 Build para Android (opcional)

```bash
npm install
npx cap sync android
npm run build:apk   # gera APK
npm run build:aab   # gera Android App Bundle
```

## 📄 Licença

Projeto privado — todos os direitos reservados.
