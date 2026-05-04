import { useTheme } from '../../context/ThemeContext';

import styles from './ThemeToggle.module.css';

const MoonIcon = () => (
  <svg className={styles.icon} width={22} height={22} viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    className={styles.icon}
    width={22}
    height={22}
    viewBox="0 0 24 24"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" />
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-pressed={isDark}
      title={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="visually-hidden">
        {isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      </span>
    </button>
  );
};

export default ThemeToggle;
