/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#e65100';
const tintColorDark = '#ff9800';

export default {
  light: {
    text: '#2d3748',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: '#e65100',
    secondary: '#ff9800',
    success: '#38a169',
    danger: '#e53e3e',
    warning: '#ff9800',
    info: '#4299e1',
    lightGray: '#f7fafc',
    mediumGray: '#e2e8f0',
    darkGray: '#a0aec0',
  },
  dark: {
    text: '#e2e8f0',
    background: '#1a202c',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    primary: '#ff9800',
    secondary: '#e65100',
    success: '#68d391',
    danger: '#feb2b2',
    warning: '#fbd38d',
    info: '#90cdf4',
    lightGray: '#2d3748',
    mediumGray: '#4a5568',
    darkGray: '#718096',
  },
};
