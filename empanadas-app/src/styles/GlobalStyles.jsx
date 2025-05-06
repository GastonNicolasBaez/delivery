import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Marcellus&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    /* Colores inspirados en San Martín de los Andes */
    --color-primary: #C13832;
    --color-primary-rgb: 193, 56, 50;
    --color-primary-light: #E54B44;
    --color-mountain: #2C3E50;
    --color-forest: #2B4C3F;
    --color-lake: #1F4E70;
    --color-background: #1C2836;
    --color-background-light: #243447;
    --color-text: #FFFFFF;
    --color-text-light: #F5F5F5;
    --color-text-dark: #1A1A1A;
    
    /* Sistema de fuentes */
    --font-titles: 'Playfair Display', serif;
    --font-decorative: 'Marcellus', serif;
    --font-main: 'Outfit', sans-serif;
    
    /* Tamaños de fuente */
    --fs-display: 4rem;
    --fs-h1: 3.5rem;
    --fs-h2: 2.8rem;
    --fs-h3: 1.8rem;
    --fs-body: 1rem;
    --fs-small: 0.9rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-main);
    background: linear-gradient(
      135deg,
      var(--color-background) 0%,
      var(--color-forest) 100%
    );
    color: var(--color-text);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    font-size: var(--fs-body);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        /* Efecto montañas */
        linear-gradient(
          170deg,
          transparent 0%,
          var(--color-mountain) 200%
        ),
        /* Efecto lago */
        radial-gradient(
          circle at bottom center,
          var(--color-lake) 0%,
          transparent 60%
        ),
        /* Efecto bosque */
        radial-gradient(
          circle at center left,
          var(--color-forest) 0%,
          transparent 50%
        );
      opacity: 0.4;
      pointer-events: none;
      z-index: 0;
    }
  }

  #root {
    position: relative;
    z-index: 1;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: var(--font-main);
  }

  /* Scrollbar personalizado */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary-light);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-titles);
    font-weight: 600;
    line-height: 1.2;
  }

  .accent-text {
    font-family: var(--font-accent);
    font-style: italic;
    font-weight: 400;
  }

  p {
    font-family: var(--font-text);
    line-height: 1.6;
    font-weight: 400;
  }

  button, a {
    font-family: var(--font-main);
    letter-spacing: 1.5px;
  }
`;

export default GlobalStyles; 