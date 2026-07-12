// social-share.js - Compartilhar músicas nas redes sociais

class FendaSocialShare {
  constructor() {
    this.platforms = {
      whatsapp: {
        name: 'WhatsApp',
        icon: '💬',
        color: '#25D366',
      },
      twitter: {
        name: 'Twitter/X',
        icon: '𝕏',
        color: '#000000',
      },
      facebook: {
        name: 'Facebook',
        icon: 'f',
        color: '#1877F2',
      },
      telegram: {
        name: 'Telegram',
        icon: '✈️',
        color: '#0088cc',
      },
      instagram: {
        name: 'Instagram',
        icon: '📷',
        color: '#E1306C',
      },
      copy: {
        name: 'Copiar link',
        icon: '📋',
        color: '#888888',
      },
    };
  }

  generateShareMessage(song, includeEmoji = true) {
    const emoji = includeEmoji ? '🎵 ' : '';
    return `${emoji}Ouvindo "${song.title}" por ${song.artist} no Fenda Music 🎶`;
  }

  generateShareUrl(song) {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      song: song.title,
      artist: song.artist,
    });
    return `${baseUrl}?${params.toString()}`;
  }

  shareToWhatsApp(song) {
    const message = this.generateShareMessage(song);
    const url = this.generateShareUrl(song);
    const fullMessage = `${message}\n${url}`;
    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }

  shareToTwitter(song) {
    const message = this.generateShareMessage(song);
    const url = this.generateShareUrl(song);
    const fullText = `${message} ${url}`;
    const encoded = encodeURIComponent(fullText);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
  }

  shareToFacebook(song) {
    const url = this.generateShareUrl(song);
    const message = this.generateShareMessage(song, false);
    const encoded = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encoded}`, '_blank');
  }

  shareToTelegram(song) {
    const message = this.generateShareMessage(song);
    const url = this.generateShareUrl(song);
    const fullMessage = `${message}\n${url}`;
    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encoded}`, '_blank');
  }

  shareToInstagram(song) {
    // Instagram não permite compartilhamento direto de links
    // Mostrar mensagem de como compartilhar
    const message = this.generateShareMessage(song);
    alert(`Compartilhe no Instagram Stories:\n\n${message}\n\nURL: ${this.generateShareUrl(song)}`);
  }

  copyShareLink(song) {
    const url = this.generateShareUrl(song);
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copiado para a área de transferência!');
    }).catch(() => {
      alert('Erro ao copiar link');
    });
  }

  shareSong(song, platform) {
    switch (platform) {
      case 'whatsapp':
        this.shareToWhatsApp(song);
        break;
      case 'twitter':
        this.shareToTwitter(song);
        break;
      case 'facebook':
        this.shareToFacebook(song);
        break;
      case 'telegram':
        this.shareToTelegram(song);
        break;
      case 'instagram':
        this.shareToInstagram(song);
        break;
      case 'copy':
        this.copyShareLink(song);
        break;
      default:
        console.warn(`Plataforma ${platform} não suportada`);
    }
  }

  renderShareButtons(song) {
    const buttons = Object.entries(this.platforms).map(([key, platform]) => `
      <button 
        class="share-btn share-${key}"
        onclick="fendaSocialShare.shareSong(${JSON.stringify(song).replace(/"/g, '&quot;')}, '${key}')"
        title="Compartilhar no ${platform.name}"
        style="--share-color: ${platform.color}"
      >
        <span class="share-icon">${platform.icon}</span>
        <span class="share-name">${platform.name}</span>
      </button>
    `).join('');

    return `
      <div class="social-share-container">
        <h3>Compartilhe esta música</h3>
        <div class="share-buttons">
          ${buttons}
        </div>
      </div>
    `;
  }

  getCSS() {
    return `
      .social-share-container {
        padding: 20px;
        background: var(--color-surface);
        border-radius: 12px;
        margin: 20px 0;
      }

      .social-share-container h3 {
        margin: 0 0 15px 0;
        font-size: 16px;
        color: var(--color-text);
      }

      .share-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 10px;
      }

      .share-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        border: none;
        border-radius: 8px;
        background: var(--color-background);
        color: var(--color-text);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 12px;
        font-weight: 500;
      }

      .share-btn:hover {
        background: var(--share-color, var(--color-primary));
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .share-btn:active {
        transform: translateY(0);
      }

      .share-icon {
        font-size: 24px;
      }

      .share-name {
        font-size: 11px;
        line-height: 1.2;
        text-align: center;
      }

      /* Cores específicas */
      .share-whatsapp:hover { background-color: #25D366; }
      .share-twitter:hover { background-color: #000000; }
      .share-facebook:hover { background-color: #1877F2; }
      .share-telegram:hover { background-color: #0088cc; }
      .share-instagram:hover { background-color: #E1306C; }
      .share-copy:hover { background-color: #888888; }
    `;
  }
}

// Inicializar
const fendaSocialShare = new FendaSocialShare();

// Injetar CSS
const shareStyle = document.createElement('style');
shareStyle.textContent = fendaSocialShare.getCSS();
document.head.appendChild(shareStyle);

// API Web Share (se disponível)
if (navigator.share) {
  window.fendaSocialShare.useNativeShare = true;
}
