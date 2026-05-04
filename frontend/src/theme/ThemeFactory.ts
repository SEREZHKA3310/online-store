import type { ThemeMode } from './types';

export interface ThemeFactory {
  readonly mode: ThemeMode;
  getCssVariables(): Readonly<Record<string, string>>;
}

export abstract class AbstractThemeFactory implements ThemeFactory {
  abstract readonly mode: ThemeMode;
  abstract getCssVariables(): Readonly<Record<string, string>>;
}

export class LightThemeFactory extends AbstractThemeFactory {
  readonly mode = 'light' as const;

  getCssVariables(): Readonly<Record<string, string>> {
    return {
      '--primary-color': '#414141',
      '--button-color': '#2D2D2D',
      '--text-color21': '#212121',
      '--text-colorA3': '#A3A3A3',
      '--text-color4A': '#4A4A4A',
      '--text-color2D': '#2D2D2D',
      '--text-color08': '#080808',
      '--text-colorE1': '#6b6b6b',
      '--white-color': '#FFF',
      '--surface-paper': '#ffffff',
      '--background-color': '#E1E1E1',
      '--main-padding': '24px',
      '--solid-button-bg': 'rgba(8, 8, 8, 0.8)',
      '--solid-button-fg': '#ffffff',
      '--solid-button-hover-bg': 'rgba(45, 45, 45, 0.8)',
      '--ghost-button-fg': 'rgba(0, 0, 0, 0.8)',
      '--ghost-button-border': 'rgba(0, 0, 0, 0.25)',
      '--ghost-button-border-hover': 'rgba(0, 0, 0, 0.8)',
      '--ghost-button-disabled-fg': 'rgba(0, 0, 0, 0.3)',
      '--ghost-button-disabled-border': 'rgba(0, 0, 0, 0.2)',
      '--border-strong': '#000000',
      '--border-secondary': '#5C5C5C',
      '--surface-tint': 'rgba(0, 0, 0, 0.05)',
      '--surface-tint-hover': 'rgba(0, 0, 0, 0.15)',
      '--text-muted': 'rgba(33, 33, 33, 0.4)',
      '--promocode-border': 'rgba(51, 51, 51, 1)',
      '--placeholder-color': 'rgba(33, 33, 33, 0.16)',
    };
  }
}

export class DarkThemeFactory extends AbstractThemeFactory {
  readonly mode = 'dark' as const;

  getCssVariables(): Readonly<Record<string, string>> {
    return {
      '--primary-color': '#e4e4e4',
      '--button-color': '#3d3d3d',
      '--text-color21': '#4a4a4a',
      '--text-colorA3': '#9a9a9a',
      '--text-color4A': '#b5b5b5',
      '--text-color2D': '#3d3d3d',
      '--text-color08': '#f5f5f5',
      '--text-colorE1': '#a3a3a3',
      '--white-color': '#ffffff',
      '--surface-paper': '#262626',
      '--background-color': '#121212',
      '--main-padding': '24px',
      '--solid-button-bg': 'rgba(230, 230, 230, 0.95)',
      '--solid-button-fg': '#141414',
      '--solid-button-hover-bg': 'rgba(200, 200, 200, 1)',
      '--ghost-button-fg': 'rgba(255, 255, 255, 0.88)',
      '--ghost-button-border': 'rgba(255, 255, 255, 0.35)',
      '--ghost-button-border-hover': 'rgba(255, 255, 255, 0.75)',
      '--ghost-button-disabled-fg': 'rgba(255, 255, 255, 0.28)',
      '--ghost-button-disabled-border': 'rgba(255, 255, 255, 0.18)',
      '--border-strong': '#666666',
      '--border-secondary': '#6a6a6a',
      '--surface-tint': 'rgba(255, 255, 255, 0.06)',
      '--surface-tint-hover': 'rgba(255, 255, 255, 0.12)',
      '--text-muted': 'rgba(255, 255, 255, 0.45)',
      '--promocode-border': 'rgba(180, 180, 180, 0.35)',
      '--placeholder-color': 'rgba(255, 255, 255, 0.28)',
    };
  }
}
