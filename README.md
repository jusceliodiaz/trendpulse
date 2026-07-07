# TrendPulse — A oportunidade do dia

PWA (Progressive Web App) em português que mostra, todo dia, as tendências de busca do Google Trends transformadas em oportunidades de negócio. Formato de feed vertical estilo "stories", com dados de crescimento, score de negócio e ideias de monetização para cada tendência.

## Estrutura do projeto

| Arquivo | Função |
|---|---|
| `index.html` | App principal (PWA) — feed de tendências, abas de país, navegação, push notifications |
| `manifest.json` | Manifesto do PWA (nome, ícones, cores, modo standalone) |
| `sw.js` | Service Worker — cache offline e recebimento de push notifications |
| `templates.html` | Gerador de templates visuais para redes sociais (Post 1080×1080 e Reels 1080×1920) |

## `index.html` — App principal

### Conceito
Um app estilo celular (simulado em uma "moldura de phone" no desktop) que exibe, para o Brasil (por enquanto), as tendências de busca do dia com:
- **Nome da tendência** (`kw`) e **crescimento** (`growth`, ex: `+870%`)
- **Business Score** (0–100) exibido em anel circular (SVG)
- **Volume de buscas** e **nível de concorrência**
- **Por que explodiu** — explicação textual do motivo da alta
- **Como ganhar dinheiro** — lista de oportunidades de negócio (`ops`)
- **Gráfico sparkline** dos últimos 10 dias (`chart`)

### Dados (`DATA`)
Atualmente os dados são **mockados manualmente** no JavaScript (objeto `DATA`), com abas para 4 regiões:
- 🇧🇷 Brasil — `live: true` (com 3 tendências de exemplo: PIX Parcelado, FGTS Saque, Agentes de IA)
- 🇺🇸 USA, 🇪🇺 Europa, 🇯🇵 Ásia — `live: false` (telas "em breve")

> Comentário no código indica o plano futuro: um script buscará dados reais no Google Trends + IA gerará o resumo/score automaticamente, gravando no mesmo formato JSON.

### Funcionalidades de interface
- **Abas de país** com troca por clique, teclado (← →) ou swipe horizontal (touch)
- **Feed com scroll-snap vertical** (uma tendência por "tela")
- **Notificações push** via `Notification API` (atualmente demo local; comentário indica que em produção usará Firebase Cloud Messaging)
- **Toast** de feedback para ações (ex: "Alertas ativados!")
- Botões de navegação inferior (Hoje, Países, Alertas, Favoritos, Config) — a maioria ainda "em breve"

### Visual
Dark mode (`#050505`), fontes **Unbounded** (títulos) + **Sora** (corpo), acento azul (`#3B82F6`) e verde (`#22ff9a`) para indicadores de crescimento, com efeitos de glass/blur (`backdrop-filter`) e glow radial de fundo.

## `manifest.json`

Configura o app como instalável (PWA):
- Nome: "TrendPulse — A oportunidade do dia"
- `display: standalone`, tema escuro (`#050505`)
- Ícones 192×192 e 512×512 (arquivos `icon-192.png`/`icon-512.png` **ainda não presentes** na pasta)

## `sw.js` — Service Worker

- Cacheia `index.html` e `manifest.json` para funcionamento offline (estratégia network-first com fallback pro cache)
- Escuta evento `push` para exibir notificações do sistema — pronto para integração futura com Firebase Cloud Messaging (FCM)

## `templates.html` — Gerador de artes para redes sociais

Página separada (não faz parte do PWA) para gerar visuais em tamanho real via captura de tela do DevTools:
- **Post feed** (1080×1080): cabeçalho, tendência do dia, oportunidades, business score, rodapé com CTA
- **Reels** (1080×1920): variação "cena de revelação" com CTA maior, pensado para série de stories/reels

Instrução no próprio HTML: usar o Chrome DevTools → clicar com botão direito no elemento `.post` ou `.reel` → "Capture node screenshot" para exportar PNG no tamanho exato, ignorando o zoom aplicado na tela (`transform: scale(.42)`).

## Estado atual / pendências observadas

- Ícones do manifest (`icon-192.png`, `icon-512.png`) não existem no diretório — precisam ser criados para o PWA instalar corretamente.
- Dados de tendências são estáticos/mockados — falta o pipeline real de coleta (Google Trends) + geração de resumo via IA.
- Push notifications são apenas locais (via `Notification.requestPermission`), sem backend de envio (FCM mencionado como próximo passo).
- Apenas Brasil está "ao vivo"; demais países são placeholders.
- Botões "Países", "Favoritos" e "Config" no menu inferior ainda não têm funcionalidade.
