const colors = {
  primary: '#0070f3',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#fca311',
  info: '#17a2b8',
  light: '#f1f1f1',
  dark: '#343a40',
  white: '#fff',
  black: '#000',
  advanced: '#a5a5a5',
}

const opacity = {
  0: '00',
  5: '0d',
  10: '1a',
  15: '26',
  20: '33',
  25: '40',
  30: '4d',
  35: '59',
  40: '66',
  45: '73',
  50: '80',
  55: '8c',
  60: '99',
  65: 'a6',
  70: 'b3',
  75: 'bf',
  80: 'cc',
  85: 'd9',
  90: 'e6',
  95: 'f2',
  100: 'ff',
}

const fontSizes = {
  sm: '0.8rem',
  md: '1rem',
  lg: '1.2rem',
}

const commons = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexColumn: `
    display: flex;
    flex-direction: column;
  `,

  flexRow: `
    display: flex;
    flex-direction: row;
  `,

  flexWrap: `
    display: flex;
    flex-wrap: wrap;
  `,

  flexGap: (gap = '1rem') => `
    display: flex;
    gap: ${gap};
  `,
  //opacity 16진수
  boxShadow: (color = colors.black, opacity = 33) => `
    box-shadow: 2px 2px 4px ${color}${opacity};
  `,
}

const theme = {
  colors,
  fontSizes,
  commons,
  opacity,
}

export default theme
