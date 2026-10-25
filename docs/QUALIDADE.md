# Relatório de qualidade · Fase 7

Data: 25 de outubro de 2026. Todas as verificações abaixo foram executadas; nada aqui é estimado.

## 1. Testes, lint e build

| Verificação | Comando | Resultado |
| --- | --- | --- |
| Testes de lógica | `npm test` | 31 testes passam (pontuação do questionário, geração de cartas, integridade do arquivo temático) |
| Lint | `npm run lint` (oxlint) | Sem avisos nem erros |
| Build de produção | `npm run build` | Sem erros |
| Página de pré-visualização | `npm run build:artifact` | Sem erros; verificada no browser como página publicada |

## 2. Desempenho

Medido em Chromium (Playwright), build de produção servido localmente, ecrã 1440 × 900.

| Indicador | Valor |
| --- | --- |
| JavaScript inicial (gzip) | 141 kB (era 158 kB antes desta fase) |
| CSS inicial (gzip) | 15 kB |
| Retrato da entrada | 88 kB (versão 560 px; a de 874 px só é pedida em ecrãs de alta densidade) |
| Largest Contentful Paint | cerca de 0,5 s |
| Cumulative Layout Shift | 0,002 |

O que mudou:

- **Framer Motion com `LazyMotion`** (`domAnimation`, modo `strict`): todos os componentes passaram de `motion.*` para `m.*`, e só entra no bundle o conjunto de funcionalidades de animação usado.
- **Folha de estilo do projeto (`#folha-de-estilo`) carregada só quando é pedida** (`React.lazy`), em ficheiro próprio (16 kB de JS e 10 kB de CSS) que os visitantes nunca descarregam.
- **Imagens:** o retrato tem `srcset`, `sizes`, dimensões explícitas (sem saltos de layout) e `fetchpriority="high"`. Testei recomprimir a versão de 874 px; com a textura da gravura o ficheiro ficava maior, por isso mantive o original.
- Fontes com `display=swap` e `preconnect` para o Google Fonts.

## 3. Browser: computador, tablet e telemóvel

Larguras testadas: 320, 390, 768, 1024 e 1440 px, depois de percorrer a página inteira.

- Sem erros nem avisos na consola.
- Sem deslocamento horizontal em nenhuma largura.
- O retrato carrega em todas as larguras.
- Fluxos testados de ponta a ponta: menu móvel (abre, prende o foco, fecha com Esc), questionário completo até ao resultado, convite da temporada aberto com o teclado (o foco entra no painel e regressa ao convite ao fechar), arquivo com todos os capítulos abertos, ligação do arquivo para um romance (abre a estante com o livro selecionado e o foco na lombada).
- Movimento reduzido (`prefers-reduced-motion: reduce`): o título da entrada aparece de imediato, sem animação.

## 4. Acessibilidade

Auditoria automática com axe-core 4.10 em seis estados: página inicial, menu móvel aberto, pergunta do questionário, resultado, convite aberto e arquivo com tudo aberto. Computador e telemóvel.

- **Sem violações reais.**
- O axe assinala o contraste da barra de navegação fixa: não consegue calcular fundos translúcidos e lê o fundo escuro da sala que passa por trás. Medição manual com o fundo real da barra (marfim a 96 %): logótipo 11,1:1, ligações 10,1:1, legenda «Arquivo literário» 4,95:1. Todos acima do mínimo AA de 4,5:1. Com o menu móvel aberto, o mesmo aviso refere-se ao logótipo da barra, que fica tapado pelo painel opaco do menu.
- Corrigido nesta fase: a barra ficou mais opaca (90 % para 96 %); o «Saltar para o conteúdo» passa agora o foco para o conteúdo principal (`<main tabIndex={-1}>`); dois `<aside>` dentro de secções deixaram de ser marcos de navegação; a pré-visualização declara a língua da página (`pt-PT`).
- Teclado: 25 paragens de Tab seguidas, todas com anel de foco visível.
- Sem ids duplicados na página.

## 5. Ligações

- Âncoras internas: todas as 8 apontam para secções existentes (`#conteudo`, `#inicio`, `#romances`, `#questionario`, `#cartas`, `#temporada`, `#arquivo`, `#folha-de-estilo`).
- Ligação externa: uma (ficha do retrato no Wikimedia Commons), com `target="_blank"`, `rel="noreferrer"` e aviso para leitores de ecrã. O ambiente de desenvolvimento não tem acesso ao Wikimedia, por isso não consegui abri-la daqui; confirme-a antes de publicar.

## 6. Licenças

| Elemento | Licença |
| --- | --- |
| Retrato de Jane Austen (gravura de 1873, segundo Cassandra Austen) | Domínio público. O ficheiro veio do moodboard; antes de publicar, substituir pelo original do Wikimedia Commons (ver `docs/ARQUITETURA.md`) |
| Pinyon Script, Bodoni Moda, Cormorant Garamond, DM Sans | SIL Open Font License 1.1 |
| React 19.3.1, React DOM 19.3.1, Framer Motion 14.6.0 | MIT |
| Lucide React 1.61.0 | ISC |
| Ilustrações (lombadas, pranchas, botânica, aguarelas, selos) | Originais, em CSS e SVG |
| Citações | Textos de Jane Austen em domínio público; traduções editoriais da CodEst (ver `docs/FONTES.md`) |
| Moodboard da cliente | Só como referência de estilo; nenhuma destas imagens é usada no site |

## 7. Antes de publicar o site

1. Substituir o retrato pelo original do Wikimedia Commons e confirmar a ligação da ficha.
2. Escolher o alojamento (Vercel, Netlify ou GitHub Pages servem um build Vite tal como está) e definir o domínio.
3. Opcional: imagem de partilha (`og:image`) para redes sociais.
