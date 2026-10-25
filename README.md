# JANE AUSTEN · Arquivo Literário

Uma experiência literária digital e interativa sobre Jane Austen, o seu universo, a sua crítica social e o seu legado.
Projeto editorial independente, sem afiliação a qualquer instituição associada a Jane Austen.
Concebido e desenvolvido pela CodEst.

## Começar

```bash
npm install
npm run dev
```

Arquitetura, direção criativa e plano por fases: [docs/ARQUITETURA.md](docs/ARQUITETURA.md).
Fontes das citações e factos: [docs/FONTES.md](docs/FONTES.md). Pontuação do questionário: [docs/QUESTIONARIO.md](docs/QUESTIONARIO.md).
Relatório de qualidade (testes, desempenho, acessibilidade, licenças): [docs/QUALIDADE.md](docs/QUALIDADE.md).

## Comandos

```bash
npm run dev              # servidor de desenvolvimento
npm test                 # testes de lógica (Vitest)
npm run lint             # oxlint
npm run build            # build de produção em dist/, pronto para Vercel, Netlify ou GitHub Pages
npm run preview          # serve o build
npm run build:artifact   # página única para pré-visualização
```

## Publicação

Cada push para `main` corre o lint e os testes, gera o build e publica o site no GitHub Pages (`.github/workflows/deploy.yml`).
Para ativar: em **Settings → Pages**, escolher **GitHub Actions** como fonte. O site fica em `https://<utilizador>.github.io/janeausten-landing/`.
