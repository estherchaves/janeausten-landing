import portrait560 from '../assets/jane-austen-portrait-560.webp'
import portrait874 from '../assets/jane-austen-portrait-874.webp'

/**
 * Central image registry. Every image on the site is declared here with its
 * provenance and licence, so assets can be swapped in one place and the
 * footer credits stay accurate.
 *
 * Moodboard illustrations supplied by the client are style references only
 * and are deliberately NOT used (they are copyrighted contemporary works).
 */
export const images = {
  portrait: {
    src: portrait560,
    srcSet: `${portrait560} 560w, ${portrait874} 874w`,
    width: 874,
    height: 1200,
    alt: 'Jane Austen sentada, de vestido azul-claro e touca de renda, com um livro encostado ao braço e o olhar voltado para o lado.',
    caption: 'Jane Austen, segundo o esboço de Cassandra Austen (c. 1810)',
    credit: {
      work: 'Retrato de Jane Austen, gravura colorida',
      author: 'Segundo Cassandra Austen; gravura publicada em E. A. Duyckinck, Portrait Gallery of Eminent Men and Women of Europe and America (Nova Iorque, 1873)',
      licence: 'Domínio público',
      source: 'Wikimedia Commons, «Jane Austen coloured version.jpg», via Perry-Castañeda Library, Universidade do Texas em Austin',
      url: 'https://commons.wikimedia.org/wiki/File:Jane_Austen_coloured_version.jpg',
    },
  },
}

export const imageCredits = Object.values(images).map((img) => img.credit)
