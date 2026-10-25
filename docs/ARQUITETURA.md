# JANE AUSTEN · Arquitetura e plano de implementação

Projeto editorial independente concebido e desenvolvido pela CodEst.

## 1. Direção criativa

**Conceito:** um catálogo de museu impresso como revista de moda, folheado por uma leitora com caderno de aguarelas. Cada capítulo é uma "sala" da exposição, com composição própria.

**Camada ilustrada (revisão de 25/10, a partir do moodboard da cliente):** papel salpicado de fibras, manchas de aguarela, botânica a tinta e lombadas pintadas à mão. Tudo é gerado em CSS/SVG (filtros `#ink-wobble` e `#watercolor`), sem imagens. As ilustrações do moodboard servem só de referência de estilo e não são usadas no site, por estarem protegidas por direitos de autor.

**Tensão central:** a rigidez da Regência (grelha, filetes, legendas pequenas, hierarquia formal) contra a ironia das heroínas (itálicos inesperados, anotações manuscritas à margem, quebras de linha deslocadas).

**Ritmo cromático do percurso** (alternância claro/escuro para dar respiração e drama):

| Sala | Superfície | Momento |
| --- | --- | --- |
| Entrada | Marfim com grão | Capa de revista: título monumental, retrato, revelação em etapas |
| I · Romances | Muda com o livro | A sala transforma-se ao escolher a obra |
| II · Questionário | Tinta | Intimidade, uma pergunta por ecrã |
| III · Cartas | Marfim / papel | Mesa de escrita, carta em tempo real |
| IV · Temporada | Bordô | Calendário social, painel expandido |
| V · Arquivo | Marfim | Capítulos temáticos em acordeão editorial |
| Rodapé | Tinta | Créditos, nota de independência, CodEst |

**Tipografia:** Pinyon Script (o nome «Jane Austen» na capa, escrito à mão, e anotações à margem), Bodoni Moda (voz alta: títulos, numerais), Cormorant Garamond itálico (sussurro: citações, cartas, leads), DM Sans (interface e corpo).

**Tons de ilustração** (complementam a paleta base, só em aguarelas, lombadas e botânica): folha ao sol #9DB57A, porcelana #7D93B2, chita rosa #E2B7B0, menta pintada #A9C7B8, ocre #DCA35A, ardósia #5B6577, e o cinzento-lilás #CFD0D6 como fundo de sala. Todas sob SIL Open Font License 1.1.

**Movimento:** um único momento orquestrado na entrada; no resto, revelações discretas, sublinhados, transições de tema. Sem scroll-jacking. Tudo desativado com `prefers-reduced-motion`.

## 2. Stack

- React 19 + Vite, JavaScript.
- CSS Modules por componente + três folhas globais (`tokens.css`, `global.css`, `animations.css`).
- Framer Motion só onde há coreografia (entrada, troca de romance, perguntas do questionário, painel de eventos).
- Lucide React para ícones.
- Vitest apenas para lógica pura (pontuação do questionário, geração de cartas).
- Sem backend, sem base de dados, sem APIs pagas.

## 3. Estrutura de ficheiros

```
src/
  main.jsx                 entrada, importa os estilos globais
  App.jsx                  composição dos capítulos, MotionConfig
  styles/
    tokens.css             paleta, papéis semânticos, escala tipográfica, mundos dos romances
    global.css             reset, primitivas (container, eyebrow, link, btn, input)
    animations.css         keyframes + reduced motion
  components/
    Navigation.jsx         nav editorial + menu móvel acessível          (F2)
    Hero.jsx               entrada cinematográfica                        (F2)
    Prelude.jsx            prólogo lido com o scroll + datas essenciais   (F2)
    BackToTop.jsx          regresso ao topo com anel de progresso         (F2)
    EditorialHeading.jsx   títulos com quebras de linha intencionais      (F1)
    AnimatedReveal.jsx     revelação ao entrar no viewport                (F1)
    OrnamentalRule.jsx     filete da casa                                 (F1)
    WaxSeal.jsx            selo de cera em CSS                            (F1)
    InkFilters.jsx         filtros SVG partilhados: traço a tinta, aguarela (F1)
    WatercolorWash.jsx     mancha de aguarela decorativa                  (F1)
    BotanicalSprig.jsx     ramo botânico gerado por código                (F1)
    BookSpineStack.jsx     estante ilustrada, seletor dos romances        (F1→F3)
    ScrollProgress.jsx     indicador de exploração + regresso ao topo     (F2)
    CustomCursor.jsx       cursor em elementos selecionados (desktop)     (F2)
    NovelExplorer/         seletor, palco, citação, "Porque continua…"    (F3)
    HeroineQuiz/           pergunta, progresso, resultado, partilha       (F4)
    LetterStudio/          formulário, carta, ações                       (F5)
    SocialSeason/          calendário, painel do evento                   (F5)
    ThemeArchive/          capítulos temáticos em acordeão                (F6)
    Footer.jsx             créditos e notas                               (F6)
  data/
    sections.js            ordem dos capítulos (nav, rodapé, progresso)
    images.js              registo central de imagens + licenças
    novels.js              (F3)  quizQuestions.js (F4)
    socialEvents.js (F5)   literaryThemes.js (F6)  letterTemplates.js (F5)
  hooks/
    useMediaQuery.js       media queries + ponteiro fino
    useScrollProgress.js (F2)  useLocalStorage.js (F4/F5)  useClipboard.js (F4)
  utils/
    quizScoring.js + .test.js (F4)   letter.js + .test.js (F5)
  dev/
    DesignSystem.jsx       folha de estilo viva (F1)
scripts/
  build-artifact.mjs       empacota o build numa página única para pré-visualização
```

