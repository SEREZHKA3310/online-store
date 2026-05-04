import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  type FC,
  type ReactNode,
} from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { getThemeFactory } from '../theme/getThemeFactory';
import type { ThemeMode } from '../theme/types';

const STORAGE_KEY = 'online-store-theme';

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyCssVariables(mode: ThemeMode): void {
  const factory = getThemeFactory(mode);
  const root = document.documentElement;
  for (const [name, value] of Object.entries(factory.getCssVariables())) {
    root.style.setProperty(name, value);
  }
  root.dataset.theme = mode;
}

function parseTheme(raw: unknown): ThemeMode {
  return raw === 'dark' ? 'dark' : 'light';
}

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [stored, setStored] = useLocalStorage<ThemeMode>(STORAGE_KEY, 'light');
  const theme = parseTheme(stored);

  const setTheme = useCallback(
    (mode: ThemeMode) => {
      setStored(mode);
    },
    [setStored],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  useLayoutEffect(() => {
    applyCssVariables(theme);
  }, [theme]);

  const value: ThemeContextValue = { theme, setTheme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

export default ThemeProvider;
