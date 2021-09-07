import ReactGA from 'react-ga'

export const initGA = () => {
  console.log('GA init');
  ReactGA.initialize('G-X4ZEG2VRGP');
}

export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}