# HV Mídia — Site de Portfólio

Site institucional para um estúdio de fotografia e filmmaking, feito em **HTML5, CSS3 e JavaScript puro** (sem frameworks, sem build step, sem backend). Funciona abrindo `index.html` diretamente ou publicado no GitHub Pages.

## Estrutura de arquivos

```
/index.html          -> Estrutura da página (todas as seções)
/style.css            -> Todo o visual (cores, tipografia, animações, responsivo)
/script.js            -> Interações (menu, abas, scroll reveal, vídeos)
/assets/images/       -> Fotos e thumbnails de vídeo
/assets/videos/       -> Clipes de vídeo (.mp4)
/assets/icons/        -> Favicon / marca
/README.md            -> Este arquivo
```

---

## 1. Como substituir as imagens

1. Coloque seus arquivos `.jpg`/`.png` dentro de `assets/images/`.
2. No `index.html`, procure as tags `<img class="card__img" src="assets/images/...">` e troque o caminho pelo nome do seu arquivo.
3. Recomendado: imagens na proporção **4:5 (retrato)**, comprimidas (qualidade 75–85%) para carregamento rápido. Ferramentas como [Squoosh](https://squoosh.app) ajudam a comprimir sem perder qualidade.
4. Sempre preencha o atributo `alt="..."` com uma descrição real da imagem (importante para acessibilidade e SEO).

## 2. Como substituir os vídeos

1. Coloque seus clipes `.mp4` dentro de `assets/videos/`.
2. No `index.html`, dentro de cada `<article class="card card--video">`, troque:
   - `<img class="card__img" src="assets/images/filmXX-thumb.jpg">` → a imagem de capa (thumbnail) do vídeo.
   - `<source src="assets/videos/filmXX.mp4">` → o caminho do seu vídeo.
3. Recomendações de exportação: clipes curtos (6–12s), 1080p, sem áudio, taxa de bits entre 5–10 Mbps (arquivo final idealmente abaixo de 5MB). O GitHub tem limite de 100MB por arquivo — vídeos comprimidos evitam problemas.
4. O comportamento (fade da thumbnail para o vídeo ao passar o mouse / tocar) já está pronto no `script.js` — você só precisa trocar os arquivos.

## 3. Como trocar a URL do Instagram

No `index.html`, procure todas as ocorrências de:

```html
<a href="#" ...>
```

que estejam próximas de um ícone do Instagram (no menu e na seção de contato), e troque `href="#"` por:

```html
href="https://instagram.com/seu.usuario"
```

## 4. Como trocar o número do WhatsApp

O site tem **dois** links de WhatsApp:
1. O botão flutuante fixo (`class="whatsapp-float"`), no final do `index.html`.
2. O botão "Falar no WhatsApp" dentro da seção de contato.

Em ambos, troque `href="#"` por:

```html
href="https://wa.me/55SEUNUMEROCOMDDD"
```

Exemplo: `https://wa.me/5511999999999` (formato: código do país + DDD + número, sem espaços, traços ou parênteses).

## 5. Como fazer o deploy no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `hv-midia`).
2. Envie todos os arquivos deste projeto para o repositório (mantendo a estrutura de pastas).
3. No repositório, vá em **Settings → Pages**.
4. Em "Source", selecione a branch `main` (ou `master`) e a pasta `/ (root)`.
5. Clique em **Save**. Depois de alguns minutos, seu site estará disponível em:
   ```
   https://seu-usuario.github.io/hv-midia/
   ```
6. Toda vez que você atualizar (`git push`) o repositório, o site é atualizado automaticamente.

## 6. Como customizar as cores

Todas as cores estão centralizadas no topo do arquivo `style.css`, dentro do bloco `:root`:

```css
:root {
  --color-primary: #2f2c79;       /* Azul principal da marca */
  --color-primary-light: #6d63ff; /* Tom claro usado em gradientes/brilhos */
  --color-primary-deep: #1c1a4d;  /* Tom escuro usado em gradientes/sombras */

  --color-black: #07060c;         /* Fundo preto */
  --color-charcoal: #121017;      /* Superfície dos cards */
  --color-white: #f6f5fb;         /* Texto principal */
  --color-muted: #948fb0;         /* Texto secundário */
}
```

Troque qualquer valor hexadecimal e todo o site (botões, gradientes do hero, bordas dos cards, textos) se atualiza automaticamente — não é necessário mexer em nenhum outro lugar do CSS.

## 7. Como duplicar itens do portfólio

### Card de fotografia
No `index.html`, dentro de `<div class="portfolio-grid" id="grid-photo">`, copie um bloco inteiro `<article class="card">...</article>` e cole logo abaixo dele. Depois edite:
- o `src` da imagem,
- o `alt`,
- `.card__category`, `.card__title` e `.card__desc`.

### Card de vídeo (filmmaking)
Dentro de `<div class="portfolio-grid" id="grid-film">`, copie um bloco `<article class="card card--video">...</article>` inteiro e edite:
- a imagem de capa (`.card__img`),
- o `<source src="...">` do vídeo,
- categoria, título e descrição.

Não há limite de itens — a grade (`.portfolio-grid`) se reorganiza automaticamente conforme você adiciona ou remove cards, em qualquer tamanho de tela.

---

## Notas técnicas

- **Fonte:** Poppins (Google Fonts), carregada via `<link>` no `index.html`.
- **Animações:** feitas majoritariamente em CSS (`transition`/`@keyframes`) com curva `cubic-bezier` para uma sensação premium; o scroll-reveal usa `IntersectionObserver` no `script.js` para não pesar na performance.
- **Vídeos:** usam `preload="none"` para não carregar nada até o usuário interagir, e tocam mudos/em loop sem controles.
- **Acessibilidade:** HTML semântico, estados de foco visíveis (`:focus-visible`), suporte a `prefers-reduced-motion`, textos alternativos em todas as imagens.
- **Sem dependências:** nenhum arquivo externo além da fonte do Google Fonts — tudo o mais é HTML/CSS/JS puro, compatível com GitHub Pages.
