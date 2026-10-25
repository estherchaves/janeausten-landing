/**
 * The exhibition's chapter sequence. Navigation, the footer and the
 * page-progress indicator all read from here, so anchors stay in sync.
 * `surface` sets the chapter's ground (see tokens.css) and the rhythm of
 * light and dark rooms. `phase` records when each room was built.
 */
export const sections = [
  { id: 'inicio', label: 'Início', numeral: '—', nav: false, title: 'Entrada', phase: 2 },
  { id: 'prologo', label: 'Prólogo', numeral: '—', nav: false, title: 'Prólogo', phase: 2 },
  {
    id: 'romances',
    label: 'Romances',
    numeral: 'I',
    nav: true,
    title: 'O universo literário',
    phase: 3,
    surface: 'mist',
  },
  {
    id: 'questionario',
    label: 'Questionário',
    numeral: 'II',
    nav: true,
    title: 'Que heroína és tu?',
    phase: 4,
    surface: 'ink',
  },
  {
    id: 'cartas',
    label: 'Cartas',
    numeral: 'III',
    nav: true,
    title: 'Estúdio de cartas',
    phase: 5,
    surface: 'paper',
  },
  {
    id: 'temporada',
    label: 'Temporada',
    numeral: 'IV',
    nav: true,
    title: 'A temporada social',
    phase: 5,
    surface: 'burgundy',
  },
  {
    id: 'arquivo',
    label: 'Arquivo',
    numeral: 'V',
    nav: true,
    title: 'Por detrás da prosa',
    phase: 6,
    surface: 'paper',
  },
]

export const navSections = sections.filter((s) => s.nav)
