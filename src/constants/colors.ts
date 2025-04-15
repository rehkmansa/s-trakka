export const SELECTION_COLORS = [
  '--color-selection-purple',
  '--color-selection-green',
  '--color-selection-orange',
  '--color-selection-yellow',
  '--color-selection-red',
  '--color-selection-blue',
  '--color-selection-pink',
  '--color-selection-teal',
  '--color-selection-indigo',
  '--color-selection-lime',
  '--color-selection-brown',
];

/** Colors are set as css variables, workaround for extracting and parsing the
 * colors would be a lot, chart-js doesn't recognize css variables, what this
 * means now is we have two source of truths, one color set from variables and
 * another here for the graph, makes more sense(now) to update both places if a
 * new color is added. A proper tech debt would be figuring or creating a way to
 * use css vars seemingly or single color token.
 *
 *
 *
 * https://stackoverflow.com/questions/49208780/using-css-variables-color-with-chart-js-var-primarycolor-not-working
 * */
export const COLORS = {
  // Selection colors
  purple: '#a25ed2',
  green: '#00ff99',
  orange: '#f95200',
  red: '#ff3344',
  yellow: '#ffc800',
  blue: '#007bff',
  pink: '#ff55cc',
  teal: '#00e6e6',
  indigo: '#5c6ac4',
  lime: '#bfff00',
  brown: '#6b4f3b',

  // App colors
  'base-text': '#f0f0f0',
  'base-red': '#ff0014',
};