Mudanças em relação à estrutura sugerida: componentes complexos ficam em pastas próprias (componente + subcomponentes + CSS Module) para não haver ficheiros gigantes; a lógica testável sai para `utils/`.

## 4. Decisões de conteúdo e direitos

- **Citações:** só citações curtas verificadas nos textos originais em domínio público (Project Gutenberg / edições de 1811–1818), com capítulo indicado. A tradução portuguesa é nossa e assinalada como tal. O que não for verificável é texto editorial original, sem atribuição à autora.
- **Retrato da entrada:** gravura colorida publicada em E. A. Duyckinck, *Portrait Gallery of Eminent Men and Women of Europe and America* (1873), segundo o esboço de Cassandra Austen (c. 1810). Domínio público; ficha em Wikimedia Commons («Jane Austen coloured version.jpg», via Perry-Castañeda Library, UT Austin). O ficheiro usado veio do moodboard da cliente, porque o ambiente de desenvolvimento não tem acesso ao Wikimedia; antes de publicar, convém substituí-lo pelo original do Commons (mesma imagem, maior resolução).
- **Imagens:** obras em domínio público (Wikimedia Commons, coleções de acesso aberto de museus), cada uma registada em `data/images.js` com autor, data, fonte e licença. Nada de fotogramas de adaptações. Na falta de imagem adequada: composição tipográfica/CSS.
- **Factos vs. ficção:** os eventos da Temporada Social são marcados como ficcionais; as notas de etiqueta e vestuário são factuais e distinguidas visualmente.

## 5. Plano por fases

Cada fase termina com uma pré-visualização publicada e aguarda aprovação antes da seguinte.

1. **Direção criativa e fundações** — setup, tokens, tipografia, componentes base, folha de estilo viva. ✅ (aprovada)
2. **Entrada e navegação** (aprovada) — hero com revelação em etapas, retrato com parallax ao rato (só ponteiro fino), prólogo lido palavra a palavra com o scroll, nav com menu móvel, progresso de leitura, regresso ao topo, cursor editorial em elementos marcados com `data-cursor`. Salas futuras aparecem como «em montagem». A folha de estilo passou para `#folha-de-estilo`. ✅
3. **Explorador dos romances** (aprovada) — seis mundos, troca de tema, navegação por teclado (padrão de tabs ARIA), citações verificadas (ver `docs/FONTES.md`), uma prancha ilustrada original por romance e seis composições diferentes. ✅
4. **Questionário** (aprovada) — seis perguntas, pontuação determinística documentada e testada (ver `docs/QUESTIONARIO.md`), resultado editorial com afinidades, copiar/partilhar. ✅
5. **Cartas e Temporada** (aprovada) — carta em tempo real com concordância de género (sem «o/a»), rascunho guardado só no browser, copiar/descarregar .txt/imprimir com folha de impressão própria (`utils/letter.js`, 10 testes); temporada de 1813 em cinco convites, com painel modal acessível que separa Ficção de Facto histórico. ✅
6. **Arquivo, rodapé, responsividade e acessibilidade** (aprovada) — seis capítulos temáticos em acordeão (botões com `aria-expanded`, regiões rotuladas, «abrir todos»), cada um com ensaio curto, ligações que abrem o romance na estante (`utils/openNovel.js`), leitura de hoje e referência verificada (`data/literaryThemes.js`, 4 testes); rodapé editorial com despedida, percurso, fontes, créditos e nota de independência. Auditoria axe-core sem violações, no computador e no telemóvel, com todos os capítulos abertos. ✅
7. **Qualidade** — testes, lint, build, verificação no browser (320 a 1440 px), desempenho (LazyMotion, folha de estilo carregada só quando é pedida), acessibilidade (axe em seis estados), links e licenças. Relatório completo em `docs/QUALIDADE.md`. ✅

## 6. Comandos

```bash
npm install
npm run dev              # servidor de desenvolvimento
npm run build            # build de produção em dist/
npm run preview          # serve o build
npm test                 # testes de lógica (a partir da Fase 4)
npm run lint
npm run build:artifact   # página única para pré-visualização
```
