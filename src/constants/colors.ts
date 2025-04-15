// TODO: Figure out how to use dynamic colors from tailwind. Maybe a hook
// useAppColors, which on site inits, get site colors from dom and coverts them
// variables we can pass around. or maybe link them to this keys
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
] as const;

export type SelectionColors = (typeof SELECTION_COLORS)[number];

export const COLOR_DELIMITER = '--color-selection-';

type ToColorKey<U extends string> = U extends `${typeof COLOR_DELIMITER}${infer K}` ? K : never;

export type SelectionColorKeys = ToColorKey<SelectionColors>;

type SelectionColorsMap = Record<SelectionColorKeys, string>;

export const convertSelectionVarToKey = <T extends SelectionColors>(colorVar: T): ToColorKey<T> =>
  colorVar.replace(COLOR_DELIMITER, '') as ToColorKey<T>;

interface Colors extends SelectionColorsMap {
  'base-text': string;
  'base-red': string;
}

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
export const COLORS: Colors = {
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
  'base-text': '#f0f0f0',
  'base-red': '#ff0014',
};

export const BASE_TEXT = COLORS['base-text'];

export const BASE_RED = COLORS['base-red'];
