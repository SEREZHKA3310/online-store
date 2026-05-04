import { DarkThemeFactory, LightThemeFactory, type ThemeFactory } from './ThemeFactory';
import type { ThemeMode } from './types';

export function getThemeFactory(mode: ThemeMode): ThemeFactory {
  return mode === 'dark' ? new DarkThemeFactory() : new LightThemeFactory();
}
